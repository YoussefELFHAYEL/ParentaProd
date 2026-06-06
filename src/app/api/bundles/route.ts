import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { readDB, writeDB } from "@/lib/db";

function auth(req: NextRequest) {
  return verifyToken(req.cookies.get(COOKIE_NAME)?.value);
}

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.bundle);
}

export async function PUT(req: NextRequest) {
  if (!(await auth(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = readDB();
  db.bundle = { ...db.bundle, ...body };
  writeDB(db);
  return NextResponse.json(db.bundle);
}
