"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((res) => {
        if (res.ok) setLoggedIn(true);
      })
      .catch(() => {});
  }, []);

  async function handleLogin() {
    const verifier = crypto.randomUUID();

    const hash = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(verifier)
    );

    const challenge = btoa(
      String.fromCharCode(...new Uint8Array(hash))
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    sessionStorage.setItem("pkce_verifier", verifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: "client123",
      redirect_uri: "http://localhost:3000/callback",
      code_challenge: challenge,
      code_challenge_method: "S256",
      state: crypto.randomUUID(),
    });

    window.location.href = `http://localhost:4000/authorize?${params.toString()}`;
  }

  async function handleLogout() {
  // 1️⃣ Clear client cookies
  const res = await fetch("/api/logout");
  const data = await res.json();

  // 2️⃣ Redirect browser to auth server logout
  window.location.href = data.logout_url;
}


  return (
    <main style={{ padding: 40 }}>
      <h1>Client App</h1>

      {!loggedIn ? (
        <button className="cursor-pointer" onClick={handleLogin}>Login</button>
      ) : (
        <>
          <p>✅ Logged in</p>
          <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
        </>
      )}
    </main>
  );
}
