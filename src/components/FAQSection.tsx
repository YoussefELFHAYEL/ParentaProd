"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "@/data/products";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FAQSection() {
  const ref       = useRef<HTMLDivElement>(null);
  const inView    = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 bg-cream">
      <div ref={ref} className="max-w-2xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
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
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                {/* Question button */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-forest text-sm sm:text-base leading-snug">
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#1B4332" : "rgba(27,67,50,0.10)" }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  >
                    {isOpen ? (
                      <Minus size={13} className="text-white" />
                    ) : (
                      <Plus size={13} className="text-forest" />
                    )}
                  </motion.div>
                </button>

                {/* Answer — spring expand */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height:  { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.22, ease: EASE },
                        },
                      }}
                      exit={{
                        height:  0,
                        opacity: 0,
                        transition: {
                          height:  { duration: 0.22, ease: [0.4, 0, 1, 1] },
                          opacity: { duration: 0.14 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 pt-4 text-sm text-forest/65 font-body leading-relaxed border-t border-forest/8">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
