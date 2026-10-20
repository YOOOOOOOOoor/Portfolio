// Inspired by Aceternity UI "3D Card Effect", rebuilt with Motion springs.
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function TiltCard({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 20 });
  return (
    <div style={{ perspective: 1400 }}>
      <motion.div
        style={reduce ? {} : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
