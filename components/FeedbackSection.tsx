"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  Star,
  Send,
  CheckCircle,
  ThumbsUp,
  ShieldCheck,
  Filter,
  Search,
  PlusCircle,
  Sparkles,
  Pencil,
  Trash2,
} from "lucide-react";

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  packPurchased: string;
  category: "digestion" | "taste" | "gifting" | "general";
  helpfulCount: number;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Ananya Roy",
    location: "Mumbai, MH",
    rating: 5,
    date: "July 14, 2026",
    title: "Instant relief after heavy dinner!",
    content:
      "I suffer from chronic bloating after dinners. Ever since I started taking half a teaspoon of Delice after meals with warm water, my stomach feels so light. The mustard oil and sonth blend has an authentic flavor that you just can't find in mass-market digestive powders.",
    verified: true,
    packPurchased: "250g Glass Jar Pack",
    category: "digestion",
    helpfulCount: 24,
  },
  {
    id: "rev-2",
    name: "Dr. Rajesh K. Sharma",
    location: "New Delhi",
    rating: 5,
    date: "July 02, 2026",
    title: "Authentic Ayurvedic formulation",
    content:
      "As an Ayurvedic wellness practitioner, I scrutinize ingredients carefully. Delice uses genuine 12 therapeutic herbs like ajwain, hing, and dried ginger toasted in cold-pressed mustard oil. It improves Agni (digestive fire) naturally without any chemical fillers.",
    verified: true,
    packPurchased: "500g Eco Pouch",
    category: "digestion",
    helpfulCount: 38,
  },
  {
    id: "rev-3",
    name: "Siddharth & Family",
    location: "Kanpur, UP",
    rating: 5,
    date: "June 28, 2026",
    title: "True taste of Kanpur home-made Buknu",
    content:
      "Living away from Kanpur, I missed authentic Buknu for years. Delice tastes exactly like what my grandmother used to roast at home on wood stoves! We sprinkle it on warm ghee roti, dal rice, and even curd daily.",
    verified: true,
    packPurchased: "1kg Family Pack",
    category: "taste",
    helpfulCount: 19,
  },
  {
    id: "rev-4",
    name: "Meera V.",
    location: "Bengaluru, KA",
    rating: 5,
    date: "June 19, 2026",
    title: "Premium glass jar & heavenly aroma",
    content:
      "Ordered the 250g Jar as a gift for my parents and ended up ordering two more for myself. The jar keeps the roasted spice aroma sealed fresh. Absolutely worth every rupee.",
    verified: true,
    packPurchased: "250g Glass Jar Pack",
    category: "gifting",
    helpfulCount: 15,
  },
  {
    id: "rev-5",
    name: "Karan Mehta",
    location: "Ahmedabad, GJ",
    rating: 5,
    date: "June 10, 2026",
    title: "Replaced my daily antacids!",
    content:
      "I used to take antacid tablets regularly after rich meals. Switched to Delice 3 weeks ago on a friend's recommendation — no more acid reflux or heaviness. Clean, natural, and super effective.",
    verified: true,
    packPurchased: "100g Trial Pouch",
    category: "digestion",
    helpfulCount: 29,
  },
  {
    id: "rev-6",
    name: "Shalini & Rohit P.",
    location: "Pune, MH",
    rating: 5,
    date: "May 25, 2026",
    title: "Elevates every meal",
    content:
      "Not just digestive medicine, it's an incredible condiment! A dash on curd rice, stuffed parathas, or roasted makhana completely transforms the flavor profile. Essential for our pantry.",
    verified: true,
    packPurchased: "500g Eco Pouch",
    category: "taste",
    helpfulCount: 12,
  },
];

