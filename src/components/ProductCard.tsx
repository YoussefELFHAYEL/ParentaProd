"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ExternalLink,
  Leaf,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Layers,
  CreditCard,
} from "lucide-react";
import type { DBProduct } from "@/lib/db";

const TYPE_COLORS: Record<string, string> = {
  Printable:   "bg-forest/10 text-forest",
  "PDF Guide": "bg-sage/20 text-forest-mid",
  Planner:     "bg-mint-pale text-forest",
  Checklist:   "bg-beige text-forest-dark",
  Flashcards:  "bg-sage-light/20 text-forest-mid",
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  Printable:   Leaf,
  "PDF Guide": BookOpen,
  Planner:     CalendarDays,
  Checklist:   ClipboardList,
  Flashcards:  CreditCard,
  Bundle:      Layers,
};

interface ProductCardProps {
  product: DBProduct;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const ref    = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const Icon   = TYPE_ICONS[product.type] ?? Leaf;

  /* ── 3D tilt via motion values (no re-renders) ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawRotY = useTransform(mouseX, [-0.5, 0.5], [-9, 9]);
  const rawRotX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useSpring(rawRotY, { stiffness: 220, damping: 22 });
  const rotateX = useSpring(rawRotX, { stiffness: 220, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduce) return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
      mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
    },
    [mouseX, mouseY, reduce]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.a
      ref={ref}
      href={`/products/${product.id}`}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      style={
        reduce
          ? {}
          : { rotateX, rotateY, transformPerspective: 900, willChange: "transform" }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col rounded-2xl glass-card overflow-hidden cursor-pointer"
    >
      {/* Image / gradient area */}
      <div className="relative h-48 overflow-hidden shimmer-img">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-500 ease-out"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
            }}
          >
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute bottom-[-20%] left-[-10%] w-24 h-24 rounded-full bg-white/10" />
            <motion.div
              className="relative z-10 p-5 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] as const }}
            >
              <Icon size={32} className="text-white" />
            </motion.div>
          </div>
        )}

        {/* Type badge — always white bg so it's readable over any image */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full font-body bg-white/92 text-forest shadow-sm backdrop-blur-sm">
            {product.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-heading font-semibold text-forest text-base leading-snug group-hover:text-forest-mid transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-forest/65 leading-relaxed flex-1 font-body">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-1 pt-3 border-t border-forest/8">
          <span className="font-heading font-bold text-forest text-lg">
            {product.price}
          </span>
          <motion.div
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] as const }}
            className="flex items-center gap-1.5 text-xs font-semibold bg-forest text-white px-4 py-2 rounded-xl shadow-sm pointer-events-none"
          >
            View Product
            <ExternalLink size={11} />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}
