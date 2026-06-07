"use client";

import { useEffect, useState } from "react";
import { Package, Gift, ExternalLink, RefreshCw } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { DBProduct, DBBundle } from "@/lib/db";

export default function DashboardPage() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [bundles,  setBundles]  = useState<DBBundle[]>([]);
  const [loading,  setLoading]  = useState(true);

  async function load() {
    setLoading(true);
    const [pr, br] = await Promise.all([
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/bundles").then((r) => r.json()),
    ]);
    setProducts(pr);
    setBundles(Array.isArray(br) ? br : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const typeCounts = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.type] = (acc[p.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-forest">Dashboard</h1>
            <p className="text-forest/50 text-sm font-body mt-0.5">
              Overview of your Parentapedia store
            </p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 text-sm text-forest/60 hover:text-forest px-3 py-2 rounded-xl hover:bg-white transition-all cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "Total Products", value: products.length, Icon: Package, color: "#1B4332" },
                { label: "Active Bundles", value: bundles.length, Icon: Gift, color: "#2D6A4F" },
                { label: "With Custom Link", value: products.filter(p => p.link && p.link !== "#").length, Icon: ExternalLink, color: "#52B788" },
              ].map(({ label, value, Icon, color }) => (
                <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: color }}>
                      <Icon size={17} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold text-forest/50 font-body uppercase tracking-wide">{label}</span>
                  </div>
                  <p className="font-heading text-2xl font-bold text-forest">{value}</p>
                </div>
              ))}
            </div>

            {/* Products list */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="font-heading font-semibold text-forest text-base">Products</h2>
                <a href="/admin/products" className="text-xs text-forest/60 hover:text-forest cursor-pointer underline underline-offset-2">
                  Manage all
                </a>
              </div>
              {products.length === 0 ? (
                <p className="text-center text-forest/40 py-10 text-sm font-body">No products yet.</p>
              ) : (
                <div className="divide-y divide-gray-50">
                  {products.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex items-center gap-4 px-5 py-3">
                      <div
                        className="w-9 h-9 rounded-lg flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                      >
                        {p.image && (
                          <img src={p.image} alt="" className="w-full h-full object-cover rounded-lg" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-forest truncate font-body">{p.title}</p>
                        <p className="text-xs text-forest/45 font-body">{p.type}</p>
                      </div>
                      <span className="text-sm font-bold text-forest font-heading">{p.price}</span>
                    </div>
                  ))}
                  {products.length > 5 && (
                    <p className="text-center text-xs text-forest/40 py-3 font-body">
                      +{products.length - 5} more
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Product types breakdown */}
            {Object.keys(typeCounts).length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-heading font-semibold text-forest text-base mb-4">By Type</h2>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(typeCounts).map(([type, count]) => (
                    <span key={type} className="px-3 py-1.5 bg-forest/5 text-forest text-xs font-semibold rounded-xl font-body">
                      {type} · {count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminShell>
  );
}
