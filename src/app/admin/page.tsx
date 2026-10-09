import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default function AdminPage() {
  return <main className="admin-page"><AdminDashboard /></main>;
}