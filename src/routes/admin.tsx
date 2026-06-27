
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, type ProductOverride } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Gripsta" }] }),
  component: AdminPage,
});

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [overrides, setOverrides] = useState<Record<string, ProductOverride>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    if (!authed) return;
    supabase.from("products_override").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, ProductOverride> = {};
        data.forEach((d) => (map[d.id] = d));
        setOverrides(map);
      }
    });
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Wrong password.");
    }
  };

  const getField = (id: string, field: keyof ProductOverride, fallback: any) =>
    overrides[id]?.[field] ?? fallback;

  const setField = (id: string, field: keyof ProductOverride, value: any) => {
    setOverrides((prev) => ({
      ...prev,
      [id]: { ...prev[id], id, in_stock: true, visible: true, ...prev[id], [field]: value },
    }));
  };

  const handleSave = async (id: string) => {
    setSaving(id);
    const product = PRODUCTS.find((p) => p.id === id)!;
    const o = overrides[id] ?? { id };
    const payload = {
      id,
      name: o.name ?? product.name,
      short_spec: o.short_spec ?? product.shortSpec,
      description: o.description ?? product.description,
      in_stock: o.in_stock ?? true,
      image_url: o.image_url ?? null,
      visible: o.visible ?? true,
      updated_at: new Date().toISOString(),
    };
    await supabase.from("products_override").upsert(payload);
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <span className="label-accent">Admin Access</span>
          <h1 className="font-display text-4xl mt-2 mb-8">GRIPSTA ADMIN</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button className="btn-primary w-full justify-center">Enter →</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Admin Panel</span>
          <h1 className="font-display text-5xl mt-2">MANAGE PRODUCTS</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Changes save instantly to Supabase and reflect live on the site.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 space-y-4">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="bg-surface border border-border p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">

                {/* Left — product info + fields */}
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-display text-xl">{p.name}</h3>
                    <span className="label-accent">{p.categoryLabel}</span>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="label-accent block mb-1">Product Name</label>
                    <input
                      type="text"
                      value={getField(p.id, "name", p.name) as string}
                      onChange={(e) => setField(p.id, "name", e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Short spec */}
                  <div>
                    <label className="label-accent block mb-1">Short Spec</label>
                    <input
                      type="text"
                      value={getField(p.id, "short_spec", p.shortSpec) as string}
                      onChange={(e) => setField(p.id, "short_spec", e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="label-accent block mb-1">Image URL</label>
                    <input
                      type="text"
                      placeholder="https://... (paste image link here)"
                      value={getField(p.id, "image_url", "") as string}
                      onChange={(e) => setField(p.id, "image_url", e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Right — toggles + save */}
                <div className="flex flex-col gap-4 items-end shrink-0">

                  {/* In Stock toggle */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground uppercase tracking-widest">In Stock</span>
                    <button
                      onClick={() => setField(p.id, "in_stock", !getField(p.id, "in_stock", true))}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        getField(p.id, "in_stock", true) ? "bg-primary" : "bg-border"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                          getField(p.id, "in_stock", true) ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Visible toggle */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground uppercase tracking-widest">Visible</span>
                    <button
                      onClick={() => setField(p.id, "visible", !getField(p.id, "visible", true))}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        getField(p.id, "visible", true) ? "bg-primary" : "bg-border"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                          getField(p.id, "visible", true) ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Save button */}
                  <button
                    onClick={() => handleSave(p.id)}
                    disabled={saving === p.id}
                    className={`btn-primary text-xs px-6 py-2.5 ${saved === p.id ? "bg-green-600 border-green-600" : ""}`}
                  >
                    {saving === p.id ? "Saving..." : saved === p.id ? "✓ Saved" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}