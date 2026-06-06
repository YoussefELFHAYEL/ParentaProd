import { Mail, Heart } from "lucide-react";
import { Logo } from "./Logo";

const quickLinks = [
  { label: "Home",     href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Bundles",  href: "#bundles" },
  { label: "About",    href: "#about" },
  { label: "FAQ",      href: "#faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use",   href: "#" },
  { label: "Refund Policy",  href: "#" },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0F2B1F 0%, #1B4332 60%, #2D6A4F 100%)" }}
    >
      {/* Decorative blob */}
      <div
        className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #52B788, transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size={38} textColor="white" />
            <p className="text-white/60 text-sm font-body leading-relaxed mt-4 max-w-xs">
              Calm, practical, and beautifully designed digital tools for parents
              who want more peace, structure, and confidence at home.
            </p>
            {/* Pinterest */}
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E60023]">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </span>
              Follow on Pinterest
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm font-body transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Contact</h4>
            <a
              href="mailto:hello@parentapedia.com"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-body transition-colors cursor-pointer"
            >
              <Mail size={14} />
              hello@parentapedia.com
            </a>
            <p className="text-white/40 text-xs font-body mt-4 leading-relaxed">
              Questions about your order? We&apos;re here to help within 24 hours.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Legal */}
          <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-start">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-white/40 hover:text-white/70 font-body transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/40 font-body flex items-center gap-1">
            © {new Date().getFullYear()} Parentapedia. Made with{" "}
            <Heart size={11} className="text-sage-light fill-current" /> for parents.
          </p>
        </div>
      </div>
    </footer>
  );
}
