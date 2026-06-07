export const dynamic = "force-dynamic";

import { readDB } from "@/lib/db";
import { Navbar }           from "@/components/Navbar";
import { Hero }             from "@/components/Hero";
import { ProductGrid }      from "@/components/ProductGrid";
import { FeaturedBundle }   from "@/components/FeaturedBundle";
import { PinterestSection } from "@/components/PinterestSection";
import { BenefitsSection }  from "@/components/BenefitsSection";
import { AboutSection }     from "@/components/AboutSection";
import { FAQSection }       from "@/components/FAQSection";
import { PartnersSection }  from "@/components/PartnersSection";
import { Footer }           from "@/components/Footer";

export default function Home() {
  const db = readDB();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductGrid products={db.products} />
        <FeaturedBundle bundles={db.bundles} />
        <PinterestSection />
        <BenefitsSection />
        <AboutSection />
        <FAQSection />
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}
