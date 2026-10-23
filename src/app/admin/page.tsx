import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { getLeads } from "@/lib/leads-store";
import LeadsDashboard from "@/components/admin/LeadsDashboard";

export const metadata: Metadata = {
  title: "Leads Dashboard | Vini Corporate",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!verifySessionToken(session)) {
    redirect("/admin/login");
  }

  const leads = await getLeads();

  return <LeadsDashboard leads={leads} />;
}
