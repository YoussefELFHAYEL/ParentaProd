"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Palette, Heart, Feather } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-4 bg-cream">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4">
            Why Parents Love It
          </h2>
          <p className="text-forest/60 max-w-md mx-auto text-base font-body leading-relaxed">
            Designed for real family life — practical, peaceful, and actually useful.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Featured large card — dark forest */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.07, ease: EASE_OUT }}
            className="md:col-span-2 rounded-2xl p-8 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0F2B1F 0%, #1B4332 55%, #2D6A4F 100%)",
            }}
          >
            <div className="absolute top-[-30%] right-[-8%] w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center mb-6">
              <Zap size={22} className="text-sage-light" />
            </div>
            <h3 className="font-heading font-bold text-white text-xl mb-2 leading-snug">
              Instant Digital Download
            </h3>
            <p className="text-white/65 text-sm font-body leading-relaxed max-w-sm">
              No waiting. Your files are ready to download the moment your order is complete.
            </p>
          </motion.div>

          {/* Mint accent card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14, ease: EASE_OUT }}
            className="rounded-2xl p-6"
            style={{
              background: "#EAF7F0",
              border: "1px solid #95D5B2",
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-sage/20 flex items-center justify-center mb-5">
              <Palette size={20} className="text-forest-mid" />
            </div>
            <h3 className="font-heading font-semibold text-forest text-base mb-2 leading-snug">
              Beautiful Printable Designs
            </h3>
            <p className="text-forest/65 text-sm font-body leading-relaxed">
              Carefully crafted to look great printed at home or at a copy shop.
            </p>
          </motion.div>

          {/* Warm beige card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.21, ease: EASE_OUT }}
            className="rounded-2xl p-6"
            style={{
              background: "#FFF8EE",
              border: "1px solid #EDE0C4",
            }}
          >
            <div className="w-11 h-11 rounded-xl bg-beige-dark/60 flex items-center justify-center mb-5">
              <Heart size={20} className="text-forest" />
            </div>
            <h3 className="font-heading font-semibold text-forest text-base mb-2 leading-snug">
              Simple & Practical Tools
            </h3>
            <p className="text-forest/65 text-sm font-body leading-relaxed">
              No fluff. Everything is created with real family life in mind.
            </p>
          </motion.div>

          {/* Span-2 glass card with horizontal layout */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.28, ease: EASE_OUT }}
            className="md:col-span-2 glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-5"
          >
            <div className="w-11 h-11 rounded-xl bg-forest/10 flex items-center justify-center flex-shrink-0">
              <Feather size={20} className="text-forest" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-forest text-base mb-2 leading-snug">
                No Overwhelm, Just Resources
              </h3>
              <p className="text-forest/65 text-sm font-body leading-relaxed">
                Each product does one thing really well. Pick what you need, use it today.
                No subscriptions, no account needed, no complexity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
