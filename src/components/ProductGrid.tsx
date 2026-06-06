"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import type { DBProduct } from "@/lib/db";
import { ProductCard } from "./ProductCard";

const PRODUCT_TYPES = ["Printable", "PDF Guide", "Planner", "Checklist", "Flashcards"] as const;
type FilterType = typeof PRODUCT_TYPES[number] | "All";

interface ProductGridProps {
  products: DBProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [activeType, setActiveType] = useState<FilterType>("All");
  const [query, setQuery] = useState("");

  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesType   = activeType === "All" || p.type === activeType;
      const matchesSearch = !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [products, activeType, query]);

  const filterTypes: FilterType[] = ["All", ...PRODUCT_TYPES];

  return (
    <section id="products" className="relative py-24 px-4 bg-cream">
      <div ref={ref} className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] as const }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4">
            Parenting Tools That Actually Help
          </h2>
          <p className="text-forest/60 max-w-xl mx-auto text-base font-body leading-relaxed">
            Beautifully designed printable resources for every stage of the parenting journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.23, 1, 0.32, 1] as const }}
          className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
        >
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-forest/40" />
            <input
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass border border-forest/10 text-sm text-forest placeholder:text-forest/40 focus:outline-none focus:border-forest/30 transition-all font-body"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <SlidersHorizontal size={14} className="text-forest/40 mr-1 hidden sm:block" />
            {filterTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeType === type
                    ? "bg-forest text-white shadow-md shadow-forest/25"
                    : "glass border border-forest/12 text-forest/70 hover:border-forest/30 hover:text-forest"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-16 h-16 rounded-full glass-mint flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-forest/40" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-forest mb-2">No products found</h3>
            <p className="text-forest/50 text-sm font-body">Try adjusting your search or filter.</p>
            <button
              onClick={() => { setQuery(""); setActiveType("All"); }}
              className="mt-4 text-sm text-forest underline underline-offset-2 cursor-pointer"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
