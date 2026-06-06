"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Leaf, BookOpen, CalendarDays, ClipboardList, Layers, CreditCard } from "lucide-react";
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = TYPE_ICONS[product.type] ?? Leaf;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: [0.23, 1, 0.32, 1] as const }}
      className="group flex flex-col rounded-2xl glass-card overflow-hidden hover:shadow-xl hover:shadow-forest/15 hover:-translate-y-1 transition-[transform,box-shadow] duration-300 cursor-pointer"
    >
      {/* Image / gradient area */}
      <div className="relative h-48 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
          >
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute bottom-[-20%] left-[-10%] w-24 h-24 rounded-full bg-white/10" />
            <div className="relative z-10 p-5 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 group-hover:scale-105 transition-transform duration-300">
              <Icon size={32} className="text-white" />
            </div>
          </div>
        )}
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[product.type] ?? "bg-forest/10 text-forest"} font-body`}>
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
          <a
            href={product.link}
            className="flex items-center gap-1.5 text-xs font-semibold bg-forest text-white px-4 py-2 rounded-xl hover:bg-forest-mid transition-[transform,background-color,box-shadow] duration-150 shadow-sm hover:shadow-md active:scale-[0.97] cursor-pointer"
          >
            View Product
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
