import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSupabase } from "@/lib/supabase";
import { cleanText, isValidSlug, safeHttpUrl } from "@/lib/validation";

export const runtime = "nodejs";

const categories = ["web", "ai", "creative"];
const statuses = ["Live", "In development", "Concept", "Experiment"];

function parseProject(body: Record<string, unknown>) {
  const title = cleanText(body.title, 100);
  const slug = cleanText(body.slug, 100).toLowerCase();
  const category = cleanText(body.category, 20);
  const summary = cleanText(body.summary, 600);
  const status = cleanText(body.status, 30);
  const technologies = Array.isArray(body.technologies)
    ? body.technologies.filter((v): v is string => typeof v === "string").map(v => v.trim().slice(0, 40)).filter(Boolean).slice(0, 12)
    : cleanText(body.technologies, 400).split(",").map(v => v.trim()).filter(Boolean).slice(0, 12);
  if (title.length < 2 || !isValidSlug(slug) || !categories.includes(category) || summary.length < 5 || !statuses.includes(status)) {
    throw new Error("Please complete all required fields. Slug must use lowercase letters, numbers, and hyphens.");
  }
  const liveRaw = cleanText(body.live_url, 500);
  const repoRaw = cleanText(body.repo_url, 500);
  if (liveRaw && !safeHttpUrl(liveRaw)) throw new Error("Live URL must be a valid http(s) URL.");
  if (repoRaw && !safeHttpUrl(repoRaw)) throw new Error("Repository URL must be a valid http(s) URL.");
  return {
    title, slug, category, summary, technologies,
    status,
    live_url: safeHttpUrl(liveRaw),
    repo_url: safeHttpUrl(repoRaw),
    featured: body.featured === true,
    published: body.published === true,
    sort_order: Number.isFinite(Number(body.sort_order)) ? Math.max(0, Math.min(10000, Number(body.sort_order))) : 0,
    updated_at: new Date().toISOString()
  };
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const { data, error } = await getSupabase().from("portfolio_projects").select("*").order("sort_order").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ projects: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Could not load projects." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const project = parseProject(await request.json());
    const { data, error } = await getSupabase().from("portfolio_projects").insert(project).select("*").single();
    if (error) {
      const message = error.code === "23505" ? "That slug is already in use." : "Could not create project.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    return NextResponse.json({ project: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid project." }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const body = await request.json();
    const id = cleanText(body.id, 60);
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
    const project = parseProject(body);
    const { data, error } = await getSupabase().from("portfolio_projects").update(project).eq("id", id).select("*").single();
    if (error) return NextResponse.json({ error: error.code === "23505" ? "That slug is already in use." : "Could not update project." }, { status: 400 });
    return NextResponse.json({ project: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid project." }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const { id } = await request.json();
    if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
    const { error } = await getSupabase().from("portfolio_projects").delete().eq("id", id);
    if (error) return NextResponse.json({ error: "Could not delete project." }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}