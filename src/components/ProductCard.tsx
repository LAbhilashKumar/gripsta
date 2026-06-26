import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  hideViewButton?: boolean;
}

export function ProductCard({ product, hideViewButton }: Props) {
  const { add } = useCart();

  return (
    <div className="bg-surface border border-border hover:border-border-hover transition-colors group flex flex-col">

      {/* Image area */}
      <Link
        to="/products"
        search={{ cat: product.category }}
        className="block aspect-[4/3] bg-[#1a1a1a] relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1a1a1a,#221818)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-8xl text-foreground/5 select-none">
            {product.categoryLabel[0]}
          </span>
        </div>
        {product.badge && (
          <span className="absolute top-3 left-3 label-accent bg-background/80 px-2 py-0.5 text-primary">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Text */}
      <div className="p-5 flex-1 flex flex-col">
        <p className="label-accent text-muted-foreground">{product.categoryLabel}</p>
        <h3 className="font-display text-xl mt-1 leading-tight">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed flex-1">
          {product.shortSpec}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              add({
                id: product.id,
                name: product.name,
                price: product.price,
                unit: product.unit,
              });
            }}
            className="flex-1 btn-primary text-xs py-2.5"
          >
            Add to Cart
          </button>
          {!hideViewButton && (
            <Link
              to="/products"
              search={{ cat: product.category }}
              className="btn-outline text-xs py-2.5 px-4"
            >
              View
            </Link>
          )}
        </div>
      </div>

    </div>
  );
}
