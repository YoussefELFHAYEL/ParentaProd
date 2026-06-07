import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { readDB, writeDB } from "@/lib/db";

function auth(req: NextRequest) {
  return verifyToken(req.cookies.get(COOKIE_NAME)?.value);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = readDB();
  const bundle = db.bundles.find((b) => b.id === id);
  if (!bundle) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(bundle);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await auth(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const db = readDB();
  const idx = db.bundles.findIndex((b) => b.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  db.bundles[idx] = { ...db.bundles[idx], ...body, id };
  writeDB(db);
  return NextResponse.json(db.bundles[idx]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await auth(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const db = readDB();
  db.bundles = db.bundles.filter((b) => b.id !== id);
  writeDB(db);
  return NextResponse.json({ ok: true });
}
