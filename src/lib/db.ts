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
  id: string;
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
  bundles: DBBundle[];
}

const DEFAULT_DB: DB = {
  products: [],
  bundles: [],
};

export function readDB(): DB {
  try {
    if (!fs.existsSync(DB_PATH)) return DEFAULT_DB;
    const raw = JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as DB & { bundle?: DBBundle };
    // Migrate old single-bundle format to array
    if (raw.bundle && !raw.bundles) {
      raw.bundles = [{ ...raw.bundle, id: raw.bundle.id ?? "1" }];
      delete raw.bundle;
      fs.writeFileSync(DB_PATH, JSON.stringify(raw, null, 2));
    }
    if (!raw.bundles) raw.bundles = [];
    return raw as DB;
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
