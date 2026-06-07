import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { readDB, writeDB, generateId } from "@/lib/db";

function auth(req: NextRequest) {
  return verifyToken(req.cookies.get(COOKIE_NAME)?.value);
}

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.bundles);
}

export async function POST(req: NextRequest) {
  if (!(await auth(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = readDB();
  const newBundle = {
    id: generateId(),
    title:         body.title         ?? "New Bundle",
    description:   body.description   ?? "",
    price:         body.price         ?? "$0",
    originalPrice: body.originalPrice ?? "$0",
    savings:       body.savings       ?? "",
    link:          body.link          ?? "#",
    image:         body.image         ?? "",
    includes:      body.includes      ?? [],
  };
  db.bundles.push(newBundle);
  writeDB(db);
  return NextResponse.json(newBundle, { status: 201 });
}
