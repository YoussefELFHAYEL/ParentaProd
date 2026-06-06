"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, Plus, X, Save } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { DBBundle } from "@/lib/db";

export default function AdminBundlesPage() {
  const [bundle,       setBundle]       = useState<DBBundle | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [newItem,      setNewItem]      = useState("");
  const [saved,        setSaved]        = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/bundles").then(r => r.json()).then(data => { setBundle(data); setLoading(false); });
  }, []);

  async function handleSave() {
    if (!bundle) return;
    setSaving(true);
    await fetch("/api/bundles", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(bundle),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !bundle) return;
    setImgUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const { url } = await res.json();
    setBundle({ ...bundle, image: url });
    setImgUploading(false);
  }

  function addItem() {
    if (!newItem.trim() || !bundle) return;
    setBundle({ ...bundle, includes: [...bundle.includes, newItem.trim()] });
    setNewItem("");
  }

  function removeItem(i: number) {
    if (!bundle) return;
    setBundle({ ...bundle, includes: bundle.includes.filter((_, idx) => idx !== i) });
  }

  const set = (k: keyof DBBundle, v: string) => setBundle(b => b ? { ...b, [k]: v } : b);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex justify-center py-20">
          <span className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  if (!bundle) return null;

  return (
    <AdminShell>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="font-heading text-2xl font-bold text-forest">Bundle</h1>
            <p className="text-forest/50 text-sm font-body mt-0.5">Manage your featured product bundle</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-forest text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-forest-mid transition-all shadow-md shadow-forest/20 cursor-pointer disabled:opacity-70"
          >
            {saving
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <Save size={15} />}
            {saved ? "Saved!" : saving ? "Saving…" : "Save Bundle"}
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          {/* Image */}
          <div className="p-6">
            <label className="block text-xs font-semibold text-forest/70 mb-3 font-body uppercase tracking-wide">Bundle Image</label>
            <div
              className="relative h-44 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-forest/30 transition-colors group"
              style={bundle.image
                ? { backgroundImage: `url(${bundle.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                : { background: "linear-gradient(135deg, #1B4332, #52B788)" }}
              onClick={() => fileRef.current?.click()}
            >
              {!bundle.image && (
                <div className="flex flex-col items-center gap-1 text-white/70 group-hover:text-white transition-colors">
                  <Upload size={22} />
                  <span className="text-xs font-body">Click to upload bundle image</span>
                </div>
              )}
              {bundle.image && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload size={20} className="text-white" />
                </div>
              )}
              {imgUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            {bundle.image && (
              <button onClick={() => set("image", "")} className="mt-1.5 text-xs text-red-400 hover:text-red-600 cursor-pointer font-body">
                Remove image
              </button>
            )}
          </div>

          {/* Info */}
          <div className="p-6 space-y-4">
            <Field label="Bundle Title">
              <input value={bundle.title} onChange={e => set("title", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Description">
              <textarea value={bundle.description} onChange={e => set("description", e.target.value)} rows={3} className={`${inputCls} resize-none`} />
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Price">
                <input value={bundle.price} onChange={e => set("price", e.target.value)} placeholder="$35" className={inputCls} />
              </Field>
              <Field label="Original Price">
                <input value={bundle.originalPrice} onChange={e => set("originalPrice", e.target.value)} placeholder="$65" className={inputCls} />
              </Field>
              <Field label="Savings Text">
                <input value={bundle.savings} onChange={e => set("savings", e.target.value)} placeholder="Save $30" className={inputCls} />
              </Field>
            </div>
            <Field label="Purchase Link">
              <input value={bundle.link} onChange={e => set("link", e.target.value)} placeholder="https://…" className={inputCls} />
            </Field>
          </div>

          {/* Includes */}
          <div className="p-6">
            <label className="block text-xs font-semibold text-forest/70 mb-3 font-body uppercase tracking-wide">
              Included Items ({bundle.includes.length})
            </label>
            <div className="space-y-2 mb-3">
              {bundle.includes.map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-forest/4 border border-forest/8">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                  <span className="flex-1 text-sm text-forest font-body">{item}</span>
                  <button onClick={() => removeItem(i)} className="p-1 rounded-lg hover:bg-red-50 text-forest/40 hover:text-red-400 transition-colors cursor-pointer">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addItem()}
                placeholder="Add included item…"
                className={`${inputCls} flex-1`}
              />
              <button
                onClick={addItem}
                disabled={!newItem.trim()}
                className="px-3 py-2 bg-forest text-white rounded-xl hover:bg-forest-mid transition-all disabled:opacity-50 cursor-pointer"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-forest/70 mb-1.5 font-body uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-forest text-sm font-body focus:outline-none focus:border-forest/40 focus:bg-white transition-all";
