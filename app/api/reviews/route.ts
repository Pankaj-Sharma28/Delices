import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");

// Helper to read reviews file
function getStoredReviews(): any[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(REVIEWS_FILE)) {
      fs.writeFileSync(REVIEWS_FILE, JSON.stringify([]), "utf-8");
      return [];
    }
    const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading reviews file:", error);
    return [];
  }
}

// Helper to save reviews file
function saveReviews(reviews: any[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving reviews file:", error);
  }
}

// GET /api/reviews — Returns all community reviews across all devices
export async function GET() {
  const reviews = getStoredReviews();
  return NextResponse.json({ reviews });
}

// POST /api/reviews — Saves a new review or updates an existing review
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, review, id } = body;

    let reviews = getStoredReviews();

    if (action === "delete" && id) {
      reviews = reviews.filter((r: any) => r.id !== id);
      saveReviews(reviews);
      return NextResponse.json({ success: true, reviews });
    }

    if (!review || !review.id) {
      return NextResponse.json({ error: "Invalid review data" }, { status: 400 });
    }

    const existingIndex = reviews.findIndex((r: any) => r.id === review.id);
    if (existingIndex >= 0) {
      // Update existing review
      reviews[existingIndex] = { ...reviews[existingIndex], ...review };
    } else {
      // Prepend new review
      reviews.unshift(review);
    }

    saveReviews(reviews);
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("API reviews error:", error);
    return NextResponse.json({ error: "Failed to process review" }, { status: 500 });
  }
}
