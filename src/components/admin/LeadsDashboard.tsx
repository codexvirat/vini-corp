"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sun,
  LogOut,
  Search,
  Download,
  Users,
  Zap,
  Mail,
  CalendarDays,
  Phone,
  MessageCircle,
  X,
} from "lucide-react";
import type { Lead, LeadType } from "@/lib/leads-store";

function isThisWeek(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return d >= weekAgo && d <= now;
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

function toCsv(leads: Lead[]) {
  const headers = [
    "Type",
    "Name",
    "Phone",
    "Email",
    "KW",
    "Address",
    "Subject",
    "Message",
    "Date",
  ];
  const rows = leads.map((l) => [
    l.type,
    l.name,
    l.phone ?? "",
    l.email ?? "",
    l.kw ?? "",
    l.address ?? "",
    l.subject ?? "",
    l.message ?? "",
    l.createdAt,
  ]);
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [headers, ...rows]
    .map((row) => row.map((cell) => escape(String(cell))).join(","))
    .join("\n");
}

export default function LeadsDashboard({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | LeadType>("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const stats = useMemo(
    () => ({
      total: leads.length,
      quote: leads.filter((l) => l.type === "quote").length,
      contact: leads.filter((l) => l.type === "contact").length,
      thisWeek: leads.filter((l) => isThisWeek(l.createdAt)).length,
    }),
    [leads]
  );

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (typeFilter !== "all" && l.type !== typeFilter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.phone?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.address?.toLowerCase().includes(q) ||
        l.subject?.toLowerCase().includes(q) ||
        l.message?.toLowerCase().includes(q)
      );
    });
  }, [leads, query, typeFilter]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleExport = () => {
    const csv = toCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vini-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[100svh] bg-night">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-night/90 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sun-300 to-sun-600">
              <Sun className="h-5 w-5 text-night" />
            </span>
            <div>
              <p className="font-display font-bold text-warm leading-none">
                Vini Corporate
              </p>
              <p className="text-[11px] text-warm/45 mt-0.5">Leads Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-warm/80 hover:text-warm disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Total Leads" value={stats.total} />
          <StatCard icon={Zap} label="Quote Requests" value={stats.quote} accent="sun" />
          <StatCard icon={Mail} label="Contact Messages" value={stats.contact} accent="eco" />
          <StatCard icon={CalendarDays} label="This Week" value={stats.thisWeek} accent="eco" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-warm/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, phone, email, message..."
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-warm placeholder:text-warm/30 focus:border-sun-400 focus:outline-none focus:ring-1 focus:ring-sun-400"
            />
          </div>
          <div className="flex items-center gap-2">
            {(["all", "quote", "contact"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition-colors ${
                  typeFilter === t
                    ? "bg-gradient-to-r from-sun-400 to-sun-600 text-night"
                    : "glass text-warm/70 hover:text-warm"
                }`}
              >
                {t}
              </button>
            ))}
            <button
              onClick={handleExport}
              disabled={filtered.length === 0}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold text-warm/80 hover:text-warm disabled:opacity-40"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="rounded-2xl glass overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-warm/40 text-sm">
              {leads.length === 0
                ? "No leads yet. Submissions from the Quote and Contact forms will appear here."
                : "No leads match your search."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-warm/40 text-xs uppercase tracking-wide">
                    <th className="px-5 py-3 font-medium">Type</th>
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Contact</th>
                    <th className="px-5 py-3 font-medium">Details</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelected(lead)}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
                            lead.type === "quote"
                              ? "bg-sun-500/15 text-sun-400"
                              : "bg-eco-500/15 text-eco-400"
                          }`}
                        >
                          {lead.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-medium text-warm">{lead.name}</td>
                      <td className="px-5 py-3.5 text-warm/60">
                        <div className="flex flex-col gap-0.5">
                          {lead.phone && <span>{lead.phone}</span>}
                          {lead.email && <span className="text-warm/40">{lead.email}</span>}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-warm/60 max-w-xs truncate">
                        {lead.type === "quote"
                          ? [lead.kw, lead.address].filter(Boolean).join(" • ")
                          : lead.subject || lead.message?.slice(0, 40)}
                      </td>
                      <td className="px-5 py-3.5 text-warm/40 whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {selected && <LeadModal lead={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent = "sun",
}: {
  icon: typeof Users;
  label: string;
  value: number;
  accent?: "sun" | "eco";
}) {
  return (
    <div className="glass rounded-2xl px-5 py-5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          accent === "sun" ? "bg-sun-500/15 text-sun-400" : "bg-eco-500/15 text-eco-400"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <p className="font-display mt-3 text-2xl font-bold text-warm tabular-nums">{value}</p>
      <p className="text-xs text-warm/50 mt-0.5">{label}</p>
    </div>
  );
}

function LeadModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl glass p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-warm/60 hover:text-warm"
        >
          <X className="h-4 w-4" />
        </button>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
            lead.type === "quote"
              ? "bg-sun-500/15 text-sun-400"
              : "bg-eco-500/15 text-eco-400"
          }`}
        >
          {lead.type}
        </span>
        <h3 className="font-display mt-3 text-xl font-bold text-warm">{lead.name}</h3>
        <p className="text-xs text-warm/40 mt-1">{formatDate(lead.createdAt)}</p>

        <div className="mt-5 space-y-3 text-sm">
          {lead.phone && (
            <div className="flex items-center gap-2.5 text-warm/75">
              <Phone className="h-4 w-4 text-sun-400 shrink-0" />
              <a href={`tel:${lead.phone}`} className="hover:text-sun-400">
                {lead.phone}
              </a>
              <a
                href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-eco-400 hover:underline flex items-center gap-1 text-xs"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
            </div>
          )}
          {lead.email && (
            <div className="flex items-center gap-2.5 text-warm/75">
              <Mail className="h-4 w-4 text-sun-400 shrink-0" />
              <a href={`mailto:${lead.email}`} className="hover:text-sun-400 truncate">
                {lead.email}
              </a>
            </div>
          )}
          {lead.kw && (
            <div className="rounded-xl bg-white/5 px-4 py-3">
              <p className="text-[11px] text-warm/40 uppercase tracking-wide">
                System Capacity
              </p>
              <p className="text-warm/85 mt-0.5">{lead.kw}</p>
            </div>
          )}
          {lead.address && (
            <div className="rounded-xl bg-white/5 px-4 py-3">
              <p className="text-[11px] text-warm/40 uppercase tracking-wide">Address</p>
              <p className="text-warm/85 mt-0.5">{lead.address}</p>
            </div>
          )}
          {lead.subject && (
            <div className="rounded-xl bg-white/5 px-4 py-3">
              <p className="text-[11px] text-warm/40 uppercase tracking-wide">Subject</p>
              <p className="text-warm/85 mt-0.5">{lead.subject}</p>
            </div>
          )}
          {lead.message && (
            <div className="rounded-xl bg-white/5 px-4 py-3">
              <p className="text-[11px] text-warm/40 uppercase tracking-wide">Message</p>
              <p className="text-warm/85 mt-0.5 leading-relaxed">{lead.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
