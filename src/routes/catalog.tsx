import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — Gripsta Hardware" },
      { name: "description", content: "Download the complete Gripsta catalog — hinges, drywall screws, drawer channels, lid supports. Bulk pricing on request." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const [q, setQ] = useState("");
  const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <span className="label-accent">2026 Edition</span>
          <h1 className="font-display text-5xl md:text-7xl mt-3">EXPLORE THE COMPLETE GRIPSTA CATALOG</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">Full product range with sizes, finishes, specifications and pack details.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#" className="btn-primary">⬇ Download PDF Catalog</a>
            <Link to="/contact" className="btn-outline">Bulk Pricing →</Link>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <input
            type="text" placeholder="Search products in catalog..." value={q} onChange={e => setQ(e.target.value)}
            className="w-full bg-surface border border-border px-5 py-4 text-base focus:outline-none focus:border-primary"
          />

          {CATEGORIES.map(c => {
            const items = filtered.filter(p => p.category === c.id);
            if (items.length === 0) return null;
            return (
              <div key={c.id} className="mt-16">
                <div className="flex items-end justify-between border-b border-border pb-4 mb-6">
                  <div>
                    <span className="label-accent">{c.desc}</span>
                    <h2 className="font-display text-4xl mt-1">{c.icon} {c.label}</h2>
                  </div>
                  <Link to="/products" search={{ cat: c.id, sort: "default" }} className="text-sm text-primary hover:underline">View all →</Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {items.map(p => (
                    <Link key={p.id} to="/products/$id" params={{ id: p.id }} className="bg-surface border border-border p-5 hover:border-border-hover group transition-colors">
                      <div className="text-xs text-muted-foreground">{p.shortSpec}</div>
                      <h3 className="font-semibold mt-1 group-hover:text-primary transition-colors">{p.name}</h3>
                      <div className="mt-3 font-display text-2xl">₹{p.price}<span className="text-xs text-muted-foreground ml-1">/{p.unit}</span></div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          <p className="mt-16 text-sm text-muted-foreground text-center border-t border-border pt-8">
            For bulk pricing and customization, contact our team.
          </p>
        </div>
      </section>
    </>
  );
}
