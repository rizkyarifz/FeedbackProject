"use client";

import { useState } from "react";

export default function Home() {
  const [kesan, setKesan] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!kesan.trim() || !pesan.trim()) {
      alert("Semua field wajib diisi.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kesan,
        pesan,
      }),
    });

    setLoading(false);

    if (response.ok) {
      alert("Terima kasih atas feedback Anda.");

      setKesan("");
      setPesan("");
    } else {
      const err = await response.json();
      alert(err.message);
    }
  }

  return (
    <main className="container">
      <div className="card">

        <h1>Feedback</h1>

        <p className="note">
          <strong>
            *Note: Diisi sejujur-jujurnya dan keluarkan semua unek-unek jika ada,
            dijamin 100% anonim karena tidak membutuhkan login atau identitas apa
            pun.
          </strong>
        </p>

        <label>Kesan</label>

        <textarea
          rows={5}
          value={kesan}
          onChange={(e) => setKesan(e.target.value)}
        />

        <label>Pesan / Masukan / Feedback</label>

        <textarea
          rows={8}
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={submit}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

      </div>
    </main>
  );
}