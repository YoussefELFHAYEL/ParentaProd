"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Brand SVG logos ─────────────────────────────────────────── */

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function EtsyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
      <path d="M9.105 4.69c0-1.045.015-1.162.346-1.348.211-.12.45-.12.663-.105l.663.03V2H5.4v1.267c.916.015 1.002.09 1.002.225v18.017c0 .27-.27.27-1.002.27V23H20.1l.9-5.085-1.2-.045s-.33 1.47-.6 2.025c-.33.69-.555.78-2.505.78H13.38c-.78 0-.9-.12-.9-.78v-8.25l2.25.015c1.005 0 1.23.42 1.23 1.755h1.2V7.5h-1.2c0 1.425-.195 1.74-1.23 1.74L12.48 9.24V4.26c0-.54.12-.63.75-.63h2.895c1.875 0 2.28.39 2.625 2.625L20.01 6.3 19.5 2H9.105v2.69z" />
    </svg>
  );
}

function GumroadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
      <path d="M11.997 0C5.378 0 0 5.376 0 12c0 6.623 5.378 12 11.997 12C18.621 24 24 18.623 24 12c0-6.624-5.379-12-12.003-12zm-.18 19.98c-4.408 0-7.98-3.576-7.98-7.98s3.572-7.98 7.98-7.98c2.14 0 4.08.845 5.504 2.215l-2.152 2.152a4.71 4.71 0 00-3.352-1.386c-2.607 0-4.723 2.117-4.723 4.723 0 2.607 2.116 4.724 4.723 4.724 2.082 0 3.862-1.266 4.566-3.063h-4.566v-2.961h7.937c.09.468.143.952.143 1.45 0 4.404-3.576 8.106-8.08 8.106z" />
    </svg>
  );
}

function LemonSqueezyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
      {/* Lemon body */}
      <ellipse cx="12" cy="13" rx="8" ry="7" />
      {/* Left nub */}
      <path d="M4 13 C4 13 1.5 11 2.5 8.5 C3.5 10 4 13 4 13Z" />
      {/* Right nub */}
      <path d="M20 13 C20 13 22.5 11 21.5 8.5 C20.5 10 20 13 20 13Z" />
      {/* Leaf */}
      <path d="M12 6 C12 6 14 2 17 2 C17 5 14 6 12 6Z" opacity="0.85" />
      {/* Shine */}
      <ellipse cx="9" cy="10" rx="2.2" ry="1.4" fill="white" opacity="0.3" />
    </svg>
  );
}

function PayhipIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
      {/* Shopping bag */}
      <path d="M18 6h-2a4 4 0 00-8 0H6a2 2 0 00-2 2l-1 11a2 2 0 002 2h14a2 2 0 002-2L20 8a2 2 0 00-2-2zm-6-2a2 2 0 012 2h-4a2 2 0 012-2zm0 10a4 4 0 110-8 4 4 0 010 8z" />
      <circle cx="12" cy="13" r="1.5" fill="white" opacity="0.9" />
    </svg>
  );
}

function CreativeMarketIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
      {/* Abstract C + star design */}
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 16a6 6 0 110-12 6 6 0 010 12z" />
      <path d="M12 8a4 4 0 00-3.464 6H9a3 3 0 116 0h.464A4 4 0 0012 8z" />
    </svg>
  );
}

function KoFiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="currentColor">
      {/* Mug */}
      <path d="M2 7h15v10a3 3 0 01-3 3H5a3 3 0 01-3-3V7z" />
      {/* Handle */}
      <path d="M17 9h1.5a2.5 2.5 0 010 5H17" />
      {/* Heart on mug */}
      <path d="M7 11.5c0-.8.7-1.5 1.5-1.5.4 0 .8.2 1 .5.2-.3.6-.5 1-.5.8 0 1.5.7 1.5 1.5 0 .5-.2.9-.6 1.2L9.5 15 7.6 12.7c-.4-.3-.6-.7-.6-1.2z" fill="white" opacity="0.9" />
    </svg>
  );
}

/* ─── Platform data ─────────────────────────────────────────────── */

const PLATFORMS = [
  {
    name: "Pinterest",
    tagline: "Discover & save our printables",
    color: "#E60023",
    bg: "#FFF0F1",
    Icon: PinterestIcon,
    href: "#",
  },
  {
    name: "Etsy",
    tagline: "Handmade digital marketplace",
    color: "#F16521",
    bg: "#FFF5EE",
    Icon: EtsyIcon,
    href: "#",
  },
  {
    name: "Gumroad",
    tagline: "Simple digital downloads",
    color: "#FF90E8",
    bg: "#FFF0FC",
    Icon: GumroadIcon,
    href: "#",
  },
  {
    name: "Lemon Squeezy",
    tagline: "Payments for creators",
    color: "#E8A000",
    bg: "#FFFBEA",
    Icon: LemonSqueezyIcon,
    href: "#",
  },
  {
    name: "Payhip",
    tagline: "Sell digital products",
    color: "#4F46E5",
    bg: "#F0EFFF",
    Icon: PayhipIcon,
    href: "#",
  },
  {
    name: "Ko-fi",
    tagline: "Support & shop directly",
    color: "#29ABE0",
    bg: "#EEF9FF",
    Icon: KoFiIcon,
    href: "#",
  },
];

export function PartnersSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 px-4 bg-parchment border-t border-forest/6 overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-sage font-body mb-3">
            Where to Find Us
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-forest mb-3">
            Available on Your Favourite Platforms
          </h2>
          <p className="text-forest/55 font-body text-sm leading-relaxed max-w-md mx-auto">
            Download our printables instantly on any of these trusted digital
            product platforms — no account required on most.
          </p>
        </motion.div>

        {/* Divider line with text */}
        <div className="relative flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-forest/10" />
          <span className="text-[11px] font-semibold tracking-widest uppercase text-forest/30 font-body whitespace-nowrap">
            Trusted Platforms
          </span>
          <div className="flex-1 h-px bg-forest/10" />
        </div>

        {/* Platform grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PLATFORMS.map((p, i) => {
            const Icon = p.Icon;
            return (
              <motion.a
                key={p.name}
                href={p.href}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.06 + i * 0.07, ease: EASE }}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {/* Icon container — grey by default, brand-colored on hover/touch */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(27,67,50,0.06)",
                    color: "rgba(27,67,50,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = p.bg;
                    el.style.color = p.color;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(27,67,50,0.06)";
                    el.style.color = "rgba(27,67,50,0.35)";
                  }}
                  onTouchStart={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = p.bg;
                    el.style.color = p.color;
                  }}
                  onTouchEnd={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(27,67,50,0.06)";
                    el.style.color = "rgba(27,67,50,0.35)";
                  }}
                >
                  <Icon />
                </div>

                {/* Name */}
                <div className="text-center">
                  <p className="font-heading font-semibold text-forest text-xs leading-tight mb-0.5">
                    {p.name}
                  </p>
                  <p className="text-forest/40 font-body text-[10px] leading-tight hidden sm:block">
                    {p.tagline}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
          className="text-center text-xs text-forest/35 font-body mt-10"
        >
          All products are instant digital downloads — available worldwide.
        </motion.p>
      </div>
    </section>
  );
}
