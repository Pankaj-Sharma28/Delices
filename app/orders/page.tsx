"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Package, MapPin, Phone, Mail, Clock, RefreshCw, Banknote, CreditCard, Lock, Key, LogOut } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Check stored passcode on mount
  useEffect(() => {
    const savedKey = sessionStorage.getItem("delice_admin_key");
    if (savedKey) {
      setPasscode(savedKey);
      fetchOrders(savedKey);
    }
  }, []);

  const fetchOrders = async (keyToUse?: string) => {
    const activeKey = keyToUse || passcode;
    if (!activeKey) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/orders?key=${encodeURIComponent(activeKey)}`, {
        headers: { "x-admin-key": activeKey },
      });

      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
        setAuthenticated(true);
        sessionStorage.setItem("delice_admin_key", activeKey);
      } else {
        const err = await res.json();
        setErrorMsg(err.error || "Invalid Admin Passcode");
        setAuthenticated(false);
        sessionStorage.removeItem("delice_admin_key");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setErrorMsg("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(passcode);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("delice_admin_key");
    setAuthenticated(false);
    setOrders([]);
    setPasscode("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {!authenticated ? (
          /* Secure Admin Login Gate */
          <div className="py-16 max-w-md mx-auto">
            <div className="bg-warm-white border border-brown/15 rounded-3xl p-8 shadow-md text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-cinnamon/10 text-cinnamon flex items-center justify-center mx-auto border border-cinnamon/20">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h1 className="font-serif text-2xl text-brown font-bold mb-1">
                  Store Admin Access
                </h1>
                <p className="text-xs text-dark-coffee/70 font-sans">
                  This page is private. Please enter your Store Secret Passcode to view customer COD orders.
                </p>
              </div>

              {errorMsg && (
                <div className="bg-terracotta/10 border border-terracotta/30 text-terracotta text-xs font-sans px-4 py-2.5 rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark-coffee/70 mb-1.5 font-sans">
                    Admin Passcode
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-dark-coffee/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter admin passcode"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-brown/20 text-sm font-sans bg-white focus:outline-none focus:border-cinnamon"
                    />
                  </div>
                  <span className="text-[10px] text-dark-coffee/50 font-sans block mt-1">
                    Default passcode: <code className="bg-cream px-1 rounded font-mono">delice2026</code>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cinnamon hover:bg-terracotta text-white py-3 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </span>
                  ) : (
                    "Unlock Admin Orders"
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-brown/10 pb-6">
              <div>
                <span className="text-[10px] tracking-widest text-cinnamon font-bold uppercase font-sans block mb-1">
                  Private Store Owner Dashboard
                </span>
                <h1 className="font-serif text-2xl md:text-3xl text-brown font-bold flex items-center gap-2">
                  <Package className="w-7 h-7 text-cinnamon" /> Customer COD & Online Orders
                </h1>
                <p className="text-xs text-dark-coffee/70 font-sans mt-1">
                  Private store orders list. Confidential customer shipping addresses and details.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => fetchOrders()}
                  className="bg-warm-white border border-brown/20 hover:border-cinnamon text-brown text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh ({orders.length})
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-white border border-brown/20 hover:border-terracotta text-terracotta text-xs font-semibold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors"
                  title="Lock Admin Dashboard"
                >
                  <LogOut className="w-3.5 h-3.5" /> Lock
                </button>
              </div>
            </div>

            {/* Orders List */}
            {loading ? (
              <div className="py-20 text-center text-sm text-dark-coffee/60 font-sans">
                Loading orders database...
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-warm-white border border-brown/10 rounded-3xl p-12 text-center max-w-md mx-auto">
                <Package className="w-12 h-12 text-brown/30 mx-auto mb-3" />
                <h3 className="font-serif text-lg text-brown font-bold mb-1">No Orders Received Yet</h3>
                <p className="text-xs text-dark-coffee/70 font-sans">
                  New COD or online orders will automatically appear here when customers complete checkout.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, idx) => (
                  <div
                    key={order.id || idx}
                    className="bg-warm-white border border-brown/15 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all space-y-6"
                  >
                    {/* Top status bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brown/10 pb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-dark-coffee/50 font-sans block mb-0.5">
                          Order Reference
                        </span>
                        <span className="font-mono text-base font-bold text-cinnamon">
                          {order.orderNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-sans uppercase border ${
                            order.paymentMethod === "cod"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-green-50 text-green-800 border-green-200"
                          }`}
                        >
                          {order.paymentMethod === "cod" ? (
                            <><Banknote className="w-3.5 h-3.5" /> COD (Cash on Delivery)</>
                          ) : (
                            <><CreditCard className="w-3.5 h-3.5" /> Prepaid (Razorpay)</>
                          )}
                        </span>

                        <span className="text-xs font-sans text-dark-coffee/60 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Main Order Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Delivery Address */}
                      <div className="space-y-2 font-sans text-xs md:text-sm">
                        <span className="text-[11px] uppercase font-bold text-dark-coffee/60 tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-brown" /> Customer Shipping Address
                        </span>
                        <div className="bg-cream/50 p-4 rounded-2xl border border-brown/10 space-y-1 text-dark-coffee/85">
                          <span className="block font-bold text-brown text-sm">
                            {order.shippingAddress?.fullName}
                          </span>
                          <span className="block">{order.shippingAddress?.addressLine1}</span>
                          {order.shippingAddress?.addressLine2 && (
                            <span className="block">{order.shippingAddress?.addressLine2}</span>
                          )}
                          <span className="block font-semibold">
                            {order.shippingAddress?.city}, {order.shippingAddress?.state} — {order.shippingAddress?.postalCode}
                          </span>
                          <span className="block text-dark-coffee/60">{order.shippingAddress?.country}</span>
                        </div>
                      </div>

                      {/* Customer Contact */}
                      <div className="space-y-2 font-sans text-xs md:text-sm">
                        <span className="text-[11px] uppercase font-bold text-dark-coffee/60 tracking-wider flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-brown" /> Contact Information
                        </span>
                        <div className="bg-cream/50 p-4 rounded-2xl border border-brown/10 space-y-2.5">
                          <p className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-cinnamon" />
                            <a
                              href={`tel:+91${order.shippingAddress?.phone}`}
                              className="font-bold text-brown hover:underline"
                            >
                              +91 {order.shippingAddress?.phone}
                            </a>
                          </p>
                          <p className="flex items-center gap-2 text-dark-coffee/80">
                            <Mail className="w-3.5 h-3.5 text-dark-coffee/50" />
                            <span>{order.shippingAddress?.email}</span>
                          </p>
                          <a
                            href={`https://wa.me/91${order.shippingAddress?.phone}?text=Hi%20${encodeURIComponent(order.shippingAddress?.fullName || "")},%20this%20is%20Delice%20Artisan%20Spices%20regarding%20your%20order%20${order.orderNumber}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl hover:bg-green-100 transition-colors"
                          >
                            Message Customer on WhatsApp
                          </a>
                        </div>
                      </div>

                      {/* Purchased Items & Total */}
                      <div className="space-y-2 font-sans text-xs md:text-sm">
                        <span className="text-[11px] uppercase font-bold text-dark-coffee/60 tracking-wider flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-brown" /> Items Ordered & Total
                        </span>
                        <div className="bg-cream/50 p-4 rounded-2xl border border-brown/10 flex flex-col justify-between h-[calc(100%-24px)]">
                          <div className="space-y-2 mb-3 max-h-36 overflow-y-auto pr-1">
                            {order.items?.map((item: any, i: number) => (
                              <div key={i} className="flex justify-between items-center text-xs">
                                <span className="font-medium text-dark-coffee font-serif">
                                  {item.name} ({item.weight}) × {item.quantity}
                                </span>
                                <span className="font-semibold text-cinnamon">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="border-t border-brown/10 pt-2.5 flex items-baseline justify-between">
                            <span className="font-bold text-brown font-serif">Total Amount:</span>
                            <span className="font-serif text-lg font-bold text-cinnamon">
                              {formatPrice(order.totalAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
