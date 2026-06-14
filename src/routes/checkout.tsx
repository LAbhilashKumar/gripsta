import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Gripsta" }] }),
  component: Checkout,
});

function Checkout() {
  const { items, total, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [pay, setPay] = useState<"upi" | "net" | "cod">("upi");

  if (placed) {
    return (
      <section className="pt-40 pb-24">
        <div className="max-w-xl mx-auto px-6 text-center bg-surface border border-primary/30 p-12">
          <div className="text-6xl">✓</div>
          <h1 className="font-display text-4xl mt-6 text-primary">ORDER PLACED!</h1>
          <p className="text-muted-foreground mt-3">Our team will contact you to confirm.</p>
          <Link to="/" className="btn-primary mt-8 inline-flex">Back to Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="label-accent">Demo Checkout</span>
        <h1 className="font-display text-5xl md:text-6xl mt-3">CHECKOUT</h1>

        <form onSubmit={e => { e.preventDefault(); clear(); setPlaced(true); }} className="mt-12 grid lg:grid-cols-[1fr_380px] gap-10">
          <div className="space-y-8">
            <div>
              <h2 className="label-accent mb-4">Shipping Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <F label="Name" /><F label="Phone" type="tel" />
                <div className="sm:col-span-2"><F label="Email" type="email" /></div>
                <div className="sm:col-span-2"><F label="Address" /></div>
                <F label="City" /><F label="Pincode" />
              </div>
            </div>

            <div>
              <h2 className="label-accent mb-4">Payment Method</h2>
              <div className="space-y-3">
                {([
                  ["upi","UPI","Pay via UPI app — QR shown on next step"],
                  ["net","Net Banking","Pay through your bank"],
                  ["cod","Cash on Delivery","Pay when your order arrives"],
                ] as const).map(([id, l, d]) => (
                  <button type="button" key={id} onClick={() => setPay(id)}
                    className={`w-full text-left p-5 border transition-colors ${pay === id ? "border-primary bg-primary/5" : "border-border hover:border-foreground/30"}`}>
                    <div className="font-semibold">{l}</div>
                    <div className="text-xs text-muted-foreground mt-1">{d}</div>
                  </button>
                ))}
              </div>

              {pay === "upi" && (
                <div className="mt-5 bg-surface border border-border p-6 flex gap-5 items-center">
                  <div className="w-32 h-32 bg-white grid place-items-center text-foreground text-xs">[QR PLACEHOLDER]</div>
                  <div>
                    <p className="font-display text-2xl">SCAN TO PAY</p>
                    <p className="text-sm text-muted-foreground mt-1">Open any UPI app to scan.</p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground">This is a demo checkout — no real transaction will occur.</p>
          </div>

          <aside className="bg-surface border border-border p-6 h-fit lg:sticky lg:top-28">
            <h2 className="font-display text-2xl">ORDER SUMMARY</h2>
            <div className="mt-5 space-y-3 max-h-64 overflow-auto">
              {items.map(i => (
                <div key={i.id + (i.finish || "")} className="flex justify-between text-sm">
                  <span className="truncate pr-2">{i.name} <span className="text-muted-foreground">× {i.qty}</span></span>
                  <span>₹{i.price * i.qty}</span>
                </div>
              ))}
              {items.length === 0 && <p className="text-sm text-muted-foreground">Cart is empty.</p>}
            </div>
            <div className="mt-6 pt-4 border-t border-border flex justify-between font-display text-2xl">
              <span>Total</span><span>₹{total}</span>
            </div>
            <button type="submit" disabled={items.length === 0} className="btn-primary w-full justify-center mt-6 disabled:opacity-40 disabled:cursor-not-allowed">Place Order →</button>
          </aside>
        </form>
      </div>
    </section>
  );
}

function F({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="label-accent block mb-2">{label}</label>
      <input type={type} required className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary" />
    </div>
  );
}
