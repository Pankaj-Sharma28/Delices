"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const timeline = [
  {
    year: "Ancient",
    title: "Vedic Origins",
    description: "Buknu's roots trace back to Ayurvedic texts where combinations of spices were prescribed as digestive aids for warriors and scholars.",
  },
  {
    year: "500+ yrs",
    title: "Kanpur Tradition",
    description: "Local families in Kanpur, Uttar Pradesh developed their own Buknu formulas, passed down through generations in clay pots and copper vessels.",
  },
  {
    year: "Today",
    title: "Our Small Batch",
    description: "We honor that tradition. Stone-ground fresh weekly in our Kanpur facility using sourced organic herbs with cold-pressed mustard oil.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Label */}
      <motion.span
        className="block text-xs tracking-widest text-cinnamon font-bold uppercase font-sans mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Our Story
      </motion.span>

      {/* Headline */}
      <motion.h2
        className="font-serif text-3xl md:text-4xl text-brown font-bold text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Where Tradition Meets Flavour
      </motion.h2>

      <motion.p
        className="text-sm md:text-base text-dark-coffee/80 font-sans max-w-2xl mx-auto text-center leading-relaxed mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Delices was born from a desire to preserve Kanpur&apos;s most treasured digestive spice blend. Buknu has been our city&apos;s gut-health secret for centuries — we&apos;ve simply made it easier to enjoy every day.
      </motion.p>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        {/* Image + Reviews Card */}
        <motion.div
          className="relative h-72 md:h-96 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Image
            src="/images/buknu-jar.jpg"
            alt="Delices Buknu artisan spice jar"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-coffee/50 to-transparent" />

          {/* Kanpur label — kept intentionally in About */}
          <div className="absolute bottom-6 left-6 text-warm-white">
            <span className="block text-[10px] tracking-widest uppercase font-sans font-bold text-muted-gold">Kanpur, Uttar Pradesh</span>
            <span className="font-serif text-lg font-bold">Small-Batch Crafted</span>
          </div>

          {/* Reviews card — moved from hero banner */}
          <motion.div
            className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-brown/10 px-4 py-3 flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex text-mustard">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-mustard" />
              ))}
            </div>
            <div>
              <span className="block text-xs font-bold text-dark-coffee font-sans">4.9 / 5.0</span>
              <span className="block text-[10px] text-dark-coffee/60 font-sans">148 verified reviews</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Story text */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-dark-coffee/85 font-sans text-sm md:text-base leading-relaxed">
            Buknu is not just a spice — it&apos;s a ritual. For generations, Kanpur families would sprinkle it on ghee-soaked parathas, on sliced raw mangoes, on curd, and on fresh salads. It became synonymous with the city&apos;s culinary identity.
          </p>
          <p className="text-dark-coffee/80 font-sans text-sm md:text-base leading-relaxed">
            At Delices, we source each of our 12 herbs directly from trusted UP and North India farmers. We stone-grind them in copper-lined vessels and toast the blend in cold-pressed mustard oil — the same method our grandmothers used. No shortcuts. No fillers.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="h-px flex-1 bg-brown/15" />
            <span className="text-[10px] text-brown/60 tracking-widest uppercase font-sans font-bold">Est. Kanpur</span>
            <div className="h-px flex-1 bg-brown/15" />
          </div>
        </motion.div>
      </div>

      {/* Heritage Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className="bg-cream rounded-2xl p-6 border border-brown/10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
          >
            <span className="block font-mono text-xs text-cinnamon font-bold mb-2 tracking-wider">{item.year}</span>
            <h3 className="font-serif text-lg text-brown font-bold mb-3">{item.title}</h3>
            <p className="text-xs text-dark-coffee/75 font-sans leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
