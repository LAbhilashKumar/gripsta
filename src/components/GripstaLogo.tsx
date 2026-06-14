export function GripstaLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <div className="flex items-baseline gap-0.5">
        <span
          className="font-display text-3xl font-bold italic"
          style={{ color: "#D71920", transform: "skewX(-8deg)", display: "inline-block" }}
        >
          G
        </span>
        <span className="font-display text-3xl font-bold tracking-wider text-foreground">RIPSTA</span>
        <span className="text-[9px] text-muted-foreground ml-0.5 -translate-y-2">™</span>
      </div>
      <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
        Where Innovation meets Durability
      </span>
    </div>
  );
}
