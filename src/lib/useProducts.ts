import { useEffect, useState } from "react";
import { supabase, type ProductOverride } from "./supabase";
import { PRODUCTS, type Product } from "./products";

export interface MergedProduct extends Product {
  inStock: boolean;
  imageUrl: string | null;
  visible: boolean;
}

export function useProducts() {
  const [overrides, setOverrides] = useState<ProductOverride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from("products_override")
        .select("*");
      if (data) setOverrides(data);
      setLoading(false);
    }
    fetch();
  }, []);

  const merged: MergedProduct[] = PRODUCTS.map((p) => {
    const o = overrides.find((x) => x.id === p.id);
    return {
      ...p,
      name: o?.name ?? p.name,
      shortSpec: o?.short_spec ?? p.shortSpec,
      description: o?.description ?? p.description,
      inStock: o === undefined ? true : (o.in_stock ?? true),
      imageUrl: o?.image_url ?? null,
      visible: o === undefined ? true : (o.visible ?? true),
    };
  });

  return { products: merged.filter((p) => p.visible), loading };
}
