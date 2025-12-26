"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function CallbackPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    const verifier = sessionStorage.getItem("pkce_verifier");

    fetch("/api/oauth/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        code_verifier: verifier,
      }),
    });
  }, []);

  return (
    <div>
      <h1>Callback Page</h1>
      <button className="cursor-pointer" ><Link href="/">Go to Home</Link></button>
    </div>
  );
}
