"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSave = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: "0 16px", fontFamily: "system-ui" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 700, fontSize: 28, margin: 0 }}>📌 Latch</h1>
        <p style={{ color: "#666", margin: "4px 0 0" }}>Save. AI understands.</p>
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste link here..."
          style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 14 }}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <button
          onClick={handleSave}
          disabled={loading || !url}
          style={{ background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", cursor: "pointer", fontWeight: 600 }}
        >
          {loading ? "..." : "Save"}
        </button>
      </div>

      {/* Loading */}
      {loading && <p style={{ color: "#999" }}>Latch is understanding...</p>}

      {/* Result */}
      {result && result.processing_status === "completed" && (
        <div style={{ background: "#f9f9f9", borderRadius: 12, padding: 16 }}>
          {/* Intent Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ background: "#e0f0ff", color: "#0066cc", padding: "2px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600 }}>
              🎯 {result.intent?.toUpperCase()}
            </span>
            <span style={{ fontSize: 12, color: "#888" }}>
              {result.platform?.toUpperCase()} · {new Date(result.saved_at).toLocaleDateString("id-ID")}
            </span>
          </div>

          {/* Summary */}
          <p style={{ fontSize: 14, color: "#333", margin: "0 0 12px" }}>
            {result.title || result.summary}
          </p>

          {/* Entities */}
          {result.entities?.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#666", margin: "0 0 6px" }}>
                📍 {result.entities.length} entities found
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {result.entities.map((e: any, i: number) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#fff", border: "1px solid #eee", borderRadius: 6, padding: "4px 8px", fontSize: 12 }}>
                    {e.type === "product" ? "💰" : e.type === "area" ? "🏠" : e.type === "place" ? "📍" : "📌"}{" "}
                    {e.name}
                    {e.price && ` · Rp${(e.price/1000000).toFixed(1)}jt`}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Context */}
          {result.contexts?.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#666", margin: "0 0 4px" }}>📂 Context</p>
              {result.contexts.map((c: any, i: number) => (
                <span key={i} style={{ display: "inline-block", background: "#effaf0", color: "#116622", padding: "4px 10px", borderRadius: 6, fontSize: 12 }}>
                  {c.name} ({Math.round(c.confidence * 100)}%)
                </span>
              ))}
            </div>
          )}

          {/* Maps link */}
          {result.maps_url && (
            <a href={result.maps_url} target="_blank" style={{ display: "inline-block", fontSize: 13, color: "#4285F4", textDecoration: "none", marginBottom: 8 }}>
              📍 Buka di Google Maps →
            </a>
          )}

          {/* Engagement */}
          {result.engagement && (
            <div style={{ fontSize: 12, color: "#999", marginTop: 8 }}>
              {result.engagement.views && `${result.engagement.views.toLocaleString()} views · `}
              {result.engagement.likes && `${result.engagement.likes.toLocaleString()} likes · `}
              {result.engagement.comments && `${result.engagement.comments} comments`}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!result && !loading && (
        <div style={{ color: "#999", textAlign: "center", marginTop: 60 }}>
          <p style={{ fontSize: 40, margin: 0 }}>📌</p>
          <p>Paste a link from Threads or TikTok.<br />Latch will understand it.</p>
        </div>
      )}
    </div>
  );
}
