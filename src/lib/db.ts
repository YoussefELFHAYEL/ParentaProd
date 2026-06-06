import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export interface DBProduct {
  id: string;
  title: string;
  type: string;
  description: string;
  price: string;
  link: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
  iconBg: string;
}

export interface DBBundle {
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  savings: string;
  link: string;
  image: string;
  includes: string[];
}

export interface DB {
  products: DBProduct[];
  bundle: DBBundle;
}

const DEFAULT_DB: DB = {
  products: [],
  bundle: {
    title: "The Calm Home Parenting Bundle",
    description: "A complete digital toolkit for everyday family life.",
    price: "$35",
    originalPrice: "$65",
    savings: "Save $30",
    link: "#",
    image: "",
    includes: [],
  },
};

export function readDB(): DB {
  try {
    if (!fs.existsSync(DB_PATH)) return DEFAULT_DB;
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as DB;
  } catch {
    return DEFAULT_DB;
  }
}

export function writeDB(data: DB): void {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}
