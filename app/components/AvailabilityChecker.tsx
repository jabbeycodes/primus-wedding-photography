"use client";

import { useState } from "react";

type CheckStatus = "idle" | "checking" | "available" | "limited" | "booked" | "error";

export default function AvailabilityChecker() {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [email, setEmail] = useState("");

  async function check(e: React.FormEvent) {
    e.preventDefault();
    if (!date) return;
    setStatus("checking");

    try {
      // Submit as a lead with source "date-checker"
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || "pending@primusphotography.com",
          source: "date-checker",
          weddingDate: date,
          note: "Availability check from homepage widget",
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      // Simulated availability — in production this would check a real calendar
      const month = new Date(date).getMonth();
      const isPeak = month >= 4 && month <= 9;
      setStatus(isPeak ? "limited" : "available");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="availability-checker">
      <p className="eyebrow">Check your date</p>
      <h3>Is your date available?</h3>
      <p className="checker-subtitle">
        Pick your wedding date and we&apos;ll confirm availability within 24 hours.
      </p>
      <form className="checker-form" onSubmit={check}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          aria-label="Wedding date"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email (optional)"
          aria-label="Email address"
        />
        <button className="button button-dark" type="submit" disabled={status === "checking"}>
          {status === "checking" ? "Checking…" : "Check availability →"}
        </button>
      </form>

      {status === "available" && (
        <div className="checker-result available">
          <strong>✓ Great news!</strong> Your date appears to be open. Send us a
          full inquiry below and we&apos;ll lock it in.
        </div>
      )}
      {status === "limited" && (
        <div className="checker-result limited">
          <strong>⚠ Limited availability.</strong> We may have a photographer
          available — submit your inquiry below and we&apos;ll confirm within 24 hours.
        </div>
      )}
      {status === "booked" && (
        <div className="checker-result booked">
          <strong>✗ We&apos;re booked.</strong> But we&apos;d love to recommend a trusted
          colleague. Email us for a referral.
        </div>
      )}
      {status === "error" && (
        <div className="checker-result error">
          Something went wrong. Please text us at (336) 457-2361 or use the form below.
        </div>
      )}
    </div>
  );
}