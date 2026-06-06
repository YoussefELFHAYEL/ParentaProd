"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, CalendarDays, ClipboardList, Utensils } from "lucide-react";

const floatingCards = [
  {
    icon: CalendarDays,
    label: "Bedtime Routine Chart",
    sub: "Printable",
    pos: "top-[18%] left-[5%] md:left-[3%]",
    delay: 0,
    animClass: "animate-float",
  },
  {
    icon: BookOpen,
    label: "Toddler Tantrum Guide",
    sub: "PDF Guide",
    pos: "top-[14%] right-[5%] md:right-[3%]",
    delay: 0.5,
    animClass: "animate-float-1",
  },
  {
    icon: ClipboardList,
    label: "Positive Discipline",
    sub: "Checklist",
    pos: "bottom-[20%] left-[4%] md:left-[2%]",
    delay: 1,
    animClass: "animate-float-2",
  },
  {
    icon: Utensils,
    label: "Family Meal Planner",
    sub: "Planner",
    pos: "bottom-[22%] right-[4%] md:right-[2%]",
    delay: 1.5,
    animClass: "animate-float-3",
  },
];

const stagger = {
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0F2B1F 0%, #1B4332 30%, #2D6A4F 60%, #74C69D 85%, #D8F3DC 100%)",
      }}
    >
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-30 animate-blob"
          style={{ background: "radial-gradient(circle, #52B788, transparent)" }}
        />
        <div
          className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-20 animate-blob animation-delay-2000"
          style={{ background: "radial-gradient(circle, #74C69D, transparent)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[30%] w-[350px] h-[350px] rounded-full opacity-25 animate-blob animation-delay-4000"
          style={{ background: "radial-gradient(circle, #D8F3DC, transparent)" }}
        />
      </div>

      {/* Floating glass cards – hidden on small screens */}
      {floatingCards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + card.delay, ease: [0.23, 1, 0.32, 1] as const }}
            className={`absolute hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl glass-card ${card.pos} ${card.animClass}`}
          >
            <div className="p-2 rounded-xl bg-forest/10">
              <Icon size={18} className="text-forest" />
            </div>
            <div>
              <p className="text-xs font-semibold text-forest leading-tight">{card.label}</p>
              <p className="text-[10px] text-forest/60 mt-0.5">{card.sub}</p>
            </div>
          </motion.div>
        );
      })}

      {/* Hero content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto text-center px-6 py-32"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/40">
            <Sparkles size={14} className="text-sage-light" />
            <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
              Digital Parenting Resources
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Digital Parenting Tools
          <span className="block italic text-mint-pale mt-1">
            for Calm, Organized Families
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Beautiful printable guides, planners, checklists, and parenting
          resources designed to make everyday family life easier.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#products"
            className="flex items-center justify-center gap-2 bg-white text-forest font-semibold px-8 py-3.5 rounded-2xl hover:bg-mint-pale transition-[transform,background-color,box-shadow] duration-200 shadow-xl shadow-black/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] cursor-pointer"
          >
            Browse Products
            <ArrowRight size={16} />
          </a>
          <a
            href="#bundles"
            className="flex items-center justify-center gap-2 glass border border-white/50 text-white font-semibold px-8 py-3.5 rounded-2xl hover:bg-white/20 transition-[transform,background-color] duration-200 active:scale-[0.97] cursor-pointer"
          >
            View Bundles
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={fadeUp}
          className="mt-10 text-xs text-white/50 tracking-wide"
        >
          Instant digital download · Beautiful printable designs · No fluff, just useful tools
        </motion.p>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #FFFBF0)",
        }}
      />
    </section>
  );
}
