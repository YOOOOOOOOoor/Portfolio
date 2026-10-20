// Components ported from React Bits (reactbits.dev): BlurText, ShinyText, Magnet, SpotlightCard.
// React Bits ships copy-paste source; these follow its originals, adapted to Motion + design tokens.
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function BlurText({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const revealProps = animateOnMount
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };
  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          initial={reduce ? false : animateOnMount ? { opacity: 0, y: 12 } : { opacity: 0, y: 18 }}
          {...revealProps}
          transition={{
            duration: reduce ? 0 : animateOnMount ? 0.48 : 0.8,
            delay: reduce ? 0 : delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {w}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
}

export function ShinyText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn("animate-shine bg-clip-text text-transparent", className)}
      style={{
        backgroundImage:
          "linear-gradient(120deg, var(--muted-foreground) 40%, var(--foreground) 50%, var(--muted-foreground) 60%)",
        backgroundSize: "200% 100%",
      }}
    >
      {children}
    </span>
  );
}

export function Magnet({ children, strength = 4 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  const onMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) / strength,
      y: (e.clientY - (r.top + r.height / 2)) / strength,
    });
  };
  return (
    <motion.div
      ref={ref}
      className="inline-block"
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0, y: 0, o: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setP({ x: e.clientX - r.left, y: e.clientY - r.top, o: 1 });
      }}
      onMouseLeave={() => setP((s) => ({ ...s, o: 0 }))}
      className={cn("relative overflow-hidden rounded-2xl border bg-card", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: p.o,
          background: `radial-gradient(420px circle at ${p.x}px ${p.y}px, color-mix(in oklab, var(--ember) 16%, transparent), transparent 60%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
