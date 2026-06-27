import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { PRODUCTS, CATEGORIES, type Product, type Category } from "./products";

export interface MergedProduct extends Product {
  inStock: boolean;
  imageUrl: string | null;
  visible: boolean;
}

export function useProducts() {
  const [customProducts, setCustomProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("products_override")
        .select("*");
      if (data) setCustomProducts(data);
      setLoading(false);
    }
    fetch();
  }, []);

  // Hardcoded products — always in stock, use imageUrl from Supabase if available
  const hardcoded: MergedProduct[] = PRODUCTS.map((p) => {
    const o = customProducts.find((x) => x.id === p.id && !x.is_custom);
    return {
      ...p,
      inStock: true,
      imageUrl: o?.image_url ?? null,
      visible: true,
    };
  });

  // Admin-created products from Supabase
  const custom: MergedProduct[] = customProducts
    .filter((p) => p.is_custom && p.visible)
    .map((p) => {
      const catInfo = CATEGORIES.find((c) => c.id === p.category);
      return {
        id: p.id,
        name: p.name,
        category: p.category as Category,
        categoryLabel: p.category_label ?? catInfo?.label ?? p.category,
        price: 0,
        unit: "pc",
        shortSpec: "",
        description: "",
        specs: {},
        applications: [],
        install: "",
        inStock: true,
        imageUrl: p.image_url ?? null,
        visible: p.visible ?? true,
      };
    });

  return {
    products: [...hardcoded, ...custom],
    loading,
  };
}
