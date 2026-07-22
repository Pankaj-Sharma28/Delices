import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function getStoredOrders(): any[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([]), "utf-8");
      return [];
    }
    const data = fs.readFileSync(ORDERS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading orders file:", error);
    return [];
  }
}

function saveOrders(orders: any[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving orders file:", error);
  }
}

// GET /api/orders — Secure endpoint protected by Admin Secret Key
export async function GET(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key") || req.nextUrl.searchParams.get("key");
  const expectedKey = process.env.ADMIN_SECRET_KEY || "delice2026";

  if (adminKey !== expectedKey) {
    return NextResponse.json(
      { error: "Unauthorized access. Secret Admin Passcode required." },
      { status: 401 }
    );
  }

  const orders = getStoredOrders();
  return NextResponse.json({ orders, totalOrders: orders.length });
}

// POST /api/orders — Places a new order (COD or Prepaid) from checkout
export async function POST(req: NextRequest) {
  try {
    const order = await req.json();

    if (!order || !order.shippingAddress) {
      return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
    }

    const orders = getStoredOrders();
    const newOrder = {
      id: order.id || `ORD-${Date.now()}`,
      orderNumber: order.orderNumber || `DEL-${Math.floor(100000 + Math.random() * 900000)}`,
      items: order.items || [],
      totalAmount: order.totalAmount || 0,
      paymentMethod: order.paymentMethod || "cod",
      status: order.paymentMethod === "cod" ? "COD - Pending Dispatch" : "Paid - Processing",
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt || new Date().toISOString(),
    };

    orders.unshift(newOrder);
    saveOrders(orders);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("API orders error:", error);
    return NextResponse.json({ error: "Failed to record order" }, { status: 500 });
  }
}
