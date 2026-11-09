import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const razorpay_order_id = body.razorpay_order_id || body.order_id;
    const razorpay_payment_id = body.razorpay_payment_id || body.payment_id;
    const razorpay_signature = body.razorpay_signature || body.signature;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required payment verification parameters (order_id, payment_id, signature)" },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay credentials not configured on server" },
        { status: 500 }
      );
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac("sha256", keySecret)
      .update(payload)
      .digest("hex");

    const isValid = generated_signature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed: signature mismatch" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    });
  } catch (error) {
    console.error("Razorpay verify-payment error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment signature" },
      { status: 500 }
    );
  }
}
