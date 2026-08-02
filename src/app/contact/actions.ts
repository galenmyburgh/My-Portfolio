"use server";

import { headers } from "next/headers";

import { site } from "@/lib/site";

/**
 * Contact form handler.
 *
 * Replaces the EmailJS integration on the old site, where the service id,
 * template id and public key all shipped in the browser bundle. Here the API
 * key never leaves the server.
 *
 * Resend is called over plain fetch rather than through its SDK — one less
 * dependency, and the request is four lines.
 */

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  /** Field-level errors, keyed by input name. */
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Echoed back so a failed submit doesn't wipe what they typed. */
  values?: { name: string; email: string; message: string };
};

/**
 * In-memory rate limit. Good enough to stop a naive script; it is per-instance,
 * so on a serverless host each cold start begins with an empty map. If this
 * ever matters, move it to Upstash or Vercel KV — do not assume it is airtight.
 */
const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent);
    return true;
  }

  recent.push(now);
  attempts.set(key, recent);
  return false;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("company") ?? "").trim();

  const values = { name, email, message };

  // Bots fill every field. Humans never see this one. Report success so the
  // bot has nothing to learn from.
  if (honeypot) return { status: "success" };

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = "Tell me what to call you.";
  if (!EMAIL.test(email)) errors.email = "That doesn't look like an email address.";
  if (message.length < 20) {
    errors.message = "A bit more detail helps — 20 characters minimum.";
  }
  if (message.length > 5000) errors.message = "That's over 5,000 characters. Trim it a little?";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return {
      status: "error",
      message: `That's a few messages in a short time. Email me directly at ${site.email}.`,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  if (!apiKey) {
    // Misconfiguration is an operator problem, not a visitor problem — tell
    // them how to reach a human rather than showing them a generic failure.
    console.error("RESEND_API_KEY is not set; contact form cannot send.");
    return {
      status: "error",
      message: `The form isn't wired up right now. Email me directly at ${site.email}.`,
      values,
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio enquiry from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the message:", response.status, await response.text());
      return {
        status: "error",
        message: `Something went wrong sending that. Email me directly at ${site.email}.`,
        values,
      };
    }

    return { status: "success" };
  } catch (error) {
    console.error("Contact form send failed:", error);
    return {
      status: "error",
      message: `Something went wrong sending that. Email me directly at ${site.email}.`,
      values,
    };
  }
}
