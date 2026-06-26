// import logo from "@/assets/gripsta-logo-v5.png.asset.json";

// export function GripstaLogo({ className = "" }: { className?: string }) {
//   return (
//     <img
//       src={logo.url}
//       alt="Gripsta — Where Innovation meets Durability"
//       className={`h-12 w-auto object-contain ${className}`}
//     />
//   );
// }
import logo from "@/assets/gripsta-logo.png";

export function GripstaLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Gripsta — Where Innovation meets Durability"
      className={`h-12 w-auto object-contain ${className}`}
    />
  );
}
// export function GripstaLogo() {
//   return (
//     <span className="font-display text-2xl tracking-widest flex items-center">
//       <span className="text-primary">G</span>
//       <span className="text-foreground">RIPSTA</span>
//     </span>
//   );
// }
