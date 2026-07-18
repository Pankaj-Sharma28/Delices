"use client";

import Image from "next/image";
import { useState } from "react";
import { Product, ProductVariant } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { formatPrice } from "@/lib/utils";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.includes(product.id);

  // Default to standard 100g size (index 1) or first variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[1] || product.variants[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        variantName: selectedVariant.name,
        price: selectedVariant.price,
        weight: selectedVariant.weight,
        image: product.image,
        quantity: quantity,
      })
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product.id));
  };

  return (
    <div className="bg-warm-white border border-brown/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row max-w-4xl mx-auto my-8">
      {/* Product Image Panel */}
      <div className="md:w-1/2 relative bg-cream flex items-center justify-center p-6 md:p-8 min-h-[300px]">
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain rounded-xl"
            sizes="(max-w-768px) 100vw, 50vw"
            priority
          />
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 bg-white/85 p-2.5 rounded-full shadow-sm hover:bg-white text-brown transition-colors cursor-not-allowed opacity-50"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-5 h-5 ${isWishlisted ? "fill-terracotta text-terracotta" : ""}`}
          />
        </button>
      </div>

      {/* Details & Actions Panel */}
      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <span className="text-[11px] tracking-widest text-cinnamon font-semibold uppercase font-sans">
              Traditional Heritage · Ayurvedic
            </span>
            <div className="flex items-center space-x-1 text-mustard">
              <span className="text-sm font-bold font-sans">★</span>
              <span className="text-xs font-semibold text-dark-coffee font-sans">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>
          
          <h2 className="font-serif text-lg md:text-xl text-brown font-bold tracking-tight mb-3">
            {product.name}
          </h2>

          <p className="text-sm text-dark-coffee/85 font-sans mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Pricing & Variants */}
          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-xs text-dark-coffee/60 font-semibold font-sans uppercase">
                Select Size
              </span>
              <span className="text-xl font-serif text-cinnamon font-bold">
                {formatPrice(selectedVariant.price)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    selectedVariant.id === v.id
                      ? "border-cinnamon bg-cream text-brown font-semibold shadow-sm"
                      : "border-brown/10 hover:border-brown/30 bg-transparent text-dark-coffee"
                  }`}
                >
                  <div className="text-xs md:text-sm font-semibold">{v.weight}</div>
                  <div className="text-[10px] text-dark-coffee/70">{formatPrice(v.price)}</div>
                </button>
              ))}
            </div>
            
            <p className="text-[11px] text-dark-coffee/70 italic mt-2 font-sans">
              {selectedVariant.description}
            </p>
          </div>
        </div>

        {/* Quantity & CTA */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-xs text-dark-coffee/60 font-semibold font-sans uppercase">
              Quantity
            </span>
            <div className="flex items-center border border-brown/20 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 hover:bg-cream text-brown font-bold font-sans transition-colors"
              >
                -
              </button>
              <span className="px-4 py-1.5 text-sm font-semibold text-dark-coffee font-sans min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 hover:bg-cream text-brown font-bold font-sans transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-brown hover:bg-dark-coffee text-cream py-3 rounded-xl font-sans text-sm font-semibold tracking-wide transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            
            <button
              onClick={handleBuyNow}
              className="w-full bg-cinnamon hover:bg-terracotta text-white py-3 rounded-xl font-sans text-sm font-semibold tracking-wide transition-colors flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
