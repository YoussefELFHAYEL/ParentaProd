"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  xDrift: number;
}

export function ParticleField({ count = 22 }: { count?: number }) {
  const reduce = useReducedMotion();

  /* Deterministic pseudo-random values so SSR + CSR match */
  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: count }, (_, i) => {
      const s = i + 1;
      return {
        id: i,
        left: ((s * 47 + 13) % 94) + 3,
        top:  ((s * 61 + 7)  % 88) + 6,
        size: 1.5 + (s % 4) * 0.7,
        duration: 6 + (s % 7),
        delay: (s * 0.38) % 5,
        opacity: 0.12 + (s % 5) * 0.05,
        xDrift: ((s % 7) - 3) * 5,
      };
    }),
    [count]
  );

  if (reduce) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            top:  `${p.top}%`,
            width:  p.size,
            height: p.size,
            willChange: "transform, opacity",
          }}
          animate={{
            y:       [0, -18, -4, 0],
            x:       [0, p.xDrift, p.xDrift * 0.4, 0],
            opacity: [p.opacity, p.opacity * 2.2, p.opacity * 1.4, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     [0.45, 0.05, 0.55, 0.95],
          }}
        />
      ))}
    </div>
  );
}
