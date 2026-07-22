import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-coffee text-cream py-12 px-6 md:px-12 mt-auto border-t border-brown/25">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding Column */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-lg tracking-wider text-warm-white font-semibold">
              DELICES
            </span>
            <span className="text-[10px] tracking-[0.25em] text-muted-gold font-sans uppercase -mt-1">
              Artisan Spices
            </span>
          </Link>
          <p className="text-cream/75 text-sm font-sans max-w-sm">
            Handcrafting traditional stone-ground digestive spices. Made from twelve raw Ayurvedic herbs and toasted in pure mustard oil.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-serif text-sm tracking-wider text-muted-gold font-semibold uppercase">
            Quick Links
          </h4>
          <div className="flex flex-col space-y-2 text-sm text-cream/80 font-sans">
            <Link href="/" className="hover:text-warm-white transition-colors">
              Home
            </Link>
            <Link href="/product" className="hover:text-warm-white transition-colors">
              Delice Spice
            </Link>
            <Link href="/#reviews" className="hover:text-warm-white transition-colors">
              Customer Reviews
            </Link>
            <Link href="/cart" className="hover:text-warm-white transition-colors">
              Shopping Cart
            </Link>
            <Link href="/#contact" className="hover:text-warm-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Brand Promise & Contact Info Column */}
        <div className="flex flex-col space-y-3 text-sm font-sans text-cream/70">
          <h4 className="font-serif text-sm tracking-wider text-muted-gold font-semibold uppercase text-cream">
            Contact & Support
          </h4>
          <p>
            Questions, bulk orders or feedback? Reach out to us anytime:
          </p>
          <a
            href="mailto:hello@thedelice.in"
            className="text-cinnamon-light hover:text-white font-medium underline transition-colors text-xs"
          >
            hellop@thedelice.in
          </a>
          <span className="text-xs text-muted-gold mt-2 font-mono">
            © {new Date().getFullYear()} Delices. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
