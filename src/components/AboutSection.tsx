"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Logo } from "./Logo";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: "8+",     label: "Resources" },
  { value: "100%",   label: "Printable" },
  { value: "Instant", label: "Download" },
];

export function AboutSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="py-24 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #D8F3DC, #F5EDD6 60%, #FFFBF0)" }}
    >
      {/* Background photo layer — botanical warmth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src="https://picsum.photos/seed/pp-about-nature/1400/800"
          alt=""
          className="w-full h-full object-cover opacity-[0.07]"
        />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full bg-mint-pale/60 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full bg-beige/80 blur-2xl pointer-events-none animate-pulse-glow animation-delay-2000" />

      <div ref={ref} className="relative max-w-3xl mx-auto text-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.05 }}
          className="flex justify-center mb-8"
        >
          <Logo size={56} showText={false} />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-forest mt-3 mb-6"
        >
          Designed for Real Family Life
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="text-forest/70 font-body text-lg leading-relaxed max-w-xl mx-auto mb-10"
        >
          Parentapedia creates calm, practical, and beautifully designed digital
          tools for parents who want more peace, structure, and confidence at
          home. We believe parenting resources should feel as good as they work.
        </motion.p>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
          className="grid grid-cols-3 gap-4 max-w-md mx-auto"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="glass-card rounded-2xl py-4 px-3 text-center overflow-hidden relative shimmer-img cursor-default"
            >
              <p className="font-heading font-bold text-2xl text-forest">{stat.value}</p>
              <p className="text-xs text-forest/55 font-body mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
