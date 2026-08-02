"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query.
 *
 * useSyncExternalStore rather than useEffect + setState: a media query is
 * external state that React should read from, not state React owns. It also
 * gives a correct server snapshot instead of rendering the wrong branch and
 * then correcting it after mount.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback
  );
}

/**
 * Subscribe to an attribute on <html>. The theme and the motion preference both
 * live there — set before first paint by the inline theme script — so this is
 * how components read them without owning a duplicate copy in React state.
 */
export function useRootAttribute(attribute: string, serverFallback = ""): string {
  const subscribe = useCallback((onChange: () => void) => {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attribute],
    });
    return () => observer.disconnect();
  }, [attribute]);

  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute(attribute) ?? "",
    () => serverFallback
  );
}
