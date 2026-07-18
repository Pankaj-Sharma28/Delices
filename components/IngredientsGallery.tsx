"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

const ingredients = [
  {
    id: 1,
    name: "Amchoor",
    hindi: "आमचूर",
    benefit: "Rich in Vitamin C, aids iron absorption",
    origin: "Dried Raw Mango",
    flavor: "Tangy & Sour",
    image: "/images/ingredients/amchoor.jpg",
    color: "#A85C32",
    hasImage: true,
  },
  {
    id: 2,
    name: "Ajwain",
    hindi: "अजवाइन",
    benefit: "Relieves bloating & indigestion instantly",
    origin: "Carom Seeds",
    flavor: "Pungent & Bitter",
    image: "/images/ingredients/ajwain.jpg",
    color: "#6B7A4F",
    hasImage: true,
  },
  {
    id: 3,
    name: "Turmeric",
    hindi: "हल्दी",
    benefit: "Powerful anti-inflammatory & antioxidant",
    origin: "Curcuma Longa Root",
    flavor: "Earthy & Warm",
    image: "/images/ingredients/turmeric.jpg",
    color: "#D6A536",
    hasImage: true,
  },
  {
    id: 4,
    name: "Black Salt",
    hindi: "काला नमक",
    benefit: "Balances electrolytes, aids acid reflux",
    origin: "Kala Namak",
    flavor: "Sulphuric & Savory",
    image: "/images/ingredients/black_salt.jpg",
    color: "#5A3A28",
    hasImage: true,
  },
  {
    id: 5,
    name: "Heeng",
    hindi: "हींग",
    benefit: "Powerful anti-flatulence & gut enzyme activator",
    origin: "Asafoetida Resin",
    flavor: "Pungent & Umami",
    image: "/images/ingredients/heeng.jpg",
    color: "#C1683A",
    hasImage: true,
  },
  {
    id: 6,
    name: "Black Pepper",
    hindi: "काली मिर्च",
    benefit: "Enhances absorption of all other nutrients",
    origin: "Piper Nigrum",
    flavor: "Sharp & Spicy",
    image: "/images/ingredients/black_pepper.jpg",
    color: "#2E1D14",
    hasImage: true,
  },
  {
    id: 7,
    name: "Dry Ginger",
    hindi: "सोंठ",
    benefit: "Powerful digestive stimulant & warming herb",
    origin: "Saunth",
    flavor: "Warm & Spicy",
    image: "/images/ingredients/ginger.jpg",
    color: "#C9A66B",
    hasImage: true,
  },
  {
    id: 8,
    name: "Mustard Oil",
    hindi: "सरसों तेल",
    benefit: "Activates herbal compounds, antimicrobial",
    origin: "Cold-Pressed Sarson",
    flavor: "Pungent & Nutty",
    image: "/images/ingredients/mustard_oil.jpg",
    color: "#D4A017",
    hasImage: true,
  },
  {
    id: 9,
    name: "Clove",
    hindi: "लौंग",
    benefit: "Natural analgesic, kills gut bacteria",
    origin: "Syzygium Aromaticum",
    flavor: "Intense & Sweet",
    image: "/images/ingredients/clove.jpg",
    color: "#5A3A28",
    hasImage: true,
  },
  {
    id: 10,
    name: "Cinnamon",
    hindi: "दालचीनी",
    benefit: "Regulates blood sugar, warms digestion",
    origin: "Ceylon Dalchini",
    flavor: "Sweet & Woody",
    image: "/images/ingredients/cinnamon.jpg",
    color: "#A85C32",
    hasImage: true,
  },
  {
    id: 11,
    name: "Cardamom",
    hindi: "इलाइची",
    benefit: "Freshens breath, soothes stomach lining",
    origin: "Green Elaichi",
    flavor: "Floral & Sweet",
    image: "/images/ingredients/cardamom.jpg",
    color: "#5D7A4A",
    hasImage: true,
  },
];

const ITEM_WIDTH = 320;
const GAP = 24;

export default function IngredientsGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalDistance = (ingredients.length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <section id="ingredients" className="bg-dark-coffee py-0">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <span className="text-xs tracking-widest text-muted-gold font-bold uppercase font-sans">
          The Ayurvedic Formula
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-warm-white font-bold mt-3 mb-4">
          12 Hand-Ground Ingredients
        </h2>
        <p className="text-sm text-warm-white/60 font-sans max-w-lg mx-auto">
          Scroll to explore every herb that makes Buknu a potent digestive blend. Stone-ground in small batches to preserve every volatile healing oil.
        </p>
        <div className="text-warm-white/40 text-xs mt-4 font-sans flex items-center justify-center gap-2 animate-bounce">
          <span>Scroll to explore</span>
          <span>→</span>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div ref={containerRef} style={{ height: `${ingredients.length * 120}vh` }} className="relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            className="flex"
            style={{ x, gap: GAP, paddingLeft: "10vw", willChange: "transform" }}
          >
            {ingredients.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 rounded-2xl overflow-hidden relative"
                style={{ width: ITEM_WIDTH, height: 460, backgroundColor: item.color }}
              >
                {/* Real image or gradient background */}
                {item.hasImage && item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover opacity-60"
                    sizes="320px"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-7xl opacity-25 select-none"
                    style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)` }}
                  >
                    {(item as any).emoji}
                  </div>
                )}

                {/* Dark gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Number */}
                <div className="absolute top-8 left-8 font-mono text-xs text-white/50 tracking-widest z-10">
                  {String(item.id).padStart(2, "0")} / {String(ingredients.length).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <p className="text-white/60 text-xs font-sans mb-1 tracking-wider">{item.origin}</p>
                  <h3 className="font-serif text-2xl text-white font-bold mb-1">{item.name}</h3>
                  <p className="text-white/60 text-xs font-sans mb-4">{item.hindi}</p>

                  <div className="space-y-2 border-t border-white/20 pt-4">
                    <div className="flex justify-between text-xs font-sans">
                      <span className="text-white/50">Flavor</span>
                      <span className="text-white font-semibold">{item.flavor}</span>
                    </div>
                    <p className="text-white/80 text-xs font-sans leading-relaxed">{item.benefit}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
