"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetCheckout } from "@/store/checkoutSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, MapPin, Phone, Mail, ShoppingBag } from "lucide-react";

export default function OrderConfirmationPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { shippingAddress, orderNumber, isCompleted, paymentMethod } = useAppSelector(
    (state) => state.checkout
  );

  // If order is not completed, redirect to home
  useEffect(() => {
    if (!isCompleted) {
      router.push("/");
    }
  }, [isCompleted, router]);

  const handleContinueShopping = () => {
    dispatch(resetCheckout());
  };

  if (!isCompleted || !shippingAddress) {
    return null; // Handled by useEffect redirect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-16 px-4 md:px-8 max-w-3xl mx-auto w-full flex flex-col items-center">
        {/* Success Icon */}
        <div className="text-olive mb-6 flex flex-col items-center">
          <CheckCircle className="w-16 h-16 stroke-[1.5]" />
          <h1 className="font-serif text-2xl md:text-3xl text-brown font-bold mt-4 text-center">
            Thank you for your order!
          </h1>
          <p className="text-sm text-dark-coffee/75 font-sans mt-2 text-center">
            Your order has been placed successfully and is being prepared.
          </p>
        </div>

        {/* Order Details Panel */}
        <div className="bg-warm-white border border-brown/10 rounded-2xl p-6 md:p-8 w-full space-y-6 shadow-sm mb-8">
          <div className="flex justify-between items-center border-b border-brown/10 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-dark-coffee/60 tracking-wider block font-sans">
                Order Number
              </span>
              <span className="font-mono text-base font-bold text-cinnamon">
                {orderNumber}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-dark-coffee/60 tracking-wider block font-sans">
                Payment Mode
              </span>
              <span className="text-sm font-semibold text-dark-coffee uppercase font-sans">
                {paymentMethod === "cod" ? "Cash on Delivery" : "Prepaid"}
              </span>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="space-y-4 font-sans text-sm">
            <h3 className="font-serif text-base text-brown font-bold border-b border-brown/5 pb-2">
              Delivery Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shipping Address */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-dark-coffee/60 tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brown" /> Shipping Address
                </span>
                <div className="text-dark-coffee/85 leading-relaxed pl-5 text-xs md:text-sm">
                  <span className="block font-semibold">{shippingAddress.fullName}</span>
                  <span className="block">{shippingAddress.addressLine1}</span>
                  {shippingAddress.addressLine2 && (
                    <span className="block">{shippingAddress.addressLine2}</span>
                  )}
                  <span className="block">
                    {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.postalCode}
                  </span>
                  <span className="block">{shippingAddress.country}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-dark-coffee/60 tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brown" /> Contact Information
                </span>
                <div className="text-dark-coffee/85 space-y-1 pl-5 text-xs md:text-sm">
                  <p className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-dark-coffee/50" />
                    <span>{shippingAddress.email}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-dark-coffee/50" />
                    <span>+91 {shippingAddress.phone}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping CTA */}
        <Link
          href="/"
          onClick={handleContinueShopping}
          className="bg-brown hover:bg-dark-coffee text-cream px-8 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-colors flex items-center justify-center space-x-2 font-sans shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
