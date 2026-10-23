"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn, Loader2, Sun } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-night min-h-[100svh] flex items-center justify-center px-6">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 20%, rgba(245,158,11,0.14), transparent 55%)",
        }}
      />
      <div className="relative w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sun-300 to-sun-600 shadow-[0_0_24px_rgba(245,158,11,0.5)]">
            <Sun className="h-6 w-6 text-night" />
          </span>
        </div>
        <div className="glass rounded-3xl p-8">
          <div className="text-center mb-6">
            <h1 className="font-display text-xl font-bold text-warm">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-warm/50">
              Vini Corporate — Leads Dashboard
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className="block text-xs font-medium text-warm/60 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-warm/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm text-warm placeholder:text-warm/30 focus:border-sun-400 focus:outline-none focus:ring-1 focus:ring-sun-400"
                  placeholder="••••••••"
                />
              </div>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sun-400 to-sun-600 px-6 py-3 font-semibold text-night shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