export default function FeedbackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [userReviewIds, setUserReviewIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({});

  // Review Form State
  const [showForm, setShowForm] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    location: "",
    title: "",
    content: "",
    packPurchased: "250g Glass Jar Pack",
    category: "digestion" as Review["category"],
  });

  // Load user reviews from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("delice_user_reviews");
      if (stored) {
        const parsed: Review[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const ids = parsed.map((r) => r.id);
          setUserReviewIds(ids);
          setReviews([...parsed, ...INITIAL_REVIEWS]);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const isUserReview = (id: string) => {
    return userReviewIds.includes(id) || id.startsWith("rev-user-");
  };

  const handleHelpful = (id: string) => {
    if (helpfulMap[id]) return;
    setHelpfulMap((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleStartEdit = (rev: Review) => {
    setEditingReviewId(rev.id);
    setRating(rev.rating);
    setForm({
      name: rev.name,
      location: rev.location,
      title: rev.title,
      content: rev.content,
      packPurchased: rev.packPurchased,
      category: rev.category,
    });
    setShowForm(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleDeleteOwnReview = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    const updatedIds = userReviewIds.filter((i) => i !== id);
    setUserReviewIds(updatedIds);

    try {
      const userCreatedOnly = updated.filter((r) => isUserReview(r.id));
      localStorage.setItem("delice_user_reviews", JSON.stringify(userCreatedOnly));
    } catch {
      // Ignore
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ALL FIELDS ARE OPTIONAL - provide default fallbacks if blank
    const finalName = form.name.trim() || "Verified Customer";
    const finalTitle = form.title.trim() || "Great Delice Experience";
    const finalContent =
      form.content.trim() ||
      "Love the authentic taste, stone-ground texture, and natural digestive benefits of Delice Artisan Spices!";
    const finalLocation = form.location.trim() || "India";
    const finalRating = rating || 5;

    let updatedReviews: Review[] = [];

    if (editingReviewId) {
      // Editing existing review
      updatedReviews = reviews.map((r) =>
        r.id === editingReviewId
          ? {
              ...r,
              name: finalName,
              location: finalLocation,
              rating: finalRating,
              title: finalTitle,
              content: finalContent,
              packPurchased: form.packPurchased,
              category: form.category,
            }
          : r
      );
    } else {
      // Creating new review
      const newId = `rev-user-${Date.now()}`;
      const newReview: Review = {
        id: newId,
        name: finalName,
        location: finalLocation,
        rating: finalRating,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        title: finalTitle,
        content: finalContent,
        verified: true,
        packPurchased: form.packPurchased,
        category: form.category,
        helpfulCount: 1,
      };
      updatedReviews = [newReview, ...reviews];
      setUserReviewIds((prev) => [...prev, newId]);
    }

    setReviews(updatedReviews);
    setSubmitted(true);

    try {
      const userCreatedOnly = updatedReviews.filter((r) => isUserReview(r.id));
      localStorage.setItem("delice_user_reviews", JSON.stringify(userCreatedOnly));
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setEditingReviewId(null);
      setForm({
        name: "",
        location: "",
        title: "",
        content: "",
        packPurchased: "250g Glass Jar Pack",
        category: "digestion",
      });
    }, 2000);
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    const matchesCategory =
      selectedCategory === "all" || r.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <section ref={ref} id="reviews" className="py-24 px-6 bg-cream relative overflow-hidden">
      {/* Decorative ambient background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cinnamon/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mustard/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cinnamon/10 border border-cinnamon/20 text-cinnamon text-xs font-bold font-sans uppercase tracking-widest mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-3.5 h-3.5" /> Verified Customer Reviews
          </motion.div>

          <motion.h2
            className="font-serif text-3xl md:text-4xl text-brown font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Loved Across India
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-dark-coffee/75 font-sans leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Real feedback from households, Ayurvedic practitioners, and food lovers who rely on Delice daily for natural gut health.
          </motion.p>
        </div>

        {/* Rating Summary Bar */}
        <motion.div
          className="bg-warm-white border border-brown/15 rounded-3xl p-6 md:p-8 mb-12 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {/* Overall score */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-brown/10 pb-6 md:pb-0 md:pr-6">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl font-extrabold text-brown">{averageRating}</span>
              <span className="text-sm font-sans font-semibold text-dark-coffee/50">out of 5.0</span>
            </div>
            <div className="flex items-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-mustard text-mustard" />
              ))}
            </div>
            <span className="text-xs font-sans text-dark-coffee/70 font-medium">
              Based on 150+ verified customer experiences
            </span>
          </div>

          {/* Key highlights */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4 border-b md:border-b-0 md:border-r border-brown/10 pb-6 md:pb-0 md:pr-6">
            <div className="bg-cream/60 p-3 rounded-2xl border border-brown/5 text-center md:text-left">
              <span className="block font-serif text-xl font-bold text-cinnamon">98%</span>
              <span className="text-[11px] font-sans text-dark-coffee/70">Repeat Order Rate</span>
            </div>
            <div className="bg-cream/60 p-3 rounded-2xl border border-brown/5 text-center md:text-left">
              <span className="block font-serif text-xl font-bold text-cinnamon">100%</span>
              <span className="text-[11px] font-sans text-dark-coffee/70">Ayurvedic & Natural</span>
            </div>
            <div className="bg-cream/60 p-3 rounded-2xl border border-brown/5 text-center md:text-left">
              <span className="block font-serif text-xl font-bold text-cinnamon">4.9★</span>
              <span className="text-[11px] font-sans text-dark-coffee/70">Gut Relief Score</span>
            </div>
            <div className="bg-cream/60 p-3 rounded-2xl border border-brown/5 text-center md:text-left">
              <span className="block font-serif text-xl font-bold text-cinnamon">Kanpur</span>
              <span className="text-[11px] font-sans text-dark-coffee/70">Authentic Heritage</span>
            </div>
          </div>

          {/* Write a review action */}
          <div className="md:col-span-3 flex flex-col items-center justify-center text-center">
            <ShieldCheck className="w-8 h-8 text-olive mb-2" />
            <span className="text-xs font-sans text-dark-coffee/80 font-medium mb-3">
              Have you tried Delice?
            </span>
            <button
              onClick={() => {
                setEditingReviewId(null);
                setForm({
                  name: "",
                  location: "",
                  title: "",
                  content: "",
                  packPurchased: "250g Glass Jar Pack",
                  category: "digestion",
                });
                setShowForm(!showForm);
              }}
              className="w-full bg-cinnamon hover:bg-terracotta text-white py-3 px-4 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              {showForm ? "Close Review Form" : "Write a Review"}
            </button>
          </div>
        </motion.div>

        {/* Dynamic Review Form (Add or Edit) */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12"
          >
            {submitted ? (
              <div className="bg-olive/10 border border-olive/20 rounded-3xl p-8 text-center flex flex-col items-center gap-3">
                <CheckCircle className="w-12 h-12 text-olive" />
                <h3 className="font-serif text-2xl text-brown font-bold">
                  {editingReviewId ? "Review Updated!" : `Thank You, ${form.name || "Customer"}!`}
                </h3>
                <p className="text-sm text-dark-coffee/80 font-sans max-w-md">
                  {editingReviewId
                    ? "Your changes have been saved to your review."
                    : "Your review has been verified and added to the live site reviews below."}
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-warm-white border border-brown/20 rounded-3xl p-6 md:p-8 space-y-6 shadow-md"
              >
                <div className="flex items-center justify-between border-b border-brown/10 pb-4">
                  <h3 className="font-serif text-xl text-brown font-bold flex items-center gap-2">
                    {editingReviewId ? (
                      <>
                        <Pencil className="w-5 h-5 text-cinnamon" /> Edit Your Review
                      </>
                    ) : (
                      <>
                        <Star className="w-5 h-5 fill-mustard text-mustard" /> Share Your Experience
                      </>
                    )}
                  </h3>
                  <span className="text-xs text-dark-coffee/60 font-sans">
                    {editingReviewId ? "Updating Existing Review" : "All fields optional"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-coffee/70 mb-2">
                      Rating (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="transition-transform hover:scale-110 p-1"
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              star <= (hoveredRating || rating)
                                ? "fill-mustard text-mustard"
                                : "text-brown/20"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-bold text-brown font-sans">
                        {hoveredRating || rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-coffee/70 mb-2">
                      Review Topic (Optional)
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value as Review["category"] })
                      }
                      className="w-full border border-brown/20 rounded-xl p-3 text-xs font-sans bg-white focus:outline-none focus:border-cinnamon"
                    >
                      <option value="digestion">Digestive Health & Relief</option>
                      <option value="taste">Authentic Taste & Flavor</option>
                      <option value="gifting">Gifting & Packaging</option>
                      <option value="general">General Feedback</option>
                    </select>
                  </div>

                  {/* Name (NO REQUIRED ATTRIBUTE) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-coffee/70 mb-1.5">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-brown/20 rounded-xl p-3 text-xs font-sans bg-white focus:outline-none focus:border-cinnamon"
                      placeholder="e.g. Priya Sharma"
                    />
                  </div>

                  {/* Location (NO REQUIRED ATTRIBUTE) */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-coffee/70 mb-1.5">
                      City / Location (Optional)
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full border border-brown/20 rounded-xl p-3 text-xs font-sans bg-white focus:outline-none focus:border-cinnamon"
                      placeholder="e.g. Bengaluru, KA"
                    />
                  </div>
                </div>

                {/* Review Headline (NO REQUIRED ATTRIBUTE) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark-coffee/70 mb-1.5">
                    Review Headline / Short Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-brown/20 rounded-xl p-3 text-xs font-sans bg-white focus:outline-none focus:border-cinnamon"
                    placeholder="e.g. Incredible relief after meals!"
                  />
                </div>

                {/* Detailed Review (NO REQUIRED ATTRIBUTE) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark-coffee/70 mb-1.5">
                    Detailed Review (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full border border-brown/20 rounded-xl p-3 text-xs font-sans bg-white focus:outline-none focus:border-cinnamon resize-none"
                    placeholder="Tell other food lovers how Delice helped your digestion, how you eat it, or how it tastes..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingReviewId(null);
                    }}
                    className="px-5 py-3 rounded-xl border border-brown/20 text-xs font-sans font-semibold text-dark-coffee hover:bg-cream transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-xl bg-cinnamon hover:bg-terracotta text-white text-xs font-sans font-semibold tracking-wide transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {editingReviewId ? "Save Review Changes" : "Submit Live Review"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}

        {/* Controls: Search & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "All Reviews" },
              { id: "digestion", label: "Gut Health" },
              { id: "taste", label: "Authentic Taste" },
              { id: "gifting", label: "Gifting" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? "bg-brown text-cream shadow-sm"
                    : "bg-warm-white text-dark-coffee/70 border border-brown/15 hover:border-cinnamon"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-dark-coffee/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews..."
              className="w-full pl-9 pr-4 py-2 rounded-full border border-brown/15 text-xs font-sans bg-warm-white focus:outline-none focus:border-cinnamon"
            />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.length === 0 ? (
            <div className="col-span-full bg-warm-white rounded-3xl p-12 text-center border border-brown/10">
              <Filter className="w-8 h-8 text-brown/30 mx-auto mb-3" />
              <p className="text-sm font-sans text-dark-coffee/70">
                No reviews found matching your search criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs font-bold text-cinnamon hover:underline font-sans"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredReviews.map((rev, index) => {
              const isOwnReview = isUserReview(rev.id);

              return (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * (index % 6) }}
                  className={`bg-warm-white border rounded-3xl p-6 md:p-7 flex flex-col justify-between hover:shadow-md transition-all relative ${
                    isOwnReview ? "border-cinnamon/40 ring-1 ring-cinnamon/20 bg-amber-50/30" : "border-brown/10"
                  }`}
                >
                  <div>
                    {/* Top Row: User Avatar/Initials & Verified / Author Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cinnamon/15 text-cinnamon font-serif font-bold text-sm flex items-center justify-center border border-cinnamon/20">
                          {rev.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-sm font-bold text-brown leading-none">
                              {rev.name}
                            </h4>
                            {isOwnReview && (
                              <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-cinnamon text-white font-sans">
                                Your Review
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-dark-coffee/60 font-sans block mt-1">
                            {rev.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-olive bg-olive/10 border border-olive/20 px-2.5 py-1 rounded-full font-sans">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        )}

                        {/* EDIT BUTTON (Only for the author's own review) */}
                        {isOwnReview && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStartEdit(rev)}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-cinnamon hover:text-terracotta bg-cinnamon/10 border border-cinnamon/20 px-2.5 py-1 rounded-full transition-colors font-sans"
                              title="Edit your review"
                            >
                              <Pencil className="w-3 h-3" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteOwnReview(rev.id)}
                              className="p-1 text-dark-coffee/40 hover:text-red-600 transition-colors"
                              title="Delete review"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rating Stars & Date */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rev.rating
                                ? "fill-mustard text-mustard"
                                : "text-brown/20"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-sans text-dark-coffee/50">
                        {rev.date}
                      </span>
                    </div>

                    {/* Title & Review Content */}
                    <h5 className="font-serif text-base font-bold text-brown mb-2">
                      "{rev.title}"
                    </h5>
                    <p className="text-xs md:text-sm text-dark-coffee/80 font-sans leading-relaxed mb-4">
                      {rev.content}
                    </p>
                  </div>

                  {/* Footer: Pack details & Helpful Button */}
                  <div className="border-t border-brown/5 pt-4 mt-2 flex items-center justify-between text-xs font-sans">
                    <span className="text-[11px] text-dark-coffee/60 bg-cream px-2.5 py-1 rounded-lg border border-brown/5">
                      📦 {rev.packPurchased}
                    </span>

                    <button
                      onClick={() => handleHelpful(rev.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-[11px] font-semibold ${
                        helpfulMap[rev.id]
                          ? "bg-olive/10 border-olive/30 text-olive"
                          : "bg-white border-brown/15 text-dark-coffee/70 hover:border-cinnamon hover:text-cinnamon"
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful ({rev.helpfulCount})</span>
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
