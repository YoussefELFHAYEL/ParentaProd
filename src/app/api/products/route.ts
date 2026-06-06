import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { readDB, writeDB, generateId } from "@/lib/db";

function auth(req: NextRequest) {
  return verifyToken(req.cookies.get(COOKIE_NAME)?.value);
}

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.products);
}

export async function POST(req: NextRequest) {
  if (!(await auth(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = readDB();
  const product = {
    id: generateId(),
    title: body.title ?? "",
    type: body.type ?? "Printable",
    description: body.description ?? "",
    price: body.price ?? "$0",
    link: body.link ?? "#",
    image: body.image ?? "",
    gradientFrom: body.gradientFrom ?? "#1B4332",
    gradientTo: body.gradientTo ?? "#2D6A4F",
    iconBg: body.iconBg ?? "#1B4332",
  };
  db.products.push(product);
  writeDB(db);
  return NextResponse.json(product, { status: 201 });
}
