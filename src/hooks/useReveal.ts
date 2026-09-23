"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const stateRef = useRef(false);

  const subscribe = useCallback((onChange: () => void) => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      stateRef.current = true;
      onChange();
      return () => {};
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stateRef.current = true;
          onChange();
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getSnapshot = useCallback(() => stateRef.current, []);
  const getServerSnapshot = useCallback(() => false, []);

  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { ref, visible };
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}
