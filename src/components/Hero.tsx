"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, CalendarDays, ClipboardList, Utensils } from "lucide-react";
import { ParticleField } from "./ParticleField";

/* ── Floating card data ─────────────────────────────── */
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
    delay: 0.4,
    animClass: "animate-float-1",
  },
  {
    icon: ClipboardList,
    label: "Positive Discipline",
    sub: "Checklist",
    pos: "bottom-[20%] left-[4%] md:left-[2%]",
    delay: 0.8,
    animClass: "animate-float-2",
  },
  {
    icon: Utensils,
    label: "Family Meal Planner",
    sub: "Planner",
    pos: "bottom-[22%] right-[4%] md:right-[2%]",
    delay: 1.2,
    animClass: "animate-float-3",
  },
];

/* ── Animation variants ─────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
};

/* Badge drops from above with spring */
const badgeVariant = {
  hidden:   { opacity: 0, y: -20, scale: 0.88 },
  visible:  {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 22, delay: 0.1 },
  },
};

/* Word-level variant — receives custom index */
const wordVariant = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      delay: 0.25 + i * 0.065,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/* Body text / CTA */
const fadeSlide = {
  hidden:  { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ── Word split helper ──────────────────────────────── */
function SplitWords({
  text,
  offset = 0,
  className,
}: {
  text: string;
  offset?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={offset + i}
          variants={wordVariant}
          className={`inline-block${className ? ` ${className}` : ""}`}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
  );
}

/* ── Blob component — Framer Motion driven ──────────── */
function Blob({
  className,
  color,
  delay = 0,
}: {
  className: string;
  color: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
      animate={
        reduce
          ? {}
          : {
              x:     [0, 28, -18, 0],
              y:     [0, -46, 18, 0],
              scale: [1, 1.10, 0.93, 1],
            }
      }
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95],
      }}
    />
  );
}

/* ── Main component ─────────────────────────────────── */
export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-forest-dark"
    >
      {/* ── Video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark forest overlay — keeps text readable without hiding the video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(15,43,31,0.78) 0%, rgba(27,67,50,0.62) 45%, rgba(45,106,79,0.42) 80%, rgba(27,67,50,0.55) 100%)",
        }}
      />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 hero-grain pointer-events-none" aria-hidden="true" />

      {/* Subtle particles — reduced count since video provides movement */}
      <ParticleField count={10} />

      {/* Floating glass cards */}
      {floatingCards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, scale: 0.82, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 18,
              delay: 0.9 + card.delay,
            }}
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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto text-center px-6 py-32"
      >
        {/* Badge */}
        <motion.div variants={badgeVariant} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/40">
            <Sparkles size={14} className="text-sage-light" />
            <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
              Digital Parenting Resources
            </span>
          </div>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <motion.h1
          initial="hidden"
          animate="visible"
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          <SplitWords text="Digital Parenting Tools" offset={0} />
          <span className="block italic text-mint-pale mt-1">
            <SplitWords text="for Calm, Organized Families" offset={3} />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeSlide}
          className="text-base sm:text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Beautiful printable guides, planners, checklists, and parenting
          resources designed to make everyday family life easier.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeSlide}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#products"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] as const }}
            className="flex items-center justify-center gap-2 bg-white text-forest font-semibold px-8 py-3.5 rounded-2xl shadow-xl shadow-black/20 cursor-pointer"
          >
            Browse Products
            <ArrowRight size={16} />
          </motion.a>
          <motion.a
            href="#bundles"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] as const }}
            className="flex items-center justify-center gap-2 glass border border-white/50 text-white font-semibold px-8 py-3.5 rounded-2xl cursor-pointer"
          >
            View Bundles
          </motion.a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={fadeSlide}
          className="mt-10 text-xs text-white/50 tracking-wide"
        >
          Instant digital download · Beautiful printable designs · No fluff, just useful tools
        </motion.p>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #FFFBF0)" }}
      />
    </section>
  );
}
