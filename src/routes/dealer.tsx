import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/dealer")({
  head: () => ({
    meta: [
      { title: "Become a Dealer — Gripsta" },
      { name: "description", content: "Join the Gripsta dealer network. Strong products, attractive margins, fast dispatch and marketing support." },
    ],
  }),
  component: Dealer,
});

const PRODUCT_OPTS = ["Hinges", "Screws", "Channels", "Lid Support", "All"];

function Dealer() {
  const [submitted, setSubmitted] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const toggle = (v: string) => setInterests(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  return (
    <>
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="hero-glow" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Partner Program</span>
          <h1 className="font-display text-5xl md:text-7xl mt-3">BECOME A GRIPSTA DEALER</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">Join our network — strong products, real margins, business growth.</p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { i: "📦", t: "Wide Product Range", d: "Hinges, screws, channels, lid supports under one brand." },
              { i: "💰", t: "Attractive Dealer Margins", d: "Competitive pricing, bulk order benefits and seasonal schemes." },
              { i: "📣", t: "Marketing Support", d: "Catalogs, digital assets, product brochures provided." },
              { i: "🚚", t: "Fast Dispatch", d: "Reliable fulfillment so you never run out of stock." },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 60}>
                <div className="bg-background border border-border p-7 h-full hover:border-border-hover transition-colors">
                  <div className="text-3xl mb-3">{b.i}</div>
                  <h3 className="font-display text-xl">{b.t}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Apply Now</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">DEALER REGISTRATION</h2>

          {submitted ? (
            <div className="mt-12 bg-surface border border-primary/30 p-10 text-center">
              <div className="text-5xl">✓</div>
              <h3 className="font-display text-3xl mt-4">ENQUIRY SUBMITTED</h3>
              <p className="text-muted-foreground mt-2">Our team will reach out within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="mt-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Full Name" required />
                <Input label="Business Name" required />
                <Input label="Phone" type="tel" required />
                <Input label="Email" type="email" required />
                <Input label="City" required />
                <Input label="State" required />
              </div>

              <div>
                <label className="label-accent block mb-3">Product Interest</label>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT_OPTS.map(p => (
                    <button key={p} type="button" onClick={() => toggle(p)}
                      className={`px-4 py-2 border text-sm uppercase tracking-widest ${interests.includes(p) ? "border-primary text-primary bg-primary/5" : "border-border hover:border-foreground/40"}`}>{p}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label-accent block mb-2">Monthly Requirement</label>
                <select className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary">
                  <option>&lt; ₹10,000</option>
                  <option>₹10,000 – 50,000</option>
                  <option>₹50,000 – 1,00,000</option>
                  <option>₹1,00,000+</option>
                </select>
              </div>

              <div>
                <label className="label-accent block mb-2">Message</label>
                <textarea rows={4} className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary" />
              </div>

              <button type="submit" className="btn-primary w-full justify-center">Submit Enquiry →</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Input({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="label-accent block mb-2">{label}{required && " *"}</label>
      <input type={type} required={required} className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary" />
    </div>
  );
}
