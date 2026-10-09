import { NextRequest, NextResponse } from "next/server";
import { createAdminSession, isValidAdminPassword } from "@/lib/auth";
import { cleanText } from "@/lib/validation";

export const runtime = "nodejs";

function originAllowed(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowed = (process.env.APP_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
  const hostOrigin = `${request.nextUrl.protocol}//${request.headers.get("host")}`;
  return origin === hostOrigin || allowed.includes(origin);
}

export async function POST(request: NextRequest) {
  if (!originAllowed(request)) return NextResponse.json({ error: "Request origin not allowed." }, { status: 403 });
  try {
    const body = await request.json();
    const password = cleanText(body.password, 500);
    if (!isValidAdminPassword(password)) {
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }
    await createAdminSession();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Admin login is not configured correctly." }, { status: 500 });
  }
}