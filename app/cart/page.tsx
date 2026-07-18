"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateQuantity, removeFromCart } from "@/store/cartSlice";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items: cartItems, totalAmount } = useAppSelector((state) => state.cart);

  const handleQuantityChange = (id: string, variantId: string, quantity: number) => {
    dispatch(updateQuantity({ id, variantId, quantity }));
  };

  const handleRemove = (id: string, variantId: string) => {
    dispatch(removeFromCart({ id, variantId }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h1 className="font-serif text-2xl md:text-3xl text-brown font-bold mb-8">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-warm-white border border-brown/10 rounded-2xl p-12 text-center max-w-lg mx-auto flex flex-col items-center space-y-4">
            <div className="bg-cream p-4 rounded-full text-brown">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-lg md:text-xl text-brown font-bold">
              Your cart is empty
            </h2>
            <p className="text-sm text-dark-coffee/75 font-sans">
              Add Kanpur's traditional Ayurvedic digestive spice blend to your daily wellness routine.
            </p>
            <Link
              href="/product"
              className="bg-cinnamon hover:bg-terracotta text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors font-sans"
            >
              Shop Buknu Spice
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.variantId}`}
                  className="bg-warm-white border border-brown/10 rounded-xl p-4 md:p-6 flex items-center justify-between gap-4 shadow-sm"
                >
                  {/* Item Image */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-cream rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-grow min-w-0">
                    <h3 className="font-serif text-sm md:text-base text-brown font-bold truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-dark-coffee/70 font-sans mt-0.5">
                      Size: {item.weight} ({item.variantName})
                    </p>
                    <span className="text-xs md:text-sm font-sans text-cinnamon font-semibold block mt-1">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <div className="flex items-center border border-brown/20 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.variantId, Math.max(1, item.quantity - 1))
                        }
                        className="px-2 py-1 hover:bg-cream text-brown font-bold font-sans text-xs md:text-sm transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs md:text-sm font-semibold text-dark-coffee font-sans min-w-[30px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.variantId, item.quantity + 1)
                        }
                        className="px-2 py-1 hover:bg-cream text-brown font-bold font-sans text-xs md:text-sm transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Trash Button */}
                    <button
                      onClick={() => handleRemove(item.id, item.variantId)}
                      className="text-brown/60 hover:text-terracotta p-1.5 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Panel */}
            <div className="bg-cream border border-brown/10 rounded-2xl p-6 md:p-8 h-fit shadow-sm">
              <h2 className="font-serif text-lg text-brown font-bold mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm font-sans border-b border-brown/10 pb-4 mb-4">
                <div className="flex justify-between text-dark-coffee/75">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-dark-coffee/75">
                  <span>Shipping</span>
                  <span className="text-olive font-semibold">Free Delivery</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-6">
                <span className="font-serif text-base text-brown font-bold">Total</span>
                <span className="text-xl font-serif text-cinnamon font-bold">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-cinnamon hover:bg-terracotta text-white py-3 rounded-xl font-sans text-sm font-semibold tracking-wide transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-4 text-center">
                <Link
                  href="/product"
                  className="text-xs text-brown/85 hover:text-cinnamon transition-colors font-sans"
                >
                  ← Add more items
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
