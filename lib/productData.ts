import { Product } from "@/types";

export const deliceProduct: Product = {
  id: "delice",
  name: "Artisan Ayurvedic Delice",
  description: "A legendary 12-spice digestive blend. Handcrafted, stone-ground, and infused with cold-pressed mustard oil.",
  longDescription: "Delice is an ancient Ayurvedic spice formulation that doubles as a digestive aid and a delicious seasoning. Originating in Northern India, our family recipe combines twelve handpicked therapeutic spices. Stone-ground in small batches to preserve volatile oils, Delice is toasted in pure cold-pressed mustard oil to activate its digestion-enhancing properties. Perfect as a garnish, it brings a rich, earthy, salty, and tangy complexity to everyday meals.",
  ingredients: [
    "Amchoor (Dry Mango Powder)",
    "Ajwain (Carom Seeds)",
    "Turmeric (Haldi)",
    "Black Salt (Kala Namak)",
    "Heeng (Asafoetida)",
    "Black Pepper (Kali Mirch)",
    "Dry Ginger (Saunth)",
    "Mustard Oil (Sarson Ka Tel)",
    "Clove (Laung)",
    "Cinnamon (Dalchini)",
    "Cardamom (Elaichi)",
    "Saindha Namak (Rock Salt)"
  ],
  benefits: [
    "Aids natural digestion and reduces bloating after meals",
    "Rich in antioxidants and anti-inflammatory Ayurvedic spices",
    "Stimulates digestive enzymes to improve metabolic gut health",
    "Restores flavor balance with a traditional taste profile"
  ],
  image: "/images/delice-logo.png",
  rating: 4.9,
  reviewsCount: 148,
  variants: [
    {
      id: "delice-50g",
      name: "Single Jar (50g)",
      price: 80,
      weight: "50g",
      description: "Perfect introduction to Ayurvedic digestion."
    },
    {
      id: "delice-100g",
      name: "Single Jar (100g)",
      price: 150,
      weight: "100g",
      description: "Standard pantry size for daily family wellness."
    },
    {
      id: "delice-pack-6",
      name: "Family Pack of 6",
      price: 800,
      weight: "600g (6 x 100g)",
      description: "Share the gift of health with loved ones. Save ₹100."
    },
    {
      id: "delice-pack-12",
      name: "Wellness Pack of 12",
      price: 1500,
      weight: "1.2kg (12 x 100g)",
      description: "Bulk pantry stock. Best value, save ₹300."
    }
  ]
};

// Keep backward-compat alias so other imports don't break
export const buknuProduct = deliceProduct;
