import type { Metadata } from "next";
import { Lora, Raleway } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parentapedia — Digital Parenting Tools for Calm, Organized Families",
  description:
    "Beautiful printable guides, planners, checklists, and parenting resources designed to make everyday family life easier.",
  keywords: [
    "parenting printables",
    "parenting planner",
    "routine chart",
    "family tools",
    "digital download",
    "gentle parenting",
  ],
  openGraph: {
    title: "Parentapedia",
    description: "Digital Parenting Tools for Calm, Organized Families",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lora.variable} ${raleway.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
