import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { useLenis } from "lenis/react";

declare module "@tanstack/history" {
  interface HistoryState {
    portfolioScrollTarget?: string;
  }
}

/** Scroll to a section id; uses Lenis when active, native otherwise. */
export function useScrollTo() {
  const lenis = useLenis();
  return useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;
      if (lenis) lenis.scrollTo(element, { offset: -72 });
      else
        element.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      element.focus({ preventScroll: true });
    },
    [lenis],
  );
}

/** Scroll locally, or carry a section destination to the homepage in history state. */
export function useHomeSectionNavigation() {
  const go = useScrollTo();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return useCallback(
    (id: string) => {
      if (pathname === "/") go(id);
      else void navigate({ to: "/", state: { portfolioScrollTarget: id } });
    },
    [go, navigate, pathname],
  );
}

/** Consume a transient section destination after the homepage has mounted. */
export function useHomeSectionTarget() {
  const go = useScrollTo();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const locationKey = useRouterState({ select: (state) => state.location.state.__TSR_key });
  const target = useRouterState({
    select: (state) => state.location.state.portfolioScrollTarget,
  });
  useEffect(() => {
    if (pathname !== "/" || !target) return;
    const frame = requestAnimationFrame(() => go(target));
    return () => cancelAnimationFrame(frame);
  }, [pathname, locationKey, target, go]);
}
