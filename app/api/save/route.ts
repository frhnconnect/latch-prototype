import { NextResponse } from "next/server";

// Simple mock extraction - in production, this would:
// 1. Call KeyAPI to fetch content
// 2. Send to LLM for entity/intent extraction
// 3. Enrich with Google Maps link
function mockExtract(url: string) {
  // Demo: return different mock data based on the URL content
  // Production would call KeyAPI + LLM

  // TikTok: Condet kontrakan
  if (url.includes("nitaaup")) {
    return {
      save_id: "sim-001",
      platform: "tiktok",
      intent: "buy",
      confidence: 0.88,
      title: "Pindahan Kontrakan di Condet Rp2jt/bulan",
      summary:
        "POV pindahan kontrakan di Condet, Jakarta Timur. Harga Rp2.000.000/bulan. Lokasi di Batu Ampar, Kramatjati.",
      topics: ["kontrakan", "condet", "jakarta-timur", "pindahan-rumah"],
      entities: [
        { type: "area", name: "Condet", city: "Jakarta Timur" },
        { type: "place", name: "Batu Ampar", city: "Kramatjati", lat: -6.2748, lng: 106.862 },
        { type: "product", name: "Kontrakan Condet Rp2jt/bln", price: 2000000, category: "housing" },
      ],
      contexts: [{ name: "Cari Kontrakan Jakarta", confidence: 0.7 }],
      engagement: { views: 115405, likes: 3386, comments: 680 },
      maps_url:
        "https://www.google.com/maps/search/?api=1&query=Batu+Ampar+Kramatjati+Jakarta+Timur", // Place-based, bukan kontrakan individual
      saved_at: new Date().toISOString(),
      processing_status: "completed",
    };
  }

  // TikTok: NØN Coffee
  if (url.includes("seseplaces")) {
    return {
      save_id: "sim-002",
      platform: "tiktok",
      intent: "visit",
      confidence: 0.92,
      title: "NØN Coffee — Korean vibes di Wijaya",
      summary:
        "Coffee spot baru di Wijaya, Kebayoran Baru, Jakarta Selatan. Vibes Korea dengan kopi enak.",
      topics: ["coffee", "jakarta-selatan", "wijaya", "korean-vibes"],
      entities: [
        { type: "place", name: "NØN Coffee", category: "cafe", city: "Jakarta Selatan" },
        { type: "area", name: "Wijaya", city: "Kebayoran Baru" },
      ],
      contexts: [{ name: "Coffee Places Jakarta", confidence: 0.8 }],
      engagement: { views: 8549, likes: 72, saves: 47 },
      maps_url:
        "https://www.google.com/maps/search/?api=1&query=NON+Coffee+Wijaya+Kebayoran+Baru+Jakarta",
      saved_at: new Date().toISOString(),
      processing_status: "completed",
    };
  }

  // Threads: Sentul
  if (url.includes("starrynoon")) {
    return {
      save_id: "sim-003",
      platform: "threads",
      intent: "visit",
      confidence: 0.91,
      title: "Review tinggal di Sentul — lebih enak dari Jakarta",
      summary:
        "Chika berbagi pengalaman 7 bulan tinggal di Sentul: udara asri, air bersih, jarang macet weekday, makanan enak dekat Bogor.",
      topics: ["sentul", "bogor", "tinggal", "review-area"],
      entities: [
        { type: "area", name: "Sentul City", city: "Bogor" },
        { type: "place", name: "AEON Mall Sentul", category: "mall" },
        { type: "product", name: "Aren Latte 15K", price: 15000, location: "Cibinong" },
        { type: "activity", name: "Trekking Curug", location: "Sentul" },
      ],
      contexts: [{ name: "Bogor / Sentul Area Guide", confidence: 0.82 }],
      engagement: { likes: 113, replies: 36, shares: 8 },
      maps_url: "https://www.google.com/maps/search/?api=1&query=Sentul+City+Bogor",
      saved_at: new Date().toISOString(),
      processing_status: "completed",
    };
  }

  // Threads: Pangandaran
  if (url.includes("hayulahgaskeun")) {
    return {
      save_id: "sim-004",
      platform: "threads",
      intent: "visit",
      confidence: 0.96,
      title: "11 Tempat Wajib di Pangandaran & Batukaras",
      summary:
        "Rekomendasi 11 tempat wisata di Pangandaran dan Batukaras, Jawa Barat. Dari replies: Casabadia Villas, The Allure (kids-friendly), Paddle Board Batukaras.",
      topics: ["pangandaran", "batukaras", "wisata", "jawa-barat", "beach", "surfing"],
      entities: [
        { type: "area", name: "Pangandaran", city: "Jawa Barat" },
        { type: "area", name: "Batukaras", city: "Jawa Barat" },
        { type: "place", name: "The Allure Villa", category: "villa", tags: ["kids-friendly"] },
        { type: "place", name: "Casabadia Villas", category: "villa" },
        { type: "activity", name: "Paddle Board Batukaras", category: "watersport" },
      ],
      contexts: [{ name: "Pangandaran / Batukaras Trip", confidence: 0.88 }],
      engagement: { likes: 226, replies: 12, shares: 339 },
      maps_url:
        "https://www.google.com/maps/search/?api=1&query=Pangandaran+Beach+Jawa+Barat",
      saved_at: new Date().toISOString(),
      processing_status: "completed",
    };
  }

  // Default fallback
  return {
    save_id: "sim-unknown",
    platform: "web",
    intent: "learn",
    confidence: 0.5,
    title: "Save from: " + url.substring(0, 50) + "...",
    summary: "Latch is processing this link. AI will extract entities soon.",
    topics: [],
    entities: [],
    contexts: [],
    engagement: {},
    maps_url: null,
    saved_at: new Date().toISOString(),
    processing_status: "pending",
    message: "This is a demo. In production, Latch will extract entities from any URL.",
  };
}

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 800));

  const result = mockExtract(url);
  return NextResponse.json(result);
}
