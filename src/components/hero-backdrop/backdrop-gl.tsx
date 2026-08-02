"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { categories, type CategoryId } from "@/content/tech";

/**
 * The hero backdrop — "the field".
 *
 * Two layers, one draw call each:
 *
 *   1. An aurora: domain-warped fBm noise, coloured by sampling the *same five
 *      category colours* the constellation uses. So the thing behind the
 *      headline is literally made of the site's own taxonomy, and it restains
 *      itself when the theme flips.
 *   2. Depth motes: points that parallax by their z, drift, and glow.
 *
 * Cost control, because this is a full-bleed fragment shader behind the most
 * important text on the site:
 *
 *   - The aurora renders at a capped DPR of 1. It is a soft gradient; nobody
 *     can tell, and it quarters the fragment count on a retina display.
 *   - fBm is 4 octaves, not 8.
 *   - The whole thing stops when scrolled past, when the tab is hidden, and if
 *     the frame-rate watchdog is unhappy.
 *
 * `selectedCategory` biases the palette toward whichever technology the visitor
 * has selected in the constellation — pick "Flutter" and the field warms toward
 * the mobile colour. That is the information-carrying part; without it this
 * would just be a lava lamp.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uResolution;
  uniform vec3  uColors[5];
  uniform float uWeights[5];
  uniform float uDark;

  varying vec2 vUv;

  // -- value noise ---------------------------------------------------------
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Four octaves. Eight looks marginally better and costs twice as much.
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Correct for aspect so the bands don't stretch on wide displays.
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    float t = uTime * 0.045;

    // Domain warping — noise sampled at coordinates displaced by other noise.
    // This is what turns bland clouds into something that looks like it flows.
    vec2 q = vec2(fbm(p * 1.6 + vec2(0.0, t)), fbm(p * 1.6 + vec2(5.2, 1.3 - t)));
    vec2 r = vec2(
      fbm(p * 1.9 + 3.4 * q + vec2(1.7, 9.2) + t * 0.7),
      fbm(p * 1.9 + 3.4 * q + vec2(8.3, 2.8) - t * 0.5)
    );

    // The pointer drags the field around with it.
    float m = fbm(p * 2.2 + uMouse * 0.55 + r);
    float f = fbm(p * 1.5 + 4.0 * r + m * 0.6);

    // Map the field onto the category palette. Each colour claims a band of
    // the noise range, weighted so a selected category dominates.
    float n = clamp(f * 1.7 + 0.5, 0.0, 1.0);
    vec3 col = vec3(0.0);
    float total = 0.0;
    for (int i = 0; i < 5; i++) {
      float centre = (float(i) + 0.5) / 5.0;
      // Smooth band membership, so colours bleed into each other.
      // Tight bands. At 3.4 the Gaussians overlap so heavily that every
      // pixel is an average of all five hues — which is grey, not aurora.
      float w = exp(-pow((n - centre) * 8.5, 2.0)) * uWeights[i];
      col += uColors[i] * w;
      total += w;
    }
    col /= max(total, 0.0001);

    // Ridges: the bright filaments that make it read as aurora rather than fog.
    // Two thresholds gives a hot core inside a broader glow.
    float ridge = pow(clamp(1.0 - abs(f) * 2.2, 0.0, 1.0), 3.0);
    float core  = pow(clamp(1.0 - abs(f) * 5.0, 0.0, 1.0), 6.0);
    col += col * ridge * 1.8 + col * core * 2.2;

    // No darkening on the dark theme. The canvas is #070c17; multiplying the
    // palette down just converges it to the background and the field vanishes.
    // A *deep* mid-tone (say #1b5673) is both clearly visible against the
    // canvas and still ~7:1 behind near-white headline text — which is the
    // combination this needs. The light theme is the opposite problem: near
    // black text on white, so there the field stays very faint.
    col *= mix(1.0, 0.92, uDark);

    // Vignette, weighted toward the top-right — away from the headline, and
    // behind the constellation, where the field can be strongest.
    // NOTE: smoothstep(edge0, edge1, x) is only defined for edge0 < edge1.
    // Writing smoothstep(1.6, 0.05, len) to mean "fade outward" is undefined
    // behaviour and returns ~0 on most drivers — which is exactly how you end
    // up with an invisible shader. Subtract from 1 instead.
    vec2 vp = p - vec2(0.34, 0.26);
    float vig = 1.0 - smoothstep(0.15, 1.5, length(vp * vec2(0.66, 1.05)));

    // fBm clusters tightly around zero, so widen it before use or every pixel
    // lands in the same band and the whole thing reads as flat fog.
    // Deliberately bounded rather than multiplicative: every earlier version of
    // this collapsed to ~0 through a chain of small factors and rendered an
    // invisible layer. mix() between two known endpoints cannot do that.
    // The exponent is the whole aesthetic. At ~1.2 most of the field sits at a
    // mid alpha and the result is a flat saturated wash — an oil slick. At 2.6
    // the bulk stays near-transparent and only the peaks come through, so it
    // reads as deep space with bright filaments, and the constellation on top
    // of it stays legible.
    float body = clamp(f * 1.9 + 0.5, 0.0, 1.0);
    float alpha = mix(0.04, 0.66, pow(body, 2.6)) * vig;

    // Light theme is near-black text on white, so the field has to stay far
    // back there or it costs the copy its contrast directly.
    alpha *= mix(0.26, 1.0, uDark);

    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;

const moteVertex = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScale;
  uniform float uAspect;

  attribute float aSize;
  attribute float aPhase;
  attribute vec3  aColor;

  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Depth parallax: z is the mote's distance, so nearer motes travel further.
    float depth = pos.z * 0.5 + 0.5;
    pos.xy += uMouse * (0.02 + depth * 0.10);

    pos.x += sin(uTime * 0.16 + aPhase) * 0.03;
    pos.y += cos(uTime * 0.13 + aPhase * 1.6) * 0.03 + uTime * 0.006;

    // Wrap vertically so the field never empties out.
    pos.y = fract(pos.y * 0.5 + 0.5) * 2.0 - 1.0;

    pos.x /= uAspect;

    float twinkle = 0.55 + 0.45 * sin(uTime * 0.8 + aPhase * 2.7);
    vAlpha = twinkle * (0.25 + depth * 0.75);

    gl_Position = vec4(pos.xy, 0.0, 1.0);
    gl_PointSize = aSize * uScale * (0.4 + depth);
  }
`;

const moteFragment = /* glsl */ `
  precision mediump float;
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float core = 1.0 - smoothstep(0.10, 0.22, d);
    float halo = 1.0 - smoothstep(0.22, 0.5, d);
    float a = (core + halo * 0.4) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

const CATEGORY_ORDER: CategoryId[] = ["mobile", "web", "data", "cloud", "ai"];

function readPalette(probe: HTMLElement) {
  return CATEGORY_ORDER.map((id) => {
    probe.style.color = categories[id].color;
    return new THREE.Color(getComputedStyle(probe).color);
  });
}

export function BackdropGL({ selectedCategory }: { selectedCategory: CategoryId | null }) {
  const hostRef = useRef<HTMLDivElement>(null);

  // The render loop reads the selection every frame and eases toward it. Held
  // in a ref, and written in an effect rather than during render, so changing
  // the selection never tears down and rebuilds the whole WebGL context.
  const selectionRef = useRef(selectedCategory);
  useEffect(() => {
    selectionRef.current = selectedCategory;
  }, [selectedCategory]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });

    // Capped at 1. This is a full-bleed soft gradient — rendering it at 2x on a
    // retina display quadruples the fragment cost for no perceptible gain.
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    host.appendChild(renderer.domElement);

    const probe = document.createElement("span");
    probe.style.display = "none";
    host.appendChild(probe);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();

    const isDark = () => (document.documentElement.getAttribute("data-theme") === "dark" ? 1 : 0);

    const auroraUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColors: { value: readPalette(probe) },
      uWeights: { value: [1, 1, 1, 1, 1] },
      uDark: { value: isDark() },
    };

    const aurora = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms: auroraUniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        // Additive on dark (adds glow to a near-black canvas), normal on light
        // (where additive would simply blow out to white). Kept in sync with
        // the theme below.
        blending: THREE.NormalBlending,
      })
    );
    aurora.frustumCulled = false;
    scene.add(aurora);

    // --- motes --------------------------------------------------------------
    const COUNT = 140;
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);
    const moteColors = new Float32Array(COUNT * 3);

    // Deterministic scatter — same reasoning as the constellation, no
    // Math.random() that would reshuffle on any re-render.
    let seed = 0x9e3779b9;
    const rand = () => {
      seed ^= seed << 13;
      seed ^= seed >>> 17;
      seed ^= seed << 5;
      return ((seed >>> 0) % 100000) / 100000;
    };

    const palette = readPalette(probe);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = rand() * 2 - 1;
      positions[i * 3 + 1] = rand() * 2 - 1;
      positions[i * 3 + 2] = rand() * 2 - 1;
      sizes[i] = 1.2 + rand() * 3.4;
      phases[i] = rand() * 12;
      const c = palette[Math.floor(rand() * palette.length)];
      moteColors[i * 3] = c.r;
      moteColors[i * 3 + 1] = c.g;
      moteColors[i * 3 + 2] = c.b;
    }

    const moteGeometry = new THREE.BufferGeometry();
    moteGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    moteGeometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    moteGeometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    moteGeometry.setAttribute("aColor", new THREE.BufferAttribute(moteColors, 3));

    const moteUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScale: { value: 1 },
      uAspect: { value: 1 },
    };

    const motes = new THREE.Points(
      moteGeometry,
      new THREE.ShaderMaterial({
        uniforms: moteUniforms,
        vertexShader: moteVertex,
        fragmentShader: moteFragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    motes.frustumCulled = false;
    scene.add(motes);

    // --- sizing -------------------------------------------------------------
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      auroraUniforms.uResolution.value.set(width, height);
      moteUniforms.uAspect.value = width / height;
      moteUniforms.uScale.value = Math.min(Math.max(width / 900, 0.75), 1.6);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // --- input --------------------------------------------------------------
    const pointerTarget = new THREE.Vector2(0, 0);
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerTarget.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      );
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const themeObserver = new MutationObserver(() => {
      auroraUniforms.uColors.value = readPalette(probe);
      auroraUniforms.uDark.value = isDark();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // --- loop ---------------------------------------------------------------
    let frame = 0;
    let running = true;
    let visible = true;
    // THREE.Clock is deprecated in three 0.185; performance.now() is what it
    // wrapped anyway. `last = 0` marks "resume" — the next frame reports a
    // zero delta instead of the whole time the loop was paused.
    let last = 0;
    const nextDelta = () => {
      const now = performance.now();
      const delta = last === 0 ? 0 : (now - last) / 1000;
      last = now;
      return delta;
    };
    const resumeClock = () => {
      last = 0;
    };

    let samples = 0;
    let slow = 0;

    const tick = () => {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      if (!visible || !width) return;

      const delta = Math.min(nextDelta(), 0.1);

      // Watchdog. The backdrop is the most expendable thing on the page, so it
      // is the first thing to go if the device can't keep up.
      if (samples < 200) {
        samples++;
        if (delta > 1 / 40) slow++;
        if (samples === 200 && slow > 80) {
          running = false;
          cancelAnimationFrame(frame);
          host.style.display = "none";
          return;
        }
      }

      auroraUniforms.uTime.value += delta;
      moteUniforms.uTime.value += delta;
      auroraUniforms.uMouse.value.lerp(pointerTarget, 0.03);
      moteUniforms.uMouse.value.lerp(pointerTarget, 0.05);

      // Bias the palette toward the selected category.
      const selected = selectionRef.current;
      const weights = auroraUniforms.uWeights.value as number[];
      for (let i = 0; i < CATEGORY_ORDER.length; i++) {
        const target = selected ? (CATEGORY_ORDER[i] === selected ? 2.6 : 0.35) : 1;
        weights[i] += (target - weights[i]) * Math.min(delta * 2.4, 1);
      }

      renderer.render(scene, camera);
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) resumeClock();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && document.visibilityState === "visible";
        if (visible) resumeClock();
      },
      { threshold: 0 }
    );
    io.observe(host);

    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);

      aurora.geometry.dispose();
      (aurora.material as THREE.Material).dispose();
      moteGeometry.dispose();
      (motes.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
      probe.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="size-full" />;
}

export default BackdropGL;
