export type ProductType =
  | "Printable"
  | "PDF Guide"
  | "Planner"
  | "Checklist"
  | "Flashcards";

export interface Product {
  id: number;
  title: string;
  type: ProductType;
  description: string;
  price: string;
  link: string;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
}

export const PRODUCT_TYPES: ProductType[] = [
  "Printable",
  "PDF Guide",
  "Planner",
  "Checklist",
  "Flashcards",
];

export const TYPE_COLORS: Record<ProductType, string> = {
  Printable:   "bg-forest/10 text-forest",
  "PDF Guide": "bg-sage/20 text-forest-mid",
  Planner:     "bg-mint-pale text-forest",
  Checklist:   "bg-beige text-forest-dark",
  Flashcards:  "bg-sage-light/20 text-forest-mid",
};

export const products: Product[] = [
  {
    id: 1,
    title: "Calm Bedtime Routine Printable",
    type: "Printable",
    description:
      "A gentle bedtime routine chart to help children wind down with less stress and more peace.",
    price: "$7",
    link: "#",
    gradientFrom: "#1B4332",
    gradientTo: "#2D6A4F",
    iconBg: "#1B4332",
  },
  {
    id: 2,
    title: "Toddler Tantrum Survival Guide",
    type: "PDF Guide",
    description:
      "A simple guide for handling tantrums with calm, confidence, and genuine connection.",
    price: "$12",
    link: "#",
    gradientFrom: "#2D6A4F",
    gradientTo: "#52B788",
    iconBg: "#2D6A4F",
  },
  {
    id: 3,
    title: "Positive Discipline Checklist",
    type: "Checklist",
    description:
      "A daily reference checklist to keep gentle discipline strategies top of mind.",
    price: "$5",
    link: "#",
    gradientFrom: "#74C69D",
    gradientTo: "#D8F3DC",
    iconBg: "#52B788",
  },
  {
    id: 4,
    title: "Family Meal Planner",
    type: "Planner",
    description:
      "A beautiful weekly meal planning template that makes family meals feel effortless.",
    price: "$9",
    link: "#",
    gradientFrom: "#C6A96B",
    gradientTo: "#EDE0C4",
    iconBg: "#A67C52",
  },
  {
    id: 5,
    title: "Morning Routine Chart",
    type: "Printable",
    description:
      "Help kids get ready independently each morning with a clear, visual routine chart.",
    price: "$7",
    link: "#",
    gradientFrom: "#0F2B1F",
    gradientTo: "#1B4332",
    iconBg: "#0F2B1F",
  },
  {
    id: 6,
    title: "Screen Time Rules Printable",
    type: "Printable",
    description:
      "Clear, printable screen time boundaries your whole family can understand and agree on.",
    price: "$6",
    link: "#",
    gradientFrom: "#40916C",
    gradientTo: "#52B788",
    iconBg: "#40916C",
  },
  {
    id: 7,
    title: "Emotional Regulation Flashcards",
    type: "Flashcards",
    description:
      "Beautiful printable flashcards to help children identify, name, and manage their emotions.",
    price: "$11",
    link: "#",
    gradientFrom: "#52B788",
    gradientTo: "#95D5B2",
    iconBg: "#52B788",
  },
  {
    id: 8,
    title: "Parenting Affirmation Cards",
    type: "Printable",
    description:
      "Daily affirmation cards to remind every parent of their strength, patience, and love.",
    price: "$8",
    link: "#",
    gradientFrom: "#8B6914",
    gradientTo: "#C6A96B",
    iconBg: "#8B6914",
  },
];

export const featuredBundle = {
  title: "The Calm Home Parenting Bundle",
  description:
    "A complete digital toolkit with routines, checklists, behavior charts, and gentle parenting guides for everyday family life.",
  price: "$35",
  originalPrice: "$65",
  savings: "Save $30",
  link: "#",
  includes: [
    "Calm Bedtime Routine Printable",
    "Morning Routine Chart",
    "Positive Discipline Checklist",
    "Toddler Tantrum Survival Guide",
    "Family Meal Planner",
    "Screen Time Rules Printable",
    "Emotional Regulation Flashcards",
    "Parenting Affirmation Cards",
  ],
};

export const faqItems = [
  {
    q: "Are the products digital?",
    a: "Yes — all Parentapedia products are 100% digital. You'll receive PDF or printable files you can download instantly after purchase. No physical items are shipped.",
  },
  {
    q: "Do I need an account to purchase?",
    a: "No account is required. Products link directly to our store (Etsy/Gumroad/Payhip) where you can check out as a guest.",
  },
  {
    q: "How do I receive my files?",
    a: "You'll receive a download link immediately after payment confirmation. Files are also emailed to you so you can access them anytime.",
  },
  {
    q: "Can I print them at home?",
    a: "Absolutely! All products are optimized for home printing on standard letter or A4 paper. You can also use a local print shop for higher quality results.",
  },
  {
    q: "Are these products editable?",
    a: "Most products are ready-to-print PDFs. Some planners and trackers include editable fields. Product descriptions specify if editing is available.",
  },
  {
    q: "Do you offer bundles?",
    a: "Yes! The Calm Home Parenting Bundle includes all 8 resources at a significant discount. It's the best value for families who want the complete toolkit.",
  },
];
