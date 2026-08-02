"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { categories } from "@/content/tech";
import { constellation } from "@/lib/constellation";

/**
 * WebGL constellation.
 *
 * Purely visual. Every interaction — hover, focus, click, keyboard — stays on
 * the HTML button layer rendered above this canvas, so the 3D version is not
 * more capable *or* less accessible than the SVG one. It just looks better.
 *
 * Deliberately written against three directly rather than pulling in drei and
 * postprocessing: the whole scene is one Points draw call plus one LineSegments
 * draw call, and the "bloom" is three lines of GLSL in the fragment shader
 * rather than a full EffectComposer pass. That is the difference between a
 * ~40 KB chunk and a ~250 KB one, and the budget for this layer is 200 KB.
 *
 * The parallax maths here is duplicated in CSS on the button layer (see
 * constellation.tsx) so the dots and their hit targets never drift apart.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScale;
  uniform float uDpr;

  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Depth parallax: nodes further from the plane shift more with the pointer.
    pos.xy += uPointer * pos.z * 0.06;

    // Slow drift so the scene is never completely static.
    pos.x += sin(uTime * 0.22 + aPhase) * 0.012;
    pos.y += cos(uTime * 0.19 + aPhase * 1.7) * 0.012;

    // Gentle repulsion from the pointer.
    vec2 away = pos.xy - uPointer;
    float dist = length(away);
    pos.xy += normalize(away + 0.0001) * (0.05 / (1.0 + dist * 9.0));

    // Breathing, offset per node so they don't pulse in unison.
    float breathe = 0.88 + 0.12 * sin(uTime * 0.9 + aPhase * 3.0);
    vAlpha = breathe;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // The sprite is much larger than the dot it draws: the solid core occupies
    // roughly 0.42 of the sprite (see the smoothstep bounds in the fragment
    // shader) and the rest is halo. 4.8 makes the rendered core the same
    // diameter as the SVG version's dot, so switching renderers isn't a jump.
    gl_PointSize = aSize * 4.8 * uScale * uDpr * breathe;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Distance from the centre of the point sprite.
    float d = length(gl_PointCoord - vec2(0.5));

    // Solid core with a soft halo. This is the bloom — doing it here costs one
    // smoothstep per fragment instead of an entire post-processing pass.
    float core = 1.0 - smoothstep(0.16, 0.26, d);
    float halo = 1.0 - smoothstep(0.26, 0.5, d);

    float alpha = (core + halo * 0.35) * vAlpha;
    if (alpha < 0.01) discard;

    gl_FragColor = vec4(vColor, alpha);
  }
`;

/** Reads a CSS custom property and returns it as a THREE.Color. */
function cssColor(value: string, probe: HTMLElement): THREE.Color {
  probe.style.color = value;
  const resolved = getComputedStyle(probe).color;
  return new THREE.Color(resolved);
}

export function ConstellationGL({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const { nodes, edges } = constellation;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Points don't benefit; this is free performance.
      powerPreference: "low-power",
    });

    // Adaptive DPR. Retina at 2x on a full-width canvas is four times the
    // fragments for a scene made of soft circles — not a good trade.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 3;

    // Resolve theme colours through a probe element so the shader gets the same
    // values the CSS does, in whatever theme is active.
    const probe = document.createElement("span");
    probe.style.display = "none";
    host.appendChild(probe);

    const count = nodes.length;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    nodes.forEach((node, i) => {
      positions[i * 3] = node.x;
      positions[i * 3 + 1] = -node.y; // Screen y is down, world y is up.
      positions[i * 3 + 2] = node.z;

      const color = cssColor(categories[node.category].color, probe);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = node.r;
      phases[i] = i * 1.37;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScale: { value: 1 },
      uDpr: { value: dpr },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      // Normal, not additive. Additive blending looks good on the dark theme and
      // then blows out to white on the light one, where overlapping halos on a
      // white canvas cancel the colour entirely.
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Edges. One LineSegments for all of them.
    const edgePositions = new Float32Array(edges.length * 6);
    edges.forEach(({ from, to }, i) => {
      edgePositions[i * 6] = from.x;
      edgePositions[i * 6 + 1] = -from.y;
      edgePositions[i * 6 + 2] = from.z;
      edgePositions[i * 6 + 3] = to.x;
      edgePositions[i * 6 + 4] = -to.y;
      edgePositions[i * 6 + 5] = to.z;
    });

    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: cssColor("var(--edge)", probe),
      transparent: true,
      opacity: 0.42,
    });

    const lines = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    scene.add(lines);

    // Colours are sampled from CSS once, so a theme switch has to re-sample
    // them — otherwise the constellation keeps the old theme's palette until
    // the next reload.
    const themeObserver = new MutationObserver(() => {
      nodes.forEach((node, i) => {
        const color = cssColor(categories[node.category].color, probe);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      });
      geometry.getAttribute("aColor").needsUpdate = true;
      edgeMaterial.color = cssColor("var(--edge)", probe);
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // --- sizing -------------------------------------------------------------
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      // Points are sized in pixels. Grow them gently with the canvas so the
      // constellation reads the same at 380px and at 700px, without letting
      // them balloon on a wide display.
      uniforms.uScale.value = THREE.MathUtils.clamp(width / 460, 0.8, 1.35);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    // --- pointer ------------------------------------------------------------
    const pointerTarget = new THREE.Vector2(0, 0);

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerTarget.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      );
    };

    const onPointerLeave = () => pointerTarget.set(0, 0);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);

    // Device tilt, where it is available and permitted.
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return;
      pointerTarget.set(
        THREE.MathUtils.clamp(event.gamma / 45, -1, 1),
        THREE.MathUtils.clamp(-event.beta / 90, -1, 1)
      );
    };
    window.addEventListener("deviceorientation", onOrientation);

    // --- loop ---------------------------------------------------------------
    let frame = 0;
    let running = true;
    let visible = true;
    const clock = new THREE.Clock();

    // Watchdog: if this device can't hold a decent frame rate, stop. The SVG
    // layer underneath is already a complete constellation, so stopping costs
    // the visitor nothing but a little polish.
    let samples = 0;
    let slowFrames = 0;

    const tick = () => {
      if (!running) return;
      frame = requestAnimationFrame(tick);

      if (!visible || width === 0) return;

      const delta = clock.getDelta();

      if (samples < 240) {
        samples++;
        if (delta > 1 / 40) slowFrames++;
        if (samples === 240 && slowFrames > 96) {
          // Sustained under 40fps for 40% of the sample. Not worth it.
          running = false;
          cancelAnimationFrame(frame);
          host.style.display = "none";
          return;
        }
      }

      uniforms.uTime.value += delta;
      uniforms.uPointer.value.lerp(pointerTarget, 0.045);

      renderer.render(scene, camera);
    };

    // Pause when the tab is hidden — the old site kept 43 animation loops
    // running in background tabs.
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible) clock.getDelta(); // Discard the gap.
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Pause when scrolled out of view.
    const inView = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && document.visibilityState === "visible";
        if (visible) clock.getDelta();
      },
      { threshold: 0 }
    );
    inView.observe(host);

    frame = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      inView.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("deviceorientation", onOrientation);
      host.removeEventListener("pointerleave", onPointerLeave);

      geometry.dispose();
      material.dispose();
      edgeGeometry.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      probe.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className={className} />;
}

export default ConstellationGL;
