"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bookmark, ArrowRight, CalendarDays, ClipboardList, BookOpen } from "lucide-react";

const pins = [
  {
    title: "Calm Bedtime Routine",
    sub: "Printable · $7",
    Icon: CalendarDays,
    gradientFrom: "#1B4332",
    gradientTo: "#52B788",
    delay: 0.1,
  },
  {
    title: "Positive Discipline Checklist",
    sub: "Checklist · $5",
    Icon: ClipboardList,
    gradientFrom: "#2D6A4F",
    gradientTo: "#74C69D",
    delay: 0.2,
  },
  {
    title: "Toddler Tantrum Guide",
    sub: "PDF Guide · $12",
    Icon: BookOpen,
    gradientFrom: "#40916C",
    gradientTo: "#D8F3DC",
    delay: 0.3,
  },
];

export function PinterestSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 px-4 bg-parchment overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-14 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 bg-[#E60023]/10 text-[#E60023] text-xs font-bold px-3 py-1.5 rounded-full mb-6 font-body">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
              Pinterest-Ready
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-5 leading-tight">
              Save It, Print It,
              <span className="italic block text-forest-mid">Use It Today</span>
            </h2>

            <p className="text-forest/65 font-body text-base leading-relaxed mb-8 max-w-md">
              Parentapedia products are designed to be simple, beautiful, and
              instantly useful — perfect for parents looking for quick solutions
              and printable tools.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Find it on Pinterest",
                "Instant download, no waiting",
                "Print at home in minutes",
                "Beautiful designs your family will love",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-forest/75 font-body">
                  <div className="w-5 h-5 rounded-full bg-mint-pale flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-sage" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-forest text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-forest-mid transition-[transform,background-color,box-shadow] duration-200 shadow-lg shadow-forest/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] cursor-pointer text-sm"
            >
              Browse All Products
              <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Pinterest-style pin cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.23, 1, 0.32, 1] as const }}
            className="flex-1 flex gap-4 justify-center"
          >
            {pins.map((pin, i) => {
              const Icon = pin.Icon;
              return (
                <motion.div
                  key={pin.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.23, 1, 0.32, 1] as const }}
                  className={`flex-1 max-w-[140px] rounded-2xl overflow-hidden glass-card cursor-pointer group hover:-translate-y-2 active:translate-y-0 transition-transform duration-300 ${
                    i === 1 ? "mt-8" : ""
                  }`}
                >
                  {/* Pin image area */}
                  <div
                    className="relative h-52 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(160deg, ${pin.gradientFrom}, ${pin.gradientTo})`,
                    }}
                  >
                    <div className="p-4 rounded-xl bg-white/20 border border-white/30">
                      <Icon size={24} className="text-white" />
                    </div>
                    <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors cursor-pointer">
                      <Bookmark size={12} className="text-forest" />
                    </button>
                  </div>

                  {/* Pin info */}
                  <div className="p-3">
                    <p className="font-heading text-xs font-semibold text-forest leading-snug">
                      {pin.title}
                    </p>
                    <p className="text-[10px] text-forest/50 mt-1 font-body">{pin.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
