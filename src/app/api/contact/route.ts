import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { cleanText, isValidEmail } from "@/lib/validation";

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
    // Quietly accept honeypot submissions without saving them.
    if (cleanText(body.website, 200)) return NextResponse.json({ ok: true });
    const name = cleanText(body.name, 100);
    const email = cleanText(body.email, 254).toLowerCase();
    const topic = cleanText(body.topic, 120) || "Something else";
    const message = cleanText(body.message, 5000);
    if (name.length < 1 || !isValidEmail(email) || message.length < 3) {
      return NextResponse.json({ error: "Please enter a valid name, email, and message." }, { status: 400 });
    }
    const { error } = await getSupabase().from("portfolio_messages").insert({ name, email, topic, message });
    if (error) {
      console.error("Contact insert failed:", error.message);
      return NextResponse.json({ error: "Message could not be saved right now. Please email me directly." }, { status: 503 });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Contact endpoint failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Message could not be saved right now. Please try again later." }, { status: 503 });
  }
}