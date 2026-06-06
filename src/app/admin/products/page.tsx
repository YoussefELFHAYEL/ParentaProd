"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, Upload, ImageIcon } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { DBProduct } from "@/lib/db";

const TYPES = ["Printable", "PDF Guide", "Planner", "Checklist", "Flashcards"];
const EMPTY: Omit<DBProduct, "id"> = {
  title: "", type: "Printable", description: "", price: "$",
  link: "#", image: "", gradientFrom: "#1B4332", gradientTo: "#2D6A4F", iconBg: "#1B4332",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editing,  setEditing]  = useState<DBProduct | null>(null);
  const [form,     setForm]     = useState({ ...EMPTY });
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [imgUploading, setImgUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const data = await fetch("/api/products").then((r) => r.json());
    setProducts(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ ...EMPTY });
    setPanelOpen(true);
  }

  function openEdit(p: DBProduct) {
    setEditing(p);
    setForm({ title: p.title, type: p.type, description: p.description, price: p.price, link: p.link, image: p.image, gradientFrom: p.gradientFrom, gradientTo: p.gradientTo, iconBg: p.iconBg });
    setPanelOpen(true);
  }

  async function handleSave() {
    if (!form.title.trim()) return;
    setSaving(true);
    if (editing) {
      await fetch(`/api/products/${editing.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/products", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
    }
    setSaving(false);
    setPanelOpen(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    setDeleting(id);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const { url } = await res.json();
    setForm((f) => ({ ...f, image: url }));
    setImgUploading(false);
  }

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="font-heading text-2xl font-bold text-forest">Products</h1>
            <p className="text-forest/50 text-sm font-body mt-0.5">{products.length} product{products.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-forest text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-forest-mid transition-all shadow-md shadow-forest/20 cursor-pointer"
          >
            <Plus size={15} /> Add Product
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 text-center py-20">
            <p className="text-forest/40 text-sm font-body">No products yet. Add your first one!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-forest/50 font-body uppercase tracking-wide">Product</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-forest/50 font-body uppercase tracking-wide hidden sm:table-cell">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-forest/50 font-body uppercase tracking-wide">Price</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-forest/50 font-body uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
                            style={{ background: `linear-gradient(135deg, ${p.gradientFrom}, ${p.gradientTo})` }}
                          >
                            {p.image && <img src={p.image} alt="" className="w-full h-full object-cover" />}
                          </div>
                          <p className="text-sm font-semibold text-forest font-body truncate max-w-[200px]">{p.title}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs text-forest/60 bg-forest/5 px-2.5 py-1 rounded-lg font-body">{p.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-bold text-forest font-heading">{p.price}</span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(p)} className="p-2 rounded-lg hover:bg-forest/8 text-forest/60 hover:text-forest transition-colors cursor-pointer">
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deleting === p.id}
                            className="p-2 rounded-lg hover:bg-red-50 text-forest/60 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            {deleting === p.id
                              ? <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin block" />
                              : <Trash2 size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Side panel */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setPanelOpen(false)} />
          <div className="relative ml-auto w-full max-w-md bg-white shadow-2xl flex flex-col h-full overflow-y-auto">
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-heading font-semibold text-forest text-lg">
                {editing ? "Edit Product" : "New Product"}
              </h2>
              <button onClick={() => setPanelOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer">
                <X size={18} className="text-forest/60" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 p-6 space-y-5">
              {/* Image */}
              <div>
                <label className="block text-xs font-semibold text-forest/70 mb-2 font-body uppercase tracking-wide">Product Image</label>
                <div
                  className="relative h-36 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-forest/30 transition-colors group"
                  style={form.image ? { backgroundImage: `url(${form.image})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: `linear-gradient(135deg, ${form.gradientFrom}, ${form.gradientTo})` }}
                  onClick={() => fileRef.current?.click()}
                >
                  {!form.image && (
                    <div className="flex flex-col items-center gap-1 text-white/70 group-hover:text-white transition-colors">
                      <Upload size={20} />
                      <span className="text-xs font-body">Click to upload</span>
                    </div>
                  )}
                  {form.image && (
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
                {form.image && (
                  <button onClick={() => set("image", "")} className="mt-1 text-xs text-red-400 hover:text-red-600 cursor-pointer font-body">
                    Remove image
                  </button>
                )}
              </div>

              {/* Title */}
              <Field label="Title" required>
                <input value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Bedtime Routine Chart" className={inputCls} />
              </Field>

              {/* Type */}
              <Field label="Type">
                <select value={form.type} onChange={e => set("type", e.target.value)} className={inputCls}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>

              {/* Description */}
              <Field label="Description">
                <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3} placeholder="Short description…" className={`${inputCls} resize-none`} />
              </Field>

              {/* Price */}
              <Field label="Price">
                <input value={form.price} onChange={e => set("price", e.target.value)} placeholder="e.g. $7" className={inputCls} />
              </Field>

              {/* Link */}
              <Field label="Product Link (Etsy / Gumroad / Payhip)">
                <input value={form.link} onChange={e => set("link", e.target.value)} placeholder="https://etsy.com/…" className={inputCls} />
              </Field>

              {/* Gradient */}
              <div>
                <label className="block text-xs font-semibold text-forest/70 mb-2 font-body uppercase tracking-wide">Gradient Colors (placeholder)</label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-[10px] text-forest/50 font-body mb-1 block">From</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={form.gradientFrom} onChange={e => { set("gradientFrom", e.target.value); set("iconBg", e.target.value); }} className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                      <input value={form.gradientFrom} onChange={e => set("gradientFrom", e.target.value)} className={`${inputCls} flex-1 font-mono text-xs`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-forest/50 font-body mb-1 block">To</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={form.gradientTo} onChange={e => set("gradientTo", e.target.value)} className="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer p-0.5" />
                      <input value={form.gradientTo} onChange={e => set("gradientTo", e.target.value)} className={`${inputCls} flex-1 font-mono text-xs`} />
                    </div>
                  </div>
                </div>
                {/* Preview */}
                <div className="mt-2 h-8 rounded-xl" style={{ background: `linear-gradient(135deg, ${form.gradientFrom}, ${form.gradientTo})` }} />
              </div>
            </div>

            {/* Save */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
                className="w-full bg-forest text-white font-semibold py-3 rounded-xl hover:bg-forest-mid transition-all disabled:opacity-60 cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {saving ? "Saving…" : editing ? "Save Changes" : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-forest/70 mb-1.5 font-body uppercase tracking-wide">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-forest text-sm font-body focus:outline-none focus:border-forest/40 focus:bg-white transition-all";
