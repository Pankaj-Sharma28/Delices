"use client";

import { motion } from "motion/react";
import Image from "next/image";

const spices = [
  { name: "Amchoor", hindi: "आमचूर", image: "/images/ingredients/amchoor.jpg", color: "#A85C32" },
  { name: "Ajwain", hindi: "अजवाइन", image: "/images/ingredients/ajwain.jpg", color: "#6B7A4F" },
  { name: "Turmeric", hindi: "हल्दी", image: "/images/ingredients/turmeric.jpg", color: "#D6A536" },
  { name: "Black Salt", hindi: "काला नमक", image: "/images/ingredients/black_salt.jpg", color: "#5A3A28" },
  { name: "Heeng", hindi: "हींग", image: "/images/ingredients/heeng.jpg", color: "#C1683A" },
  { name: "Black Pepper", hindi: "काली मिर्च", image: "/images/ingredients/black_pepper.jpg", color: "#2E1D14" },
  { name: "Dry Ginger", hindi: "सोंठ", image: "/images/ingredients/ginger.jpg", color: "#C9A66B" },
  { name: "Mustard Oil", hindi: "सरसों तेल", image: "/images/ingredients/mustard_oil.jpg", color: "#D4A017" },
  { name: "Clove", hindi: "लौंग", image: "/images/ingredients/clove.jpg", color: "#5A3A28" },
  { name: "Cinnamon", hindi: "दालचीनी", image: "/images/ingredients/cinnamon.jpg", color: "#A85C32" },
  { name: "Cardamom", hindi: "इलाइची", image: "/images/ingredients/cardamom.jpg", color: "#5D7A4A" },
];

const CARD_W = 220;
const CARD_H = 150;
const GAP = 14;

// One full row width (11 cards × (220 + 14))
const rowWidth = spices.length * (CARD_W + GAP);

// Duplicate rows for seamless infinite loop
const rowFwd = [...spices, ...spices]; // moves left  →  ← 
const rowRev = [...[...spices].reverse(), ...[...spices].reverse()]; // moves right ←  →

function SpiceCard({ item }: { item: (typeof spices)[0] }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl overflow-hidden relative group cursor-pointer"
      style={{ width: CARD_W, height: CARD_H, backgroundColor: item.color }}
    >
      <Image
        src={item.image}
        alt={item.name}
        fill
        className="object-cover opacity-55 group-hover:opacity-75 transition-opacity duration-500"
        sizes="220px"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      {/* text */}
      <div className="absolute bottom-4 left-4 z-10">
        <p className="text-white font-serif text-sm font-bold leading-tight">{item.name}</p>
        <p className="text-white/55 text-[11px] font-sans mt-0.5">{item.hindi}</p>
      </div>
    </div>
  );
}

export default function IngredientsMarquee() {
  return (
    <section className="bg-dark-coffee py-14 overflow-hidden space-y-3">
      {/* Label */}
      <p className="text-center text-[10px] tracking-[0.3em] text-muted-gold font-bold uppercase font-sans mb-8">
        ✦ All 12 Ingredients ✦
      </p>

      {/* Row 1 — slides LEFT (→ ←) */}
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: [0, -rowWidth] }}
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ gap: GAP }}
        >
          {rowFwd.map((item, i) => (
            <SpiceCard key={`fwd-${i}`} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — slides RIGHT (← →) */}
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: [-rowWidth, 0] }}
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ gap: GAP }}
        >
          {rowRev.map((item, i) => (
            <SpiceCard key={`rev-${i}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
