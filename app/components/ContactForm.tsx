"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ packageName }: { packageName?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    venue: "",
    message: "",
    referralSource: "",
  });

  function update(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          package: packageName || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", weddingDate: "", venue: "", message: "", referralSource: "" });
    } catch {
      setErrorMsg("Network error — please try again or text us");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success">
        <p className="form-success-title">Thank you — we&apos;ll be in touch within 24 hours.</p>
        <p className="form-success-body">
          Your inquiry has been received. In the meantime, follow us on Instagram
          for recent work and inspiration.
        </p>
        <a
          className="button button-dark"
          href="https://www.instagram.com/primus_inspirations/"
          target="_blank"
          rel="noreferrer"
        >
          See recent work ↗
        </a>
        <button
          className="text-link"
          onClick={() => setStatus("idle")}
          type="button"
        >
          ← Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-field">
          <span>Name *</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
          />
        </label>
        <label className="form-field">
          <span>Email *</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@email.com"
          />
        </label>
      </div>
      <div className="form-row">
        <label className="form-field">
          <span>Phone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(555) 123-4567"
          />
        </label>
        <label className="form-field">
          <span>Wedding date</span>
          <input
            type="date"
            value={form.weddingDate}
            onChange={(e) => update("weddingDate", e.target.value)}
          />
        </label>
      </div>
      <label className="form-field">
        <span>Venue / location</span>
        <input
          type="text"
          value={form.venue}
          onChange={(e) => update("venue", e.target.value)}
          placeholder="Where are you getting married?"
        />
      </label>
      {packageName ? (
        <input type="hidden" name="package" value={packageName} />
      ) : null}
      <label className="form-field">
        <span>How did you find us?</span>
        <select value={form.referralSource} onChange={(e) => update("referralSource", e.target.value)}>
          <option value="">Select…</option>
          <option value="google">Google search</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
          <option value="referral">Friend or venue referral</option>
          <option value="wedding-show">Wedding show / expo</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="form-field">
        <span>Tell us about your day</span>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="What matters most to you? How did you meet? Any questions for us?"
        />
      </label>
      {status === "error" ? (
        <p className="form-error">{errorMsg}</p>
      ) : null}
      <button
        className="button button-dark form-submit"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send your inquiry →"}
      </button>
    </form>
  );
}