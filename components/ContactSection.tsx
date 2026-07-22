"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

// Inline SVG for Instagram (removed from lucide-react v0.276+)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const WHATSAPP_NUMBER = "917428258845";
const INSTAGRAM_URL = "https://instagram.com/delices.artisanspices"; // Replace with real Instagram handle
const PHONE = "+91 74282 58845";
const EMAIL = "hellop@thedelice.in";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const contactItems = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp Us",
      value: PHONE,
      sub: "Mon – Sat · 9am to 6pm IST",
      color: "bg-green-50 text-green-700 border-green-100",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Delices!%20I'd%20like%20to%20order%20Delice.`,
    },
    {
      icon: <InstagramIcon className="w-5 h-5" />,
      label: "Instagram",
      value: "@delices.artisanspices",
      sub: "DMs open · Follow for updates",
      color: "bg-pink-50 text-pink-700 border-pink-100",
      href: INSTAGRAM_URL,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Call Us",
      value: PHONE,
      sub: "Business hours only",
      color: "bg-blue-50 text-blue-700 border-blue-100",
      href: `tel:${PHONE.replace(/\s/g, "")}`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email Us",
      value: EMAIL,
      sub: "We reply within 24 hours",
      color: "bg-orange-50 text-orange-700 border-orange-100",
      href: `mailto:${EMAIL}`,
    },
  ];

  return (
    <section ref={ref} id="contact" className="py-24 px-6 bg-warm-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            className="block text-xs tracking-widest text-cinnamon font-bold uppercase font-sans mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.span>
          <motion.h2
            className="font-serif text-3xl md:text-4xl text-brown font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            className="text-sm text-dark-coffee/70 font-sans max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Questions about your order, bulk pricing, or gifting? We're always happy to help.
          </motion.p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {contactItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-start gap-4 p-5 rounded-2xl border bg-white hover:shadow-md transition-all group`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <span className={`p-2.5 rounded-xl border ${item.color} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </span>
              <div>
                <span className="block text-[10px] tracking-widest font-bold uppercase text-dark-coffee/50 font-sans mb-0.5">
                  {item.label}
                </span>
                <span className="block text-sm font-semibold text-dark-coffee font-sans">
                  {item.value}
                </span>
                <span className="block text-xs text-dark-coffee/60 font-sans mt-0.5">
                  {item.sub}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Address Block */}
        <motion.div
          className="bg-cream rounded-2xl border border-brown/10 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex-shrink-0 bg-cinnamon/10 p-3 rounded-xl text-cinnamon">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="block text-[10px] tracking-widest font-bold uppercase text-cinnamon font-sans">
              Our Kitchen / Warehouse Address
            </span>
            <h3 className="font-serif text-lg text-brown font-bold">Delices Artisan Spices</h3>
            <p className="text-sm text-dark-coffee/80 font-sans">
              Kanpur, Uttar Pradesh — 208001<br />
              North India 🇮🇳
            </p>
            <p className="text-xs text-dark-coffee/60 font-sans pt-1 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Pickup by appointment only. Orders dispatched Mon–Sat.
            </p>
          </div>

          {/* Google Maps link */}
          <a
            href="https://maps.google.com/?q=Kanpur,Uttar+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            className="md:ml-auto flex-shrink-0 bg-white border border-brown/15 hover:border-cinnamon text-dark-coffee text-xs font-semibold font-sans px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2"
          >
            <MapPin className="w-3.5 h-3.5 text-cinnamon" />
            View on Map
          </a>
        </motion.div>
      </div>
    </section>
  );
}
