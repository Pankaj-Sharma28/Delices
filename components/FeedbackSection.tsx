"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";

export default function FeedbackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !form.name || !form.message) return;
    // In production this would POST to an API
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="feedback" className="py-24 px-6 bg-cream">
      <div className="max-w-2xl mx-auto text-center">
        <motion.span
          className="block text-xs tracking-widest text-cinnamon font-bold uppercase font-sans mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          We'd Love To Hear From You
        </motion.span>
        <motion.h2
          className="font-serif text-3xl text-brown font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Share Your Experience
        </motion.h2>
        <motion.p
          className="text-sm text-dark-coffee/70 font-sans mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Your feedback helps us craft a better Buknu, batch after batch.
        </motion.p>

        {submitted ? (
          <motion.div
            className="bg-olive/10 border border-olive/20 rounded-2xl p-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="w-12 h-12 text-olive" />
            <h3 className="font-serif text-xl text-brown font-bold">Thank you, {form.name}!</h3>
            <p className="text-sm text-dark-coffee/70 font-sans">
              Your review has been received. We read every single one.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-warm-white rounded-2xl border border-brown/10 p-8 text-left space-y-5 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Star Rating */}
            <div>
              <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-3 tracking-wider">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hovered || rating)
                          ? "fill-mustard text-mustard"
                          : "text-brown/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5 tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-brown/20 rounded-lg p-3 text-sm font-sans bg-white focus:outline-none focus:border-cinnamon"
                placeholder="e.g. Priya Sharma"
              />
            </div>

            {/* Review */}
            <div>
              <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5 tracking-wider">
                Your Review
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-brown/20 rounded-lg p-3 text-sm font-sans bg-white focus:outline-none focus:border-cinnamon resize-none"
                placeholder="Tell us about your Buknu experience..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cinnamon hover:bg-terracotta text-white py-3 rounded-xl font-sans text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4" />
              Submit Review
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
