/**
 * Runs before first paint, so there is never a flash of the wrong theme.
 *
 * It sets three things on <html>:
 *   data-theme  — "light" | "dark", from storage or the OS
 *   data-motion — "reduce" when the OS asks for reduced motion
 *   class="js"  — lets CSS hide scroll-reveal elements only when JS can show
 *                 them again. Without it a JS failure leaves a blank page.
 *
 * Deliberately un-minified and dependency-free: it is inlined into the HTML on
 * every request, so it must stay small and must never throw.
 */

const script = `(function(){
  try {
    var root = document.documentElement;
    root.classList.add('js');

    var stored = null;
    try { stored = localStorage.getItem('theme'); } catch (e) {}

    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.setAttribute('data-theme', theme);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.setAttribute('data-motion', 'reduce');
    }
  } catch (e) {}
})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
