"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { sendMessage, type ContactState } from "./actions";

const initial: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover disabled:opacity-60"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

const field =
  "mt-1.5 w-full rounded-lg border bg-canvas px-3.5 py-2.5 text-ink placeholder:text-faint focus:border-accent";

export function ContactForm() {
  const [state, action] = useActionState(sendMessage, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-hairline bg-surface p-6">
        <h2 className="text-lg font-semibold text-ink">Message sent</h2>
        <p className="mt-2 text-muted">
          Thanks — I&apos;ll come back to you. If it&apos;s urgent, email is faster.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5">
      {state.message && (
        <p
          role="alert"
          className="rounded-lg border border-cat-ai/40 bg-cat-ai/5 px-4 py-3 text-sm text-ink"
        >
          {state.message}
        </p>
      )}

      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          aria-invalid={state.errors?.name ? true : undefined}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
          className={`${field} ${state.errors?.name ? "border-cat-ai" : "border-hairline"}`}
        />
        {state.errors?.name && (
          <p id="name-error" className="mt-1.5 text-sm text-cat-ai">
            {state.errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          aria-invalid={state.errors?.email ? true : undefined}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className={`${field} ${state.errors?.email ? "border-cat-ai" : "border-hairline"}`}
        />
        {state.errors?.email && (
          <p id="email-error" className="mt-1.5 text-sm text-cat-ai">
            {state.errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={state.values?.message}
          placeholder="The more specific, the more useful my reply will be."
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={`${field} resize-y ${state.errors?.message ? "border-cat-ai" : "border-hairline"}`}
        />
        {state.errors?.message && (
          <p id="message-error" className="mt-1.5 text-sm text-cat-ai">
            {state.errors.message}
          </p>
        )}
      </div>

      {/* Honeypot. Hidden from sight and from assistive tech, but a bot filling
          every input will trip it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton />
    </form>
  );
}
