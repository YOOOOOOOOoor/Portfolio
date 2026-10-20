import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Desktop-only cursor and shared project preview, both driven by one pointer loop. */
export function PortfolioCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLElement | null>(null);
  const ambientActive = useRef(false);
  const target = useRef({ x: -100, y: -100 });
  const position = useRef({ x: -100, y: -100 });
  const [hover, setHover] = useState({ label: "", image: "" });
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!media.matches) return;
    document.body.classList.add("portfolio-cursor-enabled");
    let frame: number | null = null;
    let scrollTimeout: number | null = null;
    let scrolling = false;
    let visible = false;
    let hovered: Element | null = null;
    const updateHover = (targetElement: Element | null) => {
      const projectRow = targetElement?.closest<HTMLElement>("[data-project-image]") ?? null;
      const interactive = targetElement?.closest<HTMLElement>("a, button") ?? null;
      const context = projectRow ?? interactive;
      if (context !== hovered) {
        hovered = context;
        setHover({
          label: context?.dataset["cursorLabel"] ?? (context ? "Open" : ""),
          image: scrolling ? "" : (projectRow?.dataset["projectImage"] ?? ""),
        });
      }
    };
    const move = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      if (!visible) position.current = target.current;
      visible = true;
      if (dot.current) {
        dot.current.style.opacity = "1";
        dot.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
      }
      const targetElement = event.target as Element | null;
      const ambientContainer = targetElement?.closest<HTMLElement>("[data-image-glow]") ?? null;
      const isAmbient = ambientContainer !== null;
      if (isAmbient !== ambientActive.current) {
        glow.current?.style.setProperty("opacity", "0");
        glow.current?.classList.remove("is-active");
        glow.current = isAmbient
          ? (ambientContainer?.querySelector<HTMLElement>(".case-study-glow") ?? null)
          : null;
        ambientActive.current = isAmbient;
        glow.current?.style.setProperty("opacity", "1");
        glow.current?.classList.add("is-active");
      }
      updateHover(targetElement);
      if (frame === null) frame = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        setHover((current) => (current.image ? { ...current, image: "" } : current));
      }
      if (scrollTimeout !== null) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        scrolling = false;
        scrollTimeout = null;
        if (!visible) return;
        // Scrolling moves the page beneath a stationary pointer. Re-hit-test at its
        // viewport coordinates so the preview returns only when a row is still there.
        hovered = null;
        updateHover(document.elementFromPoint(target.current.x, target.current.y));
      }, 120);
    };
    const leave = () => {
      visible = false;
      if (scrollTimeout !== null) {
        window.clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }
      scrolling = false;
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
      glow.current?.style.setProperty("opacity", "0");
      glow.current?.classList.remove("is-active");
      glow.current = null;
      ambientActive.current = false;
      setHover({ label: "", image: "" });
      hovered = null;
    };
    const pointerout = (event: PointerEvent) => {
      if (!event.relatedTarget) leave();
    };
    const tick = () => {
      const { x, y } = target.current;
      position.current.x += (x - position.current.x) * 0.18;
      position.current.y += (y - position.current.y) * 0.18;
      const { x: px, y: py } = position.current;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${px}px,${py}px,0)`;
        ring.current.style.opacity = visible ? "1" : "0";
      }
      if (preview.current) {
        const width = preview.current.offsetWidth;
        const height = preview.current.offsetHeight;
        const gap = 20;
        const desiredLeft = px + gap;
        const desiredTop = py + gap;
        const left = Math.max(
          12,
          Math.min(
            desiredLeft + width > window.innerWidth - 12 ? px - width - gap : desiredLeft,
            window.innerWidth - width - 12,
          ),
        );
        const top = Math.max(
          12,
          Math.min(
            desiredTop + height > window.innerHeight - 12 ? py - height - gap : desiredTop,
            window.innerHeight - height - 12,
          ),
        );
        preview.current.style.transform = `translate3d(${left}px,${top}px,0)`;
      }
      if (glow.current) {
        const host = glow.current.parentElement;
        const bounds = host?.getBoundingClientRect();
        if (bounds) {
          const radius = glow.current.offsetWidth / 2;
          glow.current.style.transform = `translate3d(${px - bounds.left - radius}px,${py - bounds.top - radius}px,0)`;
        }
      }
      if (Math.abs(x - px) > 0.15 || Math.abs(y - py) > 0.15) {
        frame = requestAnimationFrame(tick);
      } else {
        position.current = { x, y };
        frame = null;
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerout", pointerout);
    window.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      if (scrollTimeout !== null) window.clearTimeout(scrollTimeout);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerout", pointerout);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      document.body.classList.remove("portfolio-cursor-enabled");
    };
  }, []);
  useEffect(() => {
    glow.current?.style.setProperty("opacity", "0");
    glow.current?.classList.remove("is-active");
    glow.current = null;
    ambientActive.current = false;
    setHover({ label: "", image: "" });
  }, [pathname]);
  return (
    <>
      <div ref={dot} className="portfolio-cursor-dot" aria-hidden="true" />
      <div
        ref={ring}
        className={`portfolio-cursor-ring ${hover.label ? "is-hover" : ""}`}
        aria-hidden="true"
      >
        {hover.label && <span>{hover.label}</span>}
      </div>
      <div
        ref={preview}
        className={`portfolio-cursor-preview ${hover.image ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        {hover.image && <img src={hover.image} alt="" />}
      </div>
    </>
  );
}
