"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "newsletter" }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="newsletter-success">
        <strong>You&apos;re on the list.</strong> Watch your inbox for real wedding
        stories, tips, and the occasional surprise.
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        aria-label="Email address"
      />
      <button className="button button-dark" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Joining…" : "Join the list →"}
      </button>
      {status === "error" && (
        <p className="form-error">Something went wrong — please try again.</p>
      )}
    </form>
  );
}