"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { ShoppingBag, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";

// Inline SVG — Instagram was removed from lucide-react v0.276+
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Navbar() {
  const cartQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-brown/10 py-3 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo Image */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
            <Image
              src="/images/delice-logo.png"
              alt="Delice Artisan Spices logo"
              fill
              className="object-contain"
              sizes="48px"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-sm md:text-base tracking-wider text-brown font-semibold group-hover:text-cinnamon transition-colors">
              DELICES
            </span>
            <span className="text-[9px] tracking-[0.2em] text-cinnamon font-sans uppercase">
              Artisan Spices
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-7 font-sans text-sm font-medium text-dark-coffee">
          <Link href="/" className="hover:text-cinnamon transition-colors">Home</Link>
          <Link href="/#about" className="hover:text-cinnamon transition-colors">About</Link>
          <Link href="/#ingredients" className="hover:text-cinnamon transition-colors">Ingredients</Link>
          <Link href="/#reviews" className="hover:text-cinnamon transition-colors">Reviews</Link>
          <Link href="/product" className="hover:text-cinnamon transition-colors">Buy Delice</Link>
          <Link href="/#contact" className="hover:text-cinnamon transition-colors">Contact</Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <a
            href="https://instagram.com/delices.artisanspices"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-brown hover:text-pink-600 transition-colors"
            aria-label="Instagram"
          >
          <InstagramIcon className="w-4 h-4" />
          </a>

          <a
            href="https://wa.me/917428258845?text=Hi%20Delices!%20I%27d%20like%20to%20order%20Delice."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-brown hover:text-green-600 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <Link href="/cart" className="relative p-1 hover:text-cinnamon transition-colors">
            <ShoppingBag className="w-5 h-5 text-brown" />
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-cinnamon text-white font-sans text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartQuantity}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-brown focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-brown/10 flex flex-col space-y-4 font-sans text-sm font-medium text-dark-coffee">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-cinnamon transition-colors">Home</Link>
          <Link href="/#about" onClick={() => setIsOpen(false)} className="hover:text-cinnamon transition-colors">About</Link>
          <Link href="/#ingredients" onClick={() => setIsOpen(false)} className="hover:text-cinnamon transition-colors">Ingredients</Link>
          <Link href="/#reviews" onClick={() => setIsOpen(false)} className="hover:text-cinnamon transition-colors">Reviews</Link>
          <Link href="/product" onClick={() => setIsOpen(false)} className="hover:text-cinnamon transition-colors">Buy Delice</Link>
          <Link href="/#contact" onClick={() => setIsOpen(false)} className="hover:text-cinnamon transition-colors">Contact</Link>
          <div className="flex items-center gap-4 pt-2">
            <a href="https://instagram.com/delices.artisanspices" target="_blank" rel="noopener noreferrer" className="text-pink-600 flex items-center gap-1.5 text-xs">
              <InstagramIcon className="w-4 h-4" /> Instagram
            </a>
            <a href="https://wa.me/917428258845" target="_blank" rel="noopener noreferrer" className="text-green-600 flex items-center gap-1.5 text-xs">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
