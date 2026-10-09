import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSupabase } from "@/lib/supabase";
import { cleanText } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { data, error } = await getSupabase().from("portfolio_messages").select("*").order("created_at", { ascending: false }).limit(200);
  if (error) return NextResponse.json({ error: "Could not load messages." }, { status: 503 });
  return NextResponse.json({ messages: data ?? [] });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const body = await request.json();
    const id = cleanText(body.id, 60);
    if (!/^[0-9a-f-]{36}$/i.test(id) || typeof body.is_read !== "boolean") return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const { error } = await getSupabase().from("portfolio_messages").update({ is_read: body.is_read }).eq("id", id);
    if (error) return NextResponse.json({ error: "Could not update message." }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const { id } = await request.json();
    if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    const { error } = await getSupabase().from("portfolio_messages").delete().eq("id", id);
    if (error) return NextResponse.json({ error: "Could not delete message." }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}