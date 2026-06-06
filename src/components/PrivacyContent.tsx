"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Mail, FileText, Lock, RefreshCw, Globe } from "lucide-react";

const LAST_UPDATED = "June 6, 2025";
const CONTACT_EMAIL = "hello@parentapedia.com";
const SITE_NAME = "Parentapedia";
const SITE_URL = "https://parentapedia.com";

const sections = [
  {
    id: "information-we-collect",
    Icon: FileText,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information You Provide",
        body: `When you make a purchase through our third-party store partners (such as Etsy, Gumroad, or Payhip), those platforms collect your name, email address, billing information, and shipping details (if applicable). ${SITE_NAME} does not directly collect or store payment information — all transactions are handled securely by our store partners under their own privacy policies.`,
      },
      {
        subtitle: "Information Collected Automatically",
        body: "When you visit our website, we may automatically collect certain technical information, including your IP address, browser type and version, operating system, the pages you visit on our site, the time and date of your visit, and referring URLs. This information helps us understand how visitors use our website so we can improve it.",
      },
      {
        subtitle: "Cookies & Similar Technologies",
        body: "Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyse site traffic, and understand user preferences. You can control cookie settings through your browser. Disabling cookies may affect certain features of the site.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    Icon: ShieldCheck,
    title: "How We Use Your Information",
    content: [
      {
        subtitle: null,
        body: "We use the information we collect to:",
      },
    ],
    list: [
      "Deliver digital products and send download links after purchase",
      "Respond to customer support enquiries and questions",
      "Send order confirmations and important account notifications",
      "Improve our website, products, and overall user experience",
      "Analyse usage patterns to understand what content is most helpful",
      "Comply with legal obligations and resolve disputes",
      "Send occasional updates about new products or offers (only with your consent, and you may unsubscribe at any time)",
    ],
  },
  {
    id: "sharing-information",
    Icon: Globe,
    title: "Sharing Your Information",
    content: [
      {
        subtitle: null,
        body: `${SITE_NAME} does not sell, trade, or rent your personal information to third parties. We may share information only in the following limited circumstances:`,
      },
    ],
    list: [
      "With store platforms (Etsy, Gumroad, Payhip) to facilitate your purchase and product delivery",
      "With service providers who help us operate our website (e.g. analytics tools, email services), bound by confidentiality agreements",
      "When required by law, court order, or governmental authority",
      "To protect the rights, property, or safety of Parentapedia, our customers, or others",
    ],
  },
  {
    id: "digital-products",
    Icon: FileText,
    title: "Digital Products & Downloads",
    content: [
      {
        subtitle: "Delivery",
        body: "All Parentapedia products are digital files (PDF/printable). After purchase, download links are delivered to your email address by our store partner. We recommend saving your files immediately after purchase.",
      },
      {
        subtitle: "No Account Required",
        body: "Parentapedia does not require you to create an account on our website. Purchases are managed entirely through our third-party store platforms, each of which has its own account and data policies.",
      },
      {
        subtitle: "Personal Use Licence",
        body: "All digital products are for personal, non-commercial use only. You may print products for your own home or family. Redistribution, resale, or sharing of digital files is not permitted.",
      },
    ],
  },
  {
    id: "data-security",
    Icon: Lock,
    title: "Data Security",
    content: [
      {
        subtitle: null,
        body: `We take reasonable precautions to protect your information from unauthorised access, use, or disclosure. Our website uses HTTPS encryption to secure data transmitted between your browser and our servers. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security. If you believe your information has been compromised, please contact us immediately at ${CONTACT_EMAIL}.`,
      },
    ],
  },
  {
    id: "third-party-links",
    Icon: Globe,
    title: "Third-Party Links & Platforms",
    content: [
      {
        subtitle: null,
        body: "Our website contains links to third-party platforms including our store pages (Etsy, Gumroad, Payhip) and social media accounts (Pinterest). These third-party sites have their own privacy policies, which we encourage you to review. We are not responsible for the privacy practices or content of those sites.",
      },
      {
        subtitle: "Pinterest",
        body: "Our products are promoted through Pinterest. If you interact with our content on Pinterest, their privacy policy applies to data they collect. Visit Pinterest's Privacy Policy for more information.",
      },
    ],
  },
  {
    id: "your-rights",
    Icon: ShieldCheck,
    title: "Your Rights",
    content: [
      {
        subtitle: null,
        body: "Depending on your location, you may have certain rights regarding your personal data, including:",
      },
    ],
    list: [
      "The right to access the personal information we hold about you",
      "The right to request correction of inaccurate or incomplete information",
      "The right to request deletion of your personal data, subject to legal obligations",
      "The right to object to or restrict certain types of data processing",
      "The right to withdraw consent for marketing communications at any time",
      "The right to data portability (where technically feasible)",
    ],
    contentAfter: `To exercise any of these rights, please contact us at ${CONTACT_EMAIL}. We will respond to your request within 30 days.`,
  },
  {
    id: "childrens-privacy",
    Icon: ShieldCheck,
    title: "Children's Privacy",
    content: [
      {
        subtitle: null,
        body: `${SITE_NAME} is intended for adult parents and caregivers. Our website is not directed to children under 13 years of age, and we do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided personal information to us, please contact us at ${CONTACT_EMAIL} and we will take steps to delete that information.`,
      },
    ],
  },
  {
    id: "changes",
    Icon: RefreshCw,
    title: "Changes to This Policy",
    content: [
      {
        subtitle: null,
        body: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically. Your continued use of our website after any changes constitutes your acceptance of the updated policy.`,
      },
    ],
  },
  {
    id: "contact",
    Icon: Mail,
    title: "Contact Us",
    content: [
      {
        subtitle: null,
        body: "If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle your personal information, please don't hesitate to get in touch:",
      },
    ],
    contact: {
      email: CONTACT_EMAIL,
      name: SITE_NAME,
      website: SITE_URL,
    },
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export function PrivacyContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero banner */}
      <div
        className="relative pt-32 pb-16 px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0F2B1F 0%, #1B4332 40%, #2D6A4F 80%, #74C69D 100%)",
        }}
      >
        {/* Blob decorations */}
        <div
          className="absolute top-[-60px] left-[-60px] w-72 h-72 rounded-full opacity-20 animate-blob pointer-events-none"
          style={{ background: "radial-gradient(circle, #52B788, transparent)" }}
        />
        <div
          className="absolute bottom-[-40px] right-[-40px] w-56 h-56 rounded-full opacity-15 animate-blob animation-delay-2000 pointer-events-none"
          style={{ background: "radial-gradient(circle, #D8F3DC, transparent)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl glass border border-white/30 mb-6">
            <ShieldCheck size={26} className="text-white" />
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/70 font-body text-base leading-relaxed max-w-md mx-auto">
            We care about your privacy and are committed to being transparent
            about how we handle your information.
          </p>
          <p className="mt-5 text-xs text-white/45 font-body">
            Last updated: {LAST_UPDATED}
          </p>
        </motion.div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #FFFBF0)" }}
        />
      </div>

      {/* Quick-nav + content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Table of contents */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-sage font-body mb-4">
            Contents
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-2 text-sm text-forest/70 hover:text-forest transition-colors cursor-pointer py-1 font-body"
              >
                <span className="w-5 h-5 rounded-full bg-mint-pale flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-forest">
                  {i + 1}
                </span>
                {s.title}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => {
            const Icon = section.Icon;
            return (
              <motion.section
                key={section.id}
                id={section.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                className="glass-card rounded-3xl p-7 md:p-9 scroll-mt-24"
              >
                {/* Section header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-forest flex items-center justify-center mt-0.5">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-sage font-body">
                      Section {i + 1}
                    </span>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-forest mt-0.5">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Body paragraphs */}
                <div className="space-y-5 pl-0 md:pl-14">
                  {section.content.map((block, j) => (
                    <div key={j}>
                      {block.subtitle && (
                        <h3 className="font-heading font-semibold text-forest text-base mb-2">
                          {block.subtitle}
                        </h3>
                      )}
                      <p className="text-sm text-forest/70 font-body leading-relaxed">
                        {block.body}
                      </p>
                    </div>
                  ))}

                  {/* Bullet list */}
                  {section.list && (
                    <ul className="space-y-2 mt-2">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm text-forest/70 font-body"
                        >
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* After-list paragraph */}
                  {section.contentAfter && (
                    <p className="text-sm text-forest/70 font-body leading-relaxed mt-4">
                      {section.contentAfter}
                    </p>
                  )}

                  {/* Contact block */}
                  {section.contact && (
                    <div className="mt-4 glass-mint rounded-2xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-sm font-body text-forest">
                        <span className="font-semibold">Website:</span>
                        <a
                          href={section.contact.website}
                          className="text-forest-mid hover:underline cursor-pointer"
                        >
                          {section.contact.website}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-body text-forest">
                        <span className="font-semibold">Email:</span>
                        <a
                          href={`mailto:${section.contact.email}`}
                          className="text-forest-mid hover:underline cursor-pointer"
                        >
                          {section.contact.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-body text-forest">
                        <span className="font-semibold">Business:</span>
                        <span>{section.contact.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="glass-mint rounded-2xl px-6 py-5 inline-block max-w-lg mx-auto">
            <p className="text-sm text-forest/70 font-body leading-relaxed">
              By using the Parentapedia website, you agree to this Privacy
              Policy. If you do not agree, please discontinue use of the site.
              For questions, email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-forest font-semibold hover:underline cursor-pointer"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
