"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Shield,
  ShoppingCart,
  Download,
  Printer,
  Clock,
} from "lucide-react";
import Link from "next/link";
import type { DBProduct } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";

const EASE = [0.16, 1, 0.3, 1] as const;

const FEATURES_BY_TYPE: Record<string, string[]> = {
  Printable: [
    "Instant PDF download after purchase",
    "US Letter & A4 sizes both included",
    "Print at home or at a local copy shop",
    "No account or subscription required",
  ],
  "PDF Guide": [
    "Instant PDF download after purchase",
    "Easy-to-read, actionable format",
    "Read on any device or print it out",
    "No account or subscription required",
  ],
  Planner: [
    "Instant PDF download after purchase",
    "Weekly & monthly layouts included",
    "US Letter & A4 sizes both included",
    "No account or subscription required",
  ],
  Checklist: [
    "Instant PDF download after purchase",
    "Ready to use immediately",
    "Print or use digitally on any device",
    "No account or subscription required",
  ],
  Flashcards: [
    "Instant PDF download after purchase",
    "Print-and-cut format with guides",
    "Beautiful full-color designs",
    "No account or subscription required",
  ],
};

const DEFAULT_FEATURES = [
  "Instant PDF download after purchase",
  "Printable at home on any printer",
  "No account or subscription required",
];

const TRUST_BADGES = [
  { Icon: Download, label: "Instant delivery" },
  { Icon: Printer,  label: "Print-ready PDF" },
  { Icon: Clock,    label: "Lifetime access" },
];

interface Props {
  product: DBProduct;
  related: DBProduct[];
}

export function ProductDetailClient({ product, related }: Props) {
  const features = FEATURES_BY_TYPE[product.type] ?? DEFAULT_FEATURES;
  const hasExternalLink = product.link && product.link !== "#";

  return (
    <div className="max-w-6xl mx-auto px-4">

      {/* Back navigation */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="mb-10"
      >
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-forest/60 hover:text-forest text-sm font-medium font-body transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          All Products
        </Link>
      </motion.div>

      {/* Product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">

        {/* Left: image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative rounded-3xl overflow-hidden min-h-[340px] lg:min-h-[520px]"
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}

          {/* Gradient fill — only shown when there's no real image */}
          {!product.image && (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
              }}
            />
          )}

          {/* Type badge */}
          <div className="absolute top-5 left-5">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/90 text-forest font-body shadow-sm">
              {product.type}
            </span>
          </div>

          {/* Trust badges row */}
          <div className="absolute bottom-5 left-5 right-5 flex gap-2 flex-wrap">
            {TRUST_BADGES.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 bg-white/85 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-forest font-body"
              >
                <Icon size={11} />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: info */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          className="flex flex-col justify-center"
        >
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-forest mb-4 leading-tight">
            {product.title}
          </h1>

          <p className="text-forest/70 font-body text-base leading-relaxed mb-8 max-w-lg">
            {product.description}
          </p>

          {/* Feature checklist */}
          <ul className="space-y-3 mb-10">
            {features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.22 + i * 0.07, ease: EASE }}
                className="flex items-center gap-3 text-sm text-forest/80 font-body"
              >
                <div className="w-5 h-5 rounded-full bg-sage/25 flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-forest-mid" strokeWidth={2.5} />
                </div>
                {f}
              </motion.li>
            ))}
          </ul>

          {/* Purchase card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-heading text-4xl font-bold text-forest">
                {product.price}
              </span>
              <span className="text-forest/45 text-sm font-body">
                one-time · instant download
              </span>
            </div>

            <motion.a
              href={hasExternalLink ? product.link : undefined}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: EASE }}
              className={`w-full flex items-center justify-center gap-2.5 bg-forest text-white font-semibold px-6 py-4 rounded-xl shadow-lg shadow-forest/25 text-sm mb-4 ${
                hasExternalLink ? "cursor-pointer" : "opacity-70 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={16} />
              Buy Now — {product.price}
            </motion.a>

            {!hasExternalLink && (
              <p className="text-center text-xs text-forest/40 font-body mb-4">
                Purchase link coming soon — check back shortly.
              </p>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-forest/45 font-body">
              <Shield size={12} />
              Secure checkout · Instant digital delivery
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
            className="font-heading text-2xl sm:text-3xl font-bold text-forest mb-8"
          >
            You might also like
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
