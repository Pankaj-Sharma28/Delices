import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = "INR", receipt } = await req.json();

    if (!amount || typeof amount !== "number") {
      return NextResponse.json(
        { error: "Amount is required and must be a valid number" },
        { status: 400 }
      );
    }

    // Convert to paise if amount is in rupees (e.g., amount < 10000)
    // Minimum 100 paise (₹1) required
    const amountInPaise = amount < 100 ? Math.round(amount * 100) : Math.round(amount);

    if (amountInPaise < 100) {
      return NextResponse.json(
        { error: "Amount must be at least ₹1 (100 paise)" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured" },
        { status: 500 }
      );
    }

    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      orderId: order.id,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Razorpay create order error:", error);
    if (error?.statusCode === 401) {
      return NextResponse.json(
        { error: "Razorpay Authentication Failed: Invalid Key or Secret" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: error?.description || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
