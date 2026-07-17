import { Link } from "@tanstack/react-router";
import { GripstaLogo } from "./GripstaLogo";

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <GripstaLogo />
          <p className="text-sm text-muted-foreground mt-6 max-w-xs">
            Premium architectural & furniture hardware, engineered for precision and built for modern interiors.
          </p>
        </div>
        <div>
          <h4 className="label-accent mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-primary">Products</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            {/* <li><Link to="/catalog" className="hover:text-primary">Catalog</Link></li> */}
          </ul>
        </div>
        <div>
          <h4 className="label-accent mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>+91 79959 55787</li>
            <li>Navpadhhardware@gmail.com</li>
            <li>Aghapura, Backside of Mahalaksmi Tiffin Center, Hyderabad 500001</li>
          </ul>
        </div>
        <div>
          <h4 className="label-accent mb-4">Follow</h4>
          <div className="flex gap-3">
            <a href="https://instagram.com/gripsta_1401" target="_blank" rel="noreferrer" className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="https://wa.me/7995955787" target="_blank" rel="noreferrer" className="w-10 h-10 border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-1 1.2c-.2.2-.4.3-.6.1-.9-.4-2-1.1-2.9-1.9-.7-.7-1.3-1.5-1.8-2.4-.1-.2 0-.4.1-.6l.7-1c.1-.2.2-.3.1-.5L8.3 5.8c-.1-.4-.5-.5-.8-.5h-.9c-.3 0-.7.1-1 .4-.8.8-1.3 1.9-1.2 3 0 1.6.7 3.2 1.4 4.5 1.6 2.4 3.7 4.4 6.2 5.7.9.5 1.8.9 2.8 1.1.7.2 1.4.3 2.1.2 1-.1 1.9-.6 2.5-1.4.3-.5.5-1.1.6-1.6 0-.2 0-.5-.1-.7l-.4-.1z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        Where Innovation Meets Durability™ · © 2025 Gripsta. All rights reserved.
      </div>
    </footer>
  );
}
