"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Upload, Plus, X, Save, Trash2, Package, ChevronRight } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { DBBundle } from "@/lib/db";

const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-forest text-sm font-body focus:outline-none focus:border-forest/40 focus:bg-white transition-all";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-forest/70 mb-1.5 font-body uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function AdminBundlesPage() {
  const [bundles,      setBundles]      = useState<DBBundle[]>([]);
  const [selected,     setSelected]     = useState<DBBundle | null>(null);
  const [draft,        setDraft]        = useState<DBBundle | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [saved,        setSaved]        = useState(false);
  const [creating,     setCreating]     = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [newItem,      setNewItem]      = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function loadBundles() {
    setLoading(true);
    const data: DBBundle[] = await fetch("/api/bundles").then((r) => r.json());
    setBundles(data);
    if (data.length > 0) {
      setSelected(data[0]);
      setDraft(data[0]);
    }
    setLoading(false);
  }

  useEffect(() => { loadBundles(); }, []);

  function selectBundle(b: DBBundle) {
    setSelected(b);
    setDraft(b);
    setNewItem("");
    setSaved(false);
  }

  const set = useCallback(
    (k: keyof DBBundle, v: string) =>
      setDraft((d) => (d ? { ...d, [k]: v } : d)),
    []
  );

  async function handleSave() {
    if (!draft) return;
    setSaving(true);
    const res = await fetch(`/api/bundles/${draft.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const updated: DBBundle = await res.json();
    setBundles((bs) => bs.map((b) => (b.id === updated.id ? updated : b)));
    setSelected(updated);
    setDraft(updated);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function handleCreate() {
    setCreating(true);
    const res = await fetch("/api/bundles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Bundle",
        description: "",
        price: "$0",
        originalPrice: "$0",
        savings: "",
        link: "#",
        image: "",
        includes: [],
      }),
    });
    const newBundle: DBBundle = await res.json();
    setBundles((bs) => [...bs, newBundle]);
    setSelected(newBundle);
    setDraft(newBundle);
    setCreating(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this bundle?")) return;
    await fetch(`/api/bundles/${id}`, { method: "DELETE" });
    const next = bundles.filter((b) => b.id !== id);
    setBundles(next);
    if (selected?.id === id) {
      const fallback = next[0] ?? null;
      setSelected(fallback);
      setDraft(fallback);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !draft) return;
    setImgUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const { url } = await res.json();
    setDraft((d) => (d ? { ...d, image: url } : d));
    setImgUploading(false);
  }

  function addItem() {
    if (!newItem.trim() || !draft) return;
    setDraft((d) => (d ? { ...d, includes: [...d.includes, newItem.trim()] } : d));
    setNewItem("");
  }

  function removeItem(i: number) {
    setDraft((d) =>
      d ? { ...d, includes: d.includes.filter((_, idx) => idx !== i) } : d
    );
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="flex justify-center py-20">
          <span className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">

        {/* ── Left panel: bundle list ── */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-forest text-base">Bundles</h2>
            <button
              onClick={handleCreate}
              disabled={creating}
              className="flex items-center gap-1.5 text-xs font-semibold text-forest bg-forest/8 hover:bg-forest/15 px-3 py-1.5 rounded-xl transition-all cursor-pointer disabled:opacity-60"
            >
              {creating
                ? <span className="w-3 h-3 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
                : <Plus size={13} />}
              New
            </button>
          </div>

          <div className="space-y-1.5">
            {bundles.length === 0 && (
              <div className="text-center py-8 text-forest/40 text-sm font-body">
                No bundles yet.
              </div>
            )}
            {bundles.map((b) => (
              <button
                key={b.id}
                onClick={() => selectBundle(b)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                  selected?.id === b.id
                    ? "bg-forest text-white"
                    : "bg-white border border-gray-100 hover:border-forest/20 text-forest"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex-shrink-0 overflow-hidden"
                  style={
                    b.image
                      ? { backgroundImage: `url(${b.image})`, backgroundSize: "cover" }
                      : { background: "linear-gradient(135deg, #1B4332, #52B788)" }
                  }
                >
                  {!b.image && (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={14} className="text-white/70" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold truncate font-body ${selected?.id === b.id ? "text-white" : "text-forest"}`}>
                    {b.title}
                  </p>
                  <p className={`text-[10px] ${selected?.id === b.id ? "text-white/65" : "text-forest/45"}`}>
                    {b.price}
                  </p>
                </div>
                <ChevronRight size={13} className={selected?.id === b.id ? "text-white/60" : "text-forest/30"} />
              </button>
            ))}
          </div>
        </div>

        {/* ── Right panel: edit form ── */}
        <div className="flex-1 min-w-0">
          {!draft ? (
            <div className="flex flex-col items-center justify-center py-24 text-forest/40">
              <Package size={36} className="mb-3 opacity-40" />
              <p className="text-sm font-body">Select a bundle to edit, or create a new one.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h1 className="font-heading text-xl font-bold text-forest">{draft.title}</h1>
                  <p className="text-forest/45 text-xs font-body mt-0.5">Edit bundle details</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(draft.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-forest text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-forest-mid transition-all shadow-md shadow-forest/20 cursor-pointer disabled:opacity-70"
                  >
                    {saving
                      ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <Save size={15} />}
                    {saved ? "Saved!" : saving ? "Saving…" : "Save"}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
                {/* Image */}
                <div className="p-5">
                  <label className="block text-xs font-semibold text-forest/70 mb-3 font-body uppercase tracking-wide">
                    Bundle Image
                  </label>
                  <div
                    className="relative h-40 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-forest/30 transition-colors group"
                    style={
                      draft.image
                        ? { backgroundImage: `url(${draft.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                        : { background: "linear-gradient(135deg, #1B4332, #52B788)" }
                    }
                    onClick={() => fileRef.current?.click()}
                  >
                    {!draft.image && (
                      <div className="flex flex-col items-center gap-1 text-white/70 group-hover:text-white transition-colors">
                        <Upload size={20} />
                        <span className="text-xs font-body">Click to upload</span>
                      </div>
                    )}
                    {draft.image && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload size={18} className="text-white" />
                      </div>
                    )}
                    {imgUploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  {draft.image && (
                    <button
                      onClick={() => setDraft((d) => (d ? { ...d, image: "" } : d))}
                      className="mt-1.5 text-xs text-red-400 hover:text-red-600 cursor-pointer font-body"
                    >
                      Remove image
                    </button>
                  )}
                </div>

                {/* Info fields */}
                <div className="p-5 space-y-4">
                  <Field label="Bundle Title">
                    <input
                      value={draft.title}
                      onChange={(e) => set("title", e.target.value)}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Description">
                    <textarea
                      value={draft.description}
                      onChange={(e) => set("description", e.target.value)}
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Price">
                      <input
                        value={draft.price}
                        onChange={(e) => set("price", e.target.value)}
                        placeholder="$35"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Original Price">
                      <input
                        value={draft.originalPrice}
                        onChange={(e) => set("originalPrice", e.target.value)}
                        placeholder="$65"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Savings Text">
                      <input
                        value={draft.savings}
                        onChange={(e) => set("savings", e.target.value)}
                        placeholder="Save $30"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  <Field label="Purchase Link">
                    <input
                      value={draft.link}
                      onChange={(e) => set("link", e.target.value)}
                      placeholder="https://…"
                      className={inputCls}
                    />
                  </Field>
                </div>

                {/* Includes */}
                <div className="p-5">
                  <label className="block text-xs font-semibold text-forest/70 mb-3 font-body uppercase tracking-wide">
                    Included Items ({draft.includes.length})
                  </label>
                  <div className="space-y-2 mb-3">
                    {draft.includes.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-forest/4 border border-forest/8"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0" />
                        <span className="flex-1 text-sm text-forest font-body">{item}</span>
                        <button
                          onClick={() => removeItem(i)}
                          className="p-1 rounded-lg hover:bg-red-50 text-forest/40 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addItem()}
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
            </>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
