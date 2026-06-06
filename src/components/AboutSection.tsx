"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Logo } from "./Logo";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="py-24 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #D8F3DC, #F5EDD6 60%, #FFFBF0)" }}
    >
      {/* Decorative circles */}
      <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-mint-pale/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full bg-beige/80 blur-2xl pointer-events-none" />

      <div ref={ref} className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }}
          className="flex justify-center mb-8"
        >
          <Logo size={56} showText={false} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.23, 1, 0.32, 1] as const }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-forest mt-3 mb-6"
        >
          Designed for Real Family Life
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.17, ease: [0.23, 1, 0.32, 1] as const }}
          className="text-forest/70 font-body text-lg leading-relaxed max-w-xl mx-auto mb-10"
        >
          Parentapedia creates calm, practical, and beautifully designed digital
          tools for parents who want more peace, structure, and confidence at
          home. We believe parenting resources should feel as good as they work.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.23, 1, 0.32, 1] as const }}
          className="grid grid-cols-3 gap-4 max-w-md mx-auto"
        >
          {[
            { value: "8+", label: "Resources" },
            { value: "100%", label: "Printable" },
            { value: "Instant", label: "Download" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl py-4 px-3 text-center"
            >
              <p className="font-heading font-bold text-2xl text-forest">{stat.value}</p>
              <p className="text-xs text-forest/55 font-body mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
