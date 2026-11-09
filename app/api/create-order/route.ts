import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { amount, currency = "INR", receipt } = body;

    // Validate amount presence and type
    if (amount === undefined || amount === null || typeof amount !== "number" || isNaN(amount)) {
      return NextResponse.json(
        { error: "Amount is required and must be a valid number" },
        { status: 400 }
      );
    }

    // Minimum amount: 100 paise (₹1)
    if (amount < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 paise (₹1)" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured on server" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency: currency || "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
    });

    return NextResponse.json({
      order_id: order.id,
      orderId: order.id, // For backward compatibility
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Razorpay create-order error:", error);

    const statusCode = error?.statusCode || error?.status;
    if (statusCode === 401 || (error?.error?.code === "BAD_REQUEST_ERROR" && error?.error?.description?.toLowerCase().includes("auth"))) {
      return NextResponse.json(
        { error: "Razorpay authentication failed: Invalid Key or Secret" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error?.description || error?.error?.description || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
