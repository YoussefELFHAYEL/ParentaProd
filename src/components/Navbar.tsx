"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Bundles",  href: "#bundles" },
  { label: "About",    href: "#about" },
  { label: "FAQ",      href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }}
        className={`mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? "glass-strong shadow-xl shadow-forest/10"
            : "glass"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <a href="#home" onClick={closeMenu}>
            <Logo size={34} textColor="#1B4332" />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-body font-medium text-forest/80 hover:text-forest hover:bg-forest/5 rounded-xl transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#products"
              className="hidden md:flex items-center gap-2 bg-forest text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-forest-mid transition-[transform,background-color,box-shadow] duration-200 shadow-md shadow-forest/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] cursor-pointer"
            >
              <ShoppingBag size={15} />
              Shop Products
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-forest/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={22} className="text-forest" />
              ) : (
                <Menu size={22} className="text-forest" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] as const }}
              className="overflow-hidden border-t border-white/60"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="px-4 py-3 text-sm font-medium text-forest hover:bg-forest/5 rounded-xl transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#products"
                  onClick={closeMenu}
                  className="mt-2 flex items-center justify-center gap-2 bg-forest text-white text-sm font-medium px-5 py-3 rounded-xl cursor-pointer"
                >
                  <ShoppingBag size={15} />
                  Shop Products
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
