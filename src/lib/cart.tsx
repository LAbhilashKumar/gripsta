import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  finish?: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  update: (id: string, finish: string | undefined, qty: number) => void;
  remove: (id: string, finish?: string) => void;
  clear: () => void;
  bumped: number;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "gripsta-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [bumped, setBumped] = useState(0);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add: CartCtx["add"] = (item, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === item.id && p.finish === item.finish);
      if (idx >= 0) {
        const next = [...prev]; next[idx] = { ...next[idx], qty: next[idx].qty + qty }; return next;
      }
      return [...prev, { ...item, qty }];
    });
    setBumped(b => b + 1);
  };
  const update: CartCtx["update"] = (id, finish, qty) =>
    setItems(prev => prev.map(p => p.id === id && p.finish === finish ? { ...p, qty: Math.max(1, qty) } : p));
  const remove: CartCtx["remove"] = (id, finish) =>
    setItems(prev => prev.filter(p => !(p.id === id && p.finish === finish)));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return <Ctx.Provider value={{ items, count, total, add, update, remove, clear, bumped }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
