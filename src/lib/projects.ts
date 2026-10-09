import "server-only";
import { getSupabase } from "@/lib/supabase";

export type PortfolioProject = {
  id: string;
  title: string;
  slug: string;
  category: "web" | "ai" | "creative";
  summary: string;
  technologies: string[];
  live_url: string | null;
  repo_url: string | null;
  status: "Live" | "In development" | "Concept" | "Experiment";
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export async function getPublicProjects(): Promise<PortfolioProject[]> {
  try {
    const { data, error } = await getSupabase()
      .from("portfolio_projects")
      .select("id,title,slug,category,summary,technologies,live_url,repo_url,status,featured,published,sort_order,created_at")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Project query failed:", error.message);
      return [];
    }
    return (data ?? []) as PortfolioProject[];
  } catch (error) {
    console.error("Supabase not configured or unreachable:", error instanceof Error ? error.message : "unknown error");
    return [];
  }
}