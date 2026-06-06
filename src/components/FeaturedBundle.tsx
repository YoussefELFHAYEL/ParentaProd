"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Layers, Tag } from "lucide-react";
import type { DBBundle } from "@/lib/db";

export function FeaturedBundle({ bundle: featuredBundle }: { bundle: DBBundle }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="bundles"
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #0F2B1F 0%, #1B4332 40%, #2D6A4F 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-5%] w-80 h-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #52B788, transparent)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-64 h-64 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #74C69D, transparent)" }}
        />
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] as const }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-sage font-body">
            Best Value
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Get the Complete Toolkit
          </h2>
          <p className="text-white/65 max-w-md mx-auto text-base font-body leading-relaxed">
            Everything you need in one beautiful bundle at a fraction of the price.
          </p>
        </motion.div>

        {/* Bundle card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.23, 1, 0.32, 1] as const }}
          className="glass rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left: Bundle mockup */}
            <div className="w-full lg:w-2/5 flex-shrink-0">
              <div
                className="relative h-64 lg:h-72 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1B4332, #52B788)" }}
              >
                {/* Stack effect */}
                <div className="absolute top-4 left-4 right-4 h-52 rounded-xl bg-white/15 border border-white/20 rotate-3" />
                <div className="absolute top-2 left-2 right-6 h-52 rounded-xl bg-white/10 border border-white/15 -rotate-1" />

                <div className="relative z-10 text-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-4">
                    <Layers size={28} className="text-white" />
                  </div>
                  <p className="font-heading text-white font-bold text-lg leading-tight">
                    {featuredBundle.title}
                  </p>
                  <p className="text-white/70 text-xs mt-2 font-body">
                    {featuredBundle.includes.length} resources included
                  </p>
                </div>

                {/* Savings badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-sage text-forest-dark text-xs font-bold px-2.5 py-1 rounded-full">
                  <Tag size={10} />
                  {featuredBundle.savings}
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex-1">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-forest mb-3">
                {featuredBundle.title}
              </h3>
              <p className="text-forest/65 font-body text-sm leading-relaxed mb-6">
                {featuredBundle.description}
              </p>

              {/* Includes list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {featuredBundle.includes.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-sage" />
                    </div>
                    <span className="text-xs text-forest/75 font-body leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Pricing + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-3xl font-bold text-forest">
                      {featuredBundle.price}
                    </span>
                    <span className="text-forest/40 line-through text-base font-body">
                      {featuredBundle.originalPrice}
                    </span>
                  </div>
                  <p className="text-xs text-sage font-semibold mt-0.5 font-body">
                    Instant digital download
                  </p>
                </div>
                <a
                  href={featuredBundle.link}
                  className="flex items-center gap-2 bg-forest text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-forest-mid transition-[transform,background-color,box-shadow] duration-200 shadow-lg shadow-forest/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] cursor-pointer text-sm"
                >
                  View Bundle
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
