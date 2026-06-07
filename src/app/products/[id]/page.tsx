export const dynamic = "force-dynamic";

import { readDB } from "@/lib/db";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductDetailClient } from "./ProductDetailClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = readDB();
  const product = db.products.find((p) => p.id === id);
  if (!product) notFound();

  const related = db.products.filter((p) => p.id !== id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-[100dvh] bg-cream pt-28 pb-20">
        <ProductDetailClient product={product} related={related} />
      </main>
      <Footer />
    </>
  );
}
