"use client";

import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import IngredientsGallery from "@/components/IngredientsGallery";
import ContactSection from "@/components/ContactSection";
import FeedbackSection from "@/components/FeedbackSection";
import Image from "next/image";
import Link from "next/link";
import { deliceProduct } from "@/lib/productData";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

// Keyframe-animated floating spice badge
function FloatingSpiceBadge() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.08, 1.08, 1, 1],
        rotate: [0, 0, 8, 8, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
      style={{ display: "inline-block" }}
      className="bg-mustard/20 border border-mustard/40 px-4 py-2 text-xs font-bold text-brown font-sans tracking-wider uppercase"
    >
      ✦ 12 Ayurvedic Herbs
    </motion.div>
  );
}

export default function Home() {
  const product = deliceProduct;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* ═══════════════════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════════════════ */}
        <section className="relative bg-cream overflow-hidden min-h-[90vh] flex items-center">
          {/* Warm radial backgrounds */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,92,50,0.08)_0%,transparent_65%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(214,165,54,0.05)_0%,transparent_65%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* LEFT: text */}
            <div className="flex flex-col space-y-7 z-10">
              {/* Animated badge */}
              <div>
                <FloatingSpiceBadge />
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark-coffee leading-tight font-black">
                Ancient Ayurveda.<br />
                <span className="text-cinnamon">Modern Wellness.</span>
              </h1>

              <p className="text-sm md:text-base text-dark-coffee/80 max-w-lg leading-relaxed font-sans">
                Discover an authentic stone-ground digestive blend — 12 therapeutic herbs, hand-toasted in cold-pressed mustard oil. Where tradition meets flavour.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {["100% Natural", "Stone Ground", "Small Batch", "No Preservatives"].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-xs text-olive font-semibold font-sans bg-olive/10 px-3 py-1.5 rounded-full border border-olive/20">
                    <Check className="w-3 h-3" /> {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/product"
                  className="bg-brown hover:bg-dark-coffee text-cream px-8 py-4 rounded-xl text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 font-sans shadow-sm"
                >
                  <span>Shop Delice</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/#about"
                  className="border border-brown/20 hover:bg-cream/60 text-brown px-8 py-4 rounded-xl text-sm font-semibold tracking-wide transition-colors text-center font-sans"
                >
                  Our Story
                </Link>
              </div>
            </div>

            {/* RIGHT: circular logo only */}
            <div className="flex flex-col items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="relative"
              >
                {/* Decorative ring pulses */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border-2 border-cinnamon/20"
                  style={{ margin: -16 }}
                />
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute inset-0 rounded-full border border-mustard/10"
                  style={{ margin: -32 }}
                />

                {/* Circular logo container */}
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-brown/15 shadow-2xl bg-ivory flex items-center justify-center">
                  <div className="relative w-48 h-48 md:w-64 md:h-64">
                    <Image
                      src="/images/delice-logo.png"
                      alt="Delice Artisan Spices logo"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 192px, 256px"
                      priority
                    />
                  </div>
                </div>

                {/* Brand tagline below circle */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-center mt-5"
                >
                  <span className="block font-serif text-lg text-brown font-bold tracking-wider">DELICES</span>
                  <span className="block text-[10px] tracking-[0.25em] text-cinnamon font-sans uppercase mt-0.5">Artisan Spices</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            BRAND PROMISE STRIP
        ═══════════════════════════════════════════════════════ */}
        <section className="bg-warm-white py-10 px-6 border-y border-brown/5">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { title: "100% Raw", sub: "No Artificial Fillers" },
              { title: "12 Herb Blend", sub: "Ancient Ayurvedic Formula" },
              { title: "North India Heritage", sub: "Authentic Small-Batch" },
              { title: "Gut Friendly", sub: "Aids Bloating & Digestion" },
            ].map((item) => (
              <div key={item.title}>
                <span className="block text-base font-serif text-brown font-bold">{item.title}</span>
                <span className="text-xs text-dark-coffee/65 font-sans">{item.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            ABOUT SECTION
        ═══════════════════════════════════════════════════════ */}
        <AboutSection />

        <IngredientsGallery />

        {/* ═══════════════════════════════════════════════════════
            FEATURED PRODUCT SHOWCASE
        ═══════════════════════════════════════════════════════ */}
        <section className="py-20 px-6 max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-2xl md:text-3xl text-brown font-bold mb-4">
              Select Your Pack Size
            </h2>
            <p className="text-sm text-dark-coffee/75 font-sans">
              Hand-ground, toasted fresh weekly. Pick the size that fits your wellness routine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {product.variants.map((v) => (
              <Link
                key={v.id}
                href="/product"
                className="bg-cream border border-brown/15 rounded-2xl p-6 flex flex-col gap-3 hover:border-cinnamon hover:shadow-md transition-all group"
              >
                <div className="relative w-full h-40 bg-warm-white rounded-xl overflow-hidden">
                  <Image
                    src="/images/buknu-top.jpg"
                    alt={v.name}
                    fill
                    className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    sizes="25vw"
                  />
                </div>
                <div>
                  <span className="block font-serif text-sm text-brown font-bold">{v.name}</span>
                  <span className="block text-xs text-dark-coffee/60 font-sans mt-0.5">{v.weight}</span>
                  <span className="block text-lg font-serif text-cinnamon font-bold mt-2">{formatPrice(v.price)}</span>
                </div>
                <span className="text-xs text-brown/80 font-sans">{v.description}</span>
                <span className="mt-auto text-xs font-semibold text-cinnamon group-hover:text-terracotta transition-colors flex items-center gap-1">
                  Buy Now <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            FEEDBACK SECTION
        ═══════════════════════════════════════════════════════ */}
        <FeedbackSection />

        {/* ═══════════════════════════════════════════════════════
            CONTACT SECTION
        ═══════════════════════════════════════════════════════ */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
