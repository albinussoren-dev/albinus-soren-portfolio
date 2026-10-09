import { NextRequest, NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expected = `${request.nextUrl.protocol}//${request.headers.get("host")}`;
  if (origin && origin !== expected && !(process.env.APP_ORIGIN || "").split(",").map(s => s.trim()).includes(origin)) {
    return NextResponse.json({ error: "Request origin not allowed." }, { status: 403 });
  }
  await destroyAdminSession();
  return NextResponse.json({ ok: true });
}