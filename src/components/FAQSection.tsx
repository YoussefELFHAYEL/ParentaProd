"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "@/data/products";

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 bg-cream">
      <div ref={ref} className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] as const }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-forest mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-forest/60 font-body text-base leading-relaxed">
            Everything you need to know about Parentapedia products.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] as const }}
              className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? "shadow-lg shadow-forest/10" : ""
              }`}
            >
              {/* Question */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer"
                aria-expanded={openIndex === i}
              >
                <span className="font-heading font-semibold text-forest text-sm sm:text-base leading-snug">
                  {item.q}
                </span>
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === i
                      ? "bg-forest text-white"
                      : "bg-forest/10 text-forest"
                  }`}
                >
                  {openIndex === i ? (
                    <Minus size={13} />
                  ) : (
                    <Plus size={13} />
                  )}
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1, transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] as const } }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const } }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-forest/65 font-body leading-relaxed border-t border-forest/8 pt-4">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
