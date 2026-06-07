"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, ArrowRight, Layers, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import type { DBBundle } from "@/lib/db";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FeaturedBundle({ bundles }: { bundles: DBBundle[] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [[current, dir], setPage] = useState<[number, number]>([0, 0]);

  const paginate = useCallback(
    (newDir: number) => {
      setPage(([curr]) => [
        (curr + newDir + bundles.length) % bundles.length,
        newDir,
      ]);
    },
    [bundles.length]
  );

  useEffect(() => {
    if (bundles.length <= 1) return;
    const id = setInterval(() => paginate(1), 7000);
    return () => clearInterval(id);
  }, [bundles.length, paginate]);

  if (bundles.length === 0) return null;

  const b = bundles[current];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "6%" : "-6%", opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:  (d: number) => ({ x: d > 0 ? "-6%" : "6%", opacity: 0, scale: 0.98 }),
  };

  return (
    <section
      id="bundles"
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(150deg, #0F2B1F 0%, #1B4332 40%, #2D6A4F 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-5%] w-80 h-80 rounded-full opacity-20 animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #52B788, transparent)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-64 h-64 rounded-full opacity-15 animate-pulse-glow animation-delay-4000"
          style={{ background: "radial-gradient(circle, #74C69D, transparent)" }}
        />
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
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

        {/* Carousel wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          className="relative"
        >
          {/* Prev / Next arrows */}
          {bundles.length > 1 && (
            <>
              <button
                onClick={() => paginate(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-sm"
                aria-label="Previous bundle"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer backdrop-blur-sm"
                aria-label="Next bundle"
              >
                <ChevronRight size={18} className="text-white" />
              </button>
            </>
          )}

          {/* Animated card */}
          <div className="overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={b.id}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: EASE }}
                className="glass rounded-3xl overflow-hidden max-w-4xl mx-auto"
              >
                {/* Fixed height so the carousel never resizes between slides */}
                <div className="flex flex-col lg:flex-row gap-0 items-stretch lg:h-[440px]">

                  {/* Left: image / visual */}
                  <div className="w-full lg:w-2/5 flex-shrink-0 relative overflow-hidden min-h-[260px] lg:min-h-0">
                    {b.image ? (
                      <>
                        {/* Full-bleed image */}
                        <img
                          src={b.image}
                          alt={b.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Bottom-up gradient for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/30 to-transparent" />
                        {/* Info anchored at the bottom */}
                        <div className="relative z-10 flex flex-col justify-end h-full p-6">
                          <div className="flex items-center gap-1.5 bg-sage text-forest-dark text-xs font-bold px-2.5 py-1 rounded-full w-fit mb-3">
                            <Tag size={10} />
                            {b.savings}
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.06, rotate: 3 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="w-11 h-11 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center mb-3"
                          >
                            <Layers size={22} className="text-white" />
                          </motion.div>
                          <p className="font-heading text-white font-bold text-base leading-tight mb-1">
                            {b.title}
                          </p>
                          <p className="text-white/60 text-xs font-body">
                            {b.includes.length} resources included
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Gradient background */}
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(135deg, #1B4332, #52B788)" }}
                        />
                        {/* Decorative stacked cards — only without an image */}
                        <div className="absolute top-4 left-4 right-4 h-52 rounded-xl bg-white/10 border border-white/15 rotate-3" />
                        <div className="absolute top-2 left-2 right-6 h-52 rounded-xl bg-white/08 border border-white/10 -rotate-1" />
                        {/* Center content */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                          <motion.div
                            whileHover={{ scale: 1.08, rotate: 3 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-4"
                          >
                            <Layers size={28} className="text-white" />
                          </motion.div>
                          <p className="font-heading text-white font-bold text-lg leading-tight">
                            {b.title}
                          </p>
                          <p className="text-white/70 text-xs mt-2 font-body">
                            {b.includes.length} resources included
                          </p>
                        </div>
                        {/* Savings badge */}
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-sage text-forest-dark text-xs font-bold px-2.5 py-1 rounded-full z-10">
                          <Tag size={10} />
                          {b.savings}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right: details — flex column, CTA always pinned at bottom */}
                  <div className="flex-1 p-7 md:p-9 flex flex-col justify-between overflow-hidden">
                    {/* Top content */}
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-forest mb-2 leading-snug">
                        {b.title}
                      </h3>
                      <p className="text-forest/60 font-body text-sm leading-relaxed mb-4 line-clamp-2">
                        {b.description}
                      </p>

                      {/* Includes — cap at 6 so height is predictable */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {b.includes.slice(0, 6).map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <div className="mt-0.5 w-3.5 h-3.5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0">
                              <Check size={8} className="text-sage" />
                            </div>
                            <span className="text-xs text-forest/70 font-body leading-snug">{item}</span>
                          </div>
                        ))}
                        {b.includes.length > 6 && (
                          <p className="text-xs text-forest/40 font-body col-span-2 pt-1">
                            + {b.includes.length - 6} more included
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom: price + CTA — always visible */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-5 border-t border-forest/8 mt-4">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading text-3xl font-bold text-forest">{b.price}</span>
                          <span className="text-forest/40 line-through text-sm font-body">{b.originalPrice}</span>
                        </div>
                        <p className="text-xs text-sage font-semibold mt-0.5 font-body">Instant digital download</p>
                      </div>
                      <motion.a
                        href={b.link !== "#" ? b.link : undefined}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.16, ease: EASE }}
                        className="flex items-center gap-2 bg-forest text-white font-semibold px-6 py-3.5 rounded-2xl shadow-lg shadow-forest/30 cursor-pointer text-sm whitespace-nowrap"
                      >
                        View Bundle
                        <ArrowRight size={15} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          {bundles.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {bundles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage([i, i > current ? 1 : -1])}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? "bg-white w-6" : "bg-white/35 w-2 hover:bg-white/60"
                  }`}
                  aria-label={`Bundle ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
