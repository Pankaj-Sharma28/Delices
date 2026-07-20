"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { saveShippingAddress, completeCheckout } from "@/store/checkoutSlice";
import { clearCart } from "@/store/cartSlice";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { ShieldCheck, CreditCard, Banknote } from "lucide-react";

const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian phone number"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
  postalCode: z.string().regex(/^\d{6}$/, "Must be a valid 6-digit PIN code"),
  country: z.string().min(2, "Country required"),
  paymentMethod: z.enum(["cod", "razorpay"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

// Load Razorpay script dynamically
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { items: cartItems, totalAmount } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (cartItems.length === 0) router.push("/cart");
  }, [cartItems, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { country: "India", paymentMethod: "cod" },
  });

  const selectedPayment = watch("paymentMethod");

  const finalizeOrder = (data: CheckoutFormValues) => {
    dispatch(saveShippingAddress({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      country: data.country,
    }));
    dispatch(completeCheckout());
    dispatch(clearCart());
    router.push("/order-confirmation");
  };

  const handleRazorpay = async (data: CheckoutFormValues) => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Step 1: Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setPaymentError("Failed to load payment gateway. Please try COD or refresh.");
        setIsProcessing(false);
        return;
      }

      // Step 2: Create Razorpay order on server
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const orderData = await res.json();

      if (!res.ok || !orderData.orderId) {
        setPaymentError(orderData.error || "Failed to create payment order. Use COD instead.");
        setIsProcessing(false);
        return;
      }

      // Step 3: Open Razorpay checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Délices Artisan Spices",
        description: "Delice Ayurvedic Digestive Spice",
        order_id: orderData.orderId,
        prefill: {
          name: data.fullName,
          email: data.email,
          contact: `+91${data.phone}`,
        },
        theme: { color: "#A85C32" },
        handler: async (response: any) => {
          // Step 4: Verify payment server-side
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            finalizeOrder(data);
          } else {
            setPaymentError("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: any) => {
        setPaymentError(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      rzp.open();
    } catch {
      setPaymentError("Something went wrong. Please try Cash on Delivery.");
      setIsProcessing(false);
    }
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (data.paymentMethod === "razorpay") {
      await handleRazorpay(data);
    } else {
      finalizeOrder(data);
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <h1 className="font-serif text-2xl md:text-3xl text-brown font-bold mb-2">Checkout</h1>
        <p className="text-xs text-dark-coffee/60 font-sans mb-8 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-olive" /> Secure · SSL Encrypted · Zero-Risk COD
        </p>

        {paymentError && (
          <div className="mb-6 bg-terracotta/10 border border-terracotta/30 text-terracotta text-sm font-sans px-4 py-3 rounded-xl">
            {paymentError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 bg-warm-white border border-brown/10 rounded-2xl p-6 md:p-8 space-y-5">
            <h2 className="font-serif text-lg text-brown font-bold border-b border-brown/10 pb-3">
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5">Full Name</label>
                <input type="text" {...register("fullName")} className="w-full bg-white border border-brown/20 rounded-lg p-3 text-sm font-sans focus:outline-none focus:border-cinnamon" placeholder="Rahul Sharma" />
                {errors.fullName && <p className="text-xs text-terracotta mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5">Email Address</label>
                <input type="email" {...register("email")} className="w-full bg-white border border-brown/20 rounded-lg p-3 text-sm font-sans focus:outline-none focus:border-cinnamon" placeholder="rahul@example.com" />
                {errors.email && <p className="text-xs text-terracotta mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5">Phone Number</label>
              <input type="text" {...register("phone")} className="w-full bg-white border border-brown/20 rounded-lg p-3 text-sm font-sans focus:outline-none focus:border-cinnamon" placeholder="10-digit mobile number" />
              {errors.phone && <p className="text-xs text-terracotta mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5">Address Line 1</label>
              <input type="text" {...register("addressLine1")} className="w-full bg-white border border-brown/20 rounded-lg p-3 text-sm font-sans focus:outline-none focus:border-cinnamon" placeholder="House/Flat No., Street, Colony" />
              {errors.addressLine1 && <p className="text-xs text-terracotta mt-1">{errors.addressLine1.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5">Address Line 2 (Optional)</label>
              <input type="text" {...register("addressLine2")} className="w-full bg-white border border-brown/20 rounded-lg p-3 text-sm font-sans focus:outline-none focus:border-cinnamon" placeholder="Apartment, floor, landmark" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5">City</label>
                <input type="text" {...register("city")} className="w-full bg-white border border-brown/20 rounded-lg p-3 text-sm font-sans focus:outline-none focus:border-cinnamon" />
                {errors.city && <p className="text-xs text-terracotta mt-1">{errors.city.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5">State</label>
                <input type="text" {...register("state")} className="w-full bg-white border border-brown/20 rounded-lg p-3 text-sm font-sans focus:outline-none focus:border-cinnamon" placeholder="Uttar Pradesh" />
                {errors.state && <p className="text-xs text-terracotta mt-1">{errors.state.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5">PIN Code</label>
                <input type="text" {...register("postalCode")} className="w-full bg-white border border-brown/20 rounded-lg p-3 text-sm font-sans focus:outline-none focus:border-cinnamon" placeholder="6-digit PIN" />
                {errors.postalCode && <p className="text-xs text-terracotta mt-1">{errors.postalCode.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-dark-coffee/60 mb-1.5">Country</label>
                <input type="text" {...register("country")} readOnly className="w-full bg-gray-50 border border-brown/20 rounded-lg p-3 text-sm font-sans" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-4 border-t border-brown/10 space-y-3">
              <h3 className="font-serif text-base text-brown font-bold">Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer bg-white transition-colors ${selectedPayment === "cod" ? "border-cinnamon" : "border-brown/20"}`}>
                  <input type="radio" value="cod" {...register("paymentMethod")} className="accent-cinnamon mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-brown" />
                      <span className="text-sm font-semibold text-dark-coffee font-sans">Cash on Delivery</span>
                    </div>
                    <span className="text-xs text-dark-coffee/60 font-sans block mt-0.5">Pay with cash when you receive your package</span>
                  </div>
                </label>

                <label className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer bg-white transition-colors ${selectedPayment === "razorpay" ? "border-cinnamon" : "border-brown/20"}`}>
                  <input type="radio" value="razorpay" {...register("paymentMethod")} className="accent-cinnamon mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-brown" />
                      <span className="text-sm font-semibold text-dark-coffee font-sans">Pay Online</span>
                    </div>
                    <span className="text-xs text-dark-coffee/60 font-sans block mt-0.5">UPI · Cards · Net Banking via Razorpay</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-cream border border-brown/10 rounded-2xl p-6 md:p-8 h-fit shadow-sm space-y-5">
            <h2 className="font-serif text-lg text-brown font-bold border-b border-brown/10 pb-3">
              Order Summary
            </h2>

            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.variantId}`} className="flex items-center gap-3 text-sm">
                  <div className="relative w-10 h-10 bg-white rounded overflow-hidden flex-shrink-0 border border-brown/5">
                    <Image src={item.image} alt={item.name} fill className="object-contain" sizes="40px" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <span className="block font-serif text-xs font-bold text-brown truncate">{item.name}</span>
                    <span className="block text-[10px] text-dark-coffee/60 font-sans">{item.weight} × {item.quantity}</span>
                  </div>
                  <span className="text-xs font-semibold text-cinnamon font-sans flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-brown/10 pt-4 space-y-2 font-sans text-sm">
              <div className="flex justify-between text-dark-coffee/70">
                <span>Subtotal</span><span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-dark-coffee/70">
                <span>Shipping</span><span className="text-olive font-semibold">Free</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-brown/10">
                <span className="font-serif text-base text-brown font-bold">Total</span>
                <span className="text-lg font-serif text-cinnamon font-bold">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-cinnamon hover:bg-terracotta text-white py-3.5 rounded-xl font-sans text-sm font-semibold tracking-wide transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                selectedPayment === "razorpay" ? (
                  <><CreditCard className="w-4 h-4" /> Pay {formatPrice(totalAmount)} via Razorpay</>
                ) : (
                  "Place COD Order"
                )
              )}
            </button>

            <p className="text-[10px] text-dark-coffee/50 font-sans text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Secure & encrypted payment
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
