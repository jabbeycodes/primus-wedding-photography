"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type Step = 1 | 2 | 3 | 4 | 5;

type IntakeData = {
  // Step 1: Logistics
  partnerName: string;
  bestAddress: string;
  ceremonyStartTime: string;
  receptionStartTime: string;
  gettingReadyLocation: string;
  receptionVenue: string;
  guestCount: string;
  firstLook: string;
  sendOffType: string;
  // Step 2: Coverage
  mustCaptureMoments: string;
  familyPortraitList: string;
  bridalPartySize: string;
  culturalTraditions: string;
  plannedSurprises: string;
  addOns: string;
  engagementSession: string;
  // Step 3: Style
  photographyStyle: string;
  mustHaveShots: string;
  shotsToAvoid: string;
  colorPalette: string;
  inspirationLinks: string;
  selfConsciousAreas: string;
  // Step 4: Vendors
  weddingPlanner: string;
  coordinator: string;
  dj: string;
  officiant: string;
  videographer: string;
  venueContact: string;
  dayOfContact: string;
  parkingNotes: string;
  gettingReadyRoomNotes: string;
  venueRestrictions: string;
  photographerMeals: string;
  // Step 5: Contract
  legalName1: string;
  legalName2: string;
  billingAddress: string;
  paymentMethod: string;
  paymentPlan: string;
};

const emptyData: IntakeData = {
  partnerName: "", bestAddress: "", ceremonyStartTime: "", receptionStartTime: "",
  gettingReadyLocation: "", receptionVenue: "", guestCount: "", firstLook: "",
  sendOffType: "", mustCaptureMoments: "", familyPortraitList: "", bridalPartySize: "",
  culturalTraditions: "", plannedSurprises: "", addOns: "", engagementSession: "",
  photographyStyle: "", mustHaveShots: "", shotsToAvoid: "", colorPalette: "",
  inspirationLinks: "", selfConsciousAreas: "", weddingPlanner: "", coordinator: "",
  dj: "", officiant: "", videographer: "", venueContact: "", dayOfContact: "",
  parkingNotes: "", gettingReadyRoomNotes: "", venueRestrictions: "", photographerMeals: "",
  legalName1: "", legalName2: "", billingAddress: "", paymentMethod: "", paymentPlan: "",
};

const stepTitles = [
  "Logistics",
  "Coverage & Moments",
  "Style & Vision",
  "Vendors & Day-Of Details",
  "Contract & Payment",
];

const addOnOptions = [
  "Videography", "Drone coverage", "Photo booth", "Second photographer",
  "Extra hours", "Engagement session", "Album", "Prints",
];

const styleOptions = [
  { value: "editorial", label: "Editorial — polished, magazine-style" },
  { value: "documentary", label: "Documentary — candid, storytelling" },
  { value: "fine-art", label: "Fine art — artistic, moody" },
  { value: "classic", label: "Classic — timeless, traditional" },
  { value: "mixed", label: "Mixed — blend of all the above" },
];

export default function IntakeForm({ token }: { token: string }) {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<IntakeData>(emptyData);
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  // Load saved data on mount
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/intake?token=${token}`);
        if (!res.ok) {
          setError("Could not load your form. Please check your link.");
          return;
        }
        const json = await res.json();
        if (json.intake) {
          // Merge saved data into state
          const saved = json.intake as Record<string, string>;
          setData((prev) => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(saved).filter(([k]) => k in prev)
            ) as IntakeData,
          }));
        }
        if (json.inquiry?.status === "intake-complete") {
          setCompleted(true);
        }
      } catch {
        setError("Network error — please refresh the page");
      }
      setLoaded(true);
    }
    load();
  }, [token]);

  function update(key: keyof IntakeData, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAddOn(option: string) {
    const current = data.addOns ? JSON.parse(data.addOns) : [];
    const next = current.includes(option)
      ? current.filter((o: string) => o !== option)
      : [...current, option];
    update("addOns", JSON.stringify(next));
  }

  // Auto-save on step change
  const saveStep = useCallback(async (stepNum: number, isComplete = false) => {
    setSaving(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          step: stepNum,
          completed: isComplete,
          data: data as Record<string, string>,
        }),
      });
      if (!res.ok) {
        setError("Could not save. Please try again.");
        return false;
      }
      if (isComplete) setCompleted(true);
      return true;
    } catch {
      setError("Network error — please try again");
      return false;
    } finally {
      setSaving(false);
    }
  }, [token, data]);

  async function nextStep() {
    const ok = await saveStep(step);
    if (ok && step < 5) setStep((step + 1) as Step);
  }

  async function prevStep() {
    if (step > 1) setStep((step - 1) as Step);
  }

  async function finalSubmit() {
    const ok = await saveStep(5, true);
    if (ok) setCompleted(true);
  }

  if (!loaded) {
    return (
      <div className="intake-loading">
        <p>Loading your intake form…</p>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="intake-success">
        <p className="intake-success-title">You&apos;re all set!</p>
        <p>
          Your intake form has been submitted. We&apos;ll review your details
          and send you a personalized proposal within 48 hours. Keep an eye on
          your inbox — and feel free to text us at (336) 457-2361 if you have
          any questions.
        </p>
        <a className="button button-dark" href="https://www.instagram.com/primus_inspirations/" target="_blank" rel="noreferrer">
          Follow our work on Instagram ↗
        </a>
      </div>
    );
  }

  if (error && !data.partnerName) {
    return (
      <div className="intake-error">
        <p>{error}</p>
        <Link className="button button-dark" href="/">← Back to home</Link>
      </div>
    );
  }

  return (
    <div className="intake-form">
      {/* Progress indicator */}
      <div className="intake-progress">
        {stepTitles.map((title, i) => (
          <div
            key={i}
            className={step === i + 1 ? "progress-step active" : step > i + 1 ? "progress-step done" : "progress-step"}
          >
            <span className="progress-dot">{step > i + 1 ? "✓" : i + 1}</span>
            <span className="progress-label">{title}</span>
          </div>
        ))}
      </div>

      {error && <p className="form-error">{error}</p>}

      {/* Step 1: Logistics */}
      {step === 1 && (
        <div className="intake-step">
          <h2>Logistics</h2>
          <p className="intake-step-intro">Let&apos;s start with the basics about your wedding day.</p>

          <label className="form-field">
            <span>Partner&apos;s full name *</span>
            <input type="text" required value={data.partnerName} onChange={(e) => update("partnerName", e.target.value)} placeholder="Your future spouse's name" />
          </label>

          <label className="form-field">
            <span>Best mailing address</span>
            <input type="text" value={data.bestAddress} onChange={(e) => update("bestAddress", e.target.value)} placeholder="For contracts, albums, and prints" />
          </label>

          <div className="form-row">
            <label className="form-field">
              <span>Ceremony start time</span>
              <input type="time" value={data.ceremonyStartTime} onChange={(e) => update("ceremonyStartTime", e.target.value)} />
            </label>
            <label className="form-field">
              <span>Reception start time</span>
              <input type="time" value={data.receptionStartTime} onChange={(e) => update("receptionStartTime", e.target.value)} />
            </label>
          </div>

          <label className="form-field">
            <span>Getting-ready location (if different from venue)</span>
            <input type="text" value={data.gettingReadyLocation} onChange={(e) => update("gettingReadyLocation", e.target.value)} placeholder="Where will you be getting ready?" />
          </label>

          <label className="form-field">
            <span>Reception venue (if different from ceremony)</span>
            <input type="text" value={data.receptionVenue} onChange={(e) => update("receptionVenue", e.target.value)} placeholder="Where is the reception?" />
          </label>

          <div className="form-row">
            <label className="form-field">
              <span>Estimated guest count</span>
              <input type="number" value={data.guestCount} onChange={(e) => update("guestCount", e.target.value)} placeholder="e.g. 120" />
            </label>
            <label className="form-field">
              <span>First look?</span>
              <select value={data.firstLook} onChange={(e) => update("firstLook", e.target.value)}>
                <option value="">Select…</option>
                <option value="yes">Yes — before ceremony</option>
                <option value="no">No — traditional (after ceremony)</option>
                <option value="undecided">Undecided yet</option>
              </select>
            </label>
          </div>

          <label className="form-field">
            <span>Send-off / exit type</span>
            <input type="text" value={data.sendOffType} onChange={(e) => update("sendOffType", e.target.value)} placeholder="Sparkler, vintage car, bubbles, none, etc." />
          </label>
        </div>
      )}

      {/* Step 2: Coverage & Moments */}
      {step === 2 && (
        <div className="intake-step">
          <h2>Coverage & Moments</h2>
          <p className="intake-step-intro">Tell us what matters most to capture on your day.</p>

          <label className="form-field">
            <span>Must-capture moments (check all that apply)</span>
            <div className="checkbox-grid">
              {["Getting ready", "First look", "Ceremony", "Cocktail hour", "Couple portraits", "Family portraits", "Bridal party", "Reception details", "First dance", "Toasts", "Dancing", "Exit/send-off"].map((moment) => (
                <label key={moment} className="checkbox-item">
                  <input type="checkbox" checked={data.mustCaptureMoments.includes(moment)} onChange={(e) => {
                    const current = data.mustCaptureMoments ? data.mustCaptureMoments.split(", ") : [];
                    const next = e.target.checked ? [...current, moment] : current.filter((m) => m !== moment);
                    update("mustCaptureMoments", next.join(", "));
                  }} />
                  <span>{moment}</span>
                </label>
              ))}
            </div>
          </label>

          <label className="form-field">
            <span>Family portrait list</span>
            <textarea rows={4} value={data.familyPortraitList} onChange={(e) => update("familyPortraitList", e.target.value)} placeholder="List the family groupings you need, e.g. &#10;Bride + both parents&#10;Bride + siblings&#10;Groom + grandparents…" />
          </label>

          <div className="form-row">
            <label className="form-field">
              <span>Bridal party size</span>
              <input type="text" value={data.bridalPartySize} onChange={(e) => update("bridalPartySize", e.target.value)} placeholder="e.g. 6 bridesmaids, 6 groomsmen" />
            </label>
            <label className="form-field">
              <span>Engagement session?</span>
              <select value={data.engagementSession} onChange={(e) => update("engagementSession", e.target.value)}>
                <option value="">Select…</option>
                <option value="yes">Yes — include it</option>
                <option value="no">No, thank you</option>
                <option value="maybe">Maybe — tell me more</option>
              </select>
            </label>
          </div>

          <label className="form-field">
            <span>Cultural or religious traditions to document</span>
            <textarea rows={3} value={data.culturalTraditions} onChange={(e) => update("culturalTraditions", e.target.value)} placeholder="Any specific ceremonies, rituals, or customs we should be aware of?" />
          </label>

          <label className="form-field">
            <span>Planned surprises or special moments</span>
            <textarea rows={3} value={data.plannedSurprises} onChange={(e) => update("plannedSurprises", e.target.value)} placeholder="Choreographed dance, flash mob, secret gift, etc." />
          </label>

          <label className="form-field">
            <span>Add-ons you&apos;re interested in</span>
            <div className="checkbox-grid">
              {addOnOptions.map((option) => {
                const selected = data.addOns ? JSON.parse(data.addOns).includes(option) : false;
                return (
                  <label key={option} className="checkbox-item">
                    <input type="checkbox" checked={selected} onChange={() => toggleAddOn(option)} />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </label>
        </div>
      )}

      {/* Step 3: Style & Vision */}
      {step === 3 && (
        <div className="intake-step">
          <h2>Style & Vision</h2>
          <p className="intake-step-intro">Help us understand your aesthetic and what you envision.</p>

          <label className="form-field">
            <span>Photography style preference</span>
            <select value={data.photographyStyle} onChange={(e) => update("photographyStyle", e.target.value)}>
              <option value="">Select…</option>
              {styleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span>Must-have shots</span>
            <textarea rows={4} value={data.mustHaveShots} onChange={(e) => update("mustHaveShots", e.target.value)} placeholder="Specific shots you absolutely want — family heirlooms, details, locations, poses…" />
          </label>

          <label className="form-field">
            <span>Shots to avoid</span>
            <textarea rows={3} value={data.shotsToAvoid} onChange={(e) => update("shotsToAvoid", e.target.value)} placeholder="Anything you'd rather we skip or do differently" />
          </label>

          <div className="form-row">
            <label className="form-field">
              <span>Wedding color palette / theme</span>
              <input type="text" value={data.colorPalette} onChange={(e) => update("colorPalette", e.target.value)} placeholder="e.g. Sage green + ivory, rustic autumnal, black-tie formal" />
            </label>
            <label className="form-field">
              <span>Areas you&apos;re self-conscious about (optional)</span>
              <input type="text" value={data.selfConsciousAreas} onChange={(e) => update("selfConsciousAreas", e.target.value)} placeholder="Helps us guide posing — completely private" />
            </label>
          </div>

          <label className="form-field">
            <span>Inspiration links (Pinterest, Instagram, etc.)</span>
            <textarea rows={3} value={data.inspirationLinks} onChange={(e) => update("inspirationLinks", e.target.value)} placeholder="Paste any links to photos or boards that inspire you" />
          </label>
        </div>
      )}

      {/* Step 4: Vendors & Day-Of Details */}
      {step === 4 && (
        <div className="intake-step">
          <h2>Vendors & Day-Of Details</h2>
          <p className="intake-step-intro">The practical info we need to coordinate smoothly on the day.</p>

          <div className="form-row">
            <label className="form-field">
              <span>Wedding planner (name + contact)</span>
              <input type="text" value={data.weddingPlanner} onChange={(e) => update("weddingPlanner", e.target.value)} placeholder="Or 'none'" />
            </label>
            <label className="form-field">
              <span>Day-of coordinator (name + contact)</span>
              <input type="text" value={data.coordinator} onChange={(e) => update("coordinator", e.target.value)} placeholder="Or 'none'" />
            </label>
          </div>

          <div className="form-row">
            <label className="form-field">
              <span>DJ / band (name + contact)</span>
              <input type="text" value={data.dj} onChange={(e) => update("dj", e.target.value)} />
            </label>
            <label className="form-field">
              <span>Officiant (name + contact)</span>
              <input type="text" value={data.officiant} onChange={(e) => update("officiant", e.target.value)} />
            </label>
          </div>

          <label className="form-field">
            <span>Videographer (if you have one)</span>
            <input type="text" value={data.videographer} onChange={(e) => update("videographer", e.target.value)} placeholder="Name + contact, or 'none'" />
          </label>

          <label className="form-field">
            <span>Venue contact (day-of)</span>
            <input type="text" value={data.venueContact} onChange={(e) => update("venueContact", e.target.value)} placeholder="Who should we coordinate with at the venue?" />
          </label>

          <label className="form-field">
            <span>Emergency day-of contact (not the couple)</span>
            <input type="text" value={data.dayOfContact} onChange={(e) => update("dayOfContact", e.target.value)} placeholder="Name + phone — someone who isn't getting married" />
          </label>

          <div className="form-row">
            <label className="form-field">
              <span>Parking notes</span>
              <input type="text" value={data.parkingNotes} onChange={(e) => update("parkingNotes", e.target.value)} placeholder="Where can we park? Any pass needed?" />
            </label>
            <label className="form-field">
              <span>Getting-ready room notes</span>
              <input type="text" value={data.gettingReadyRoomNotes} onChange={(e) => update("gettingReadyRoomNotes", e.target.value)} placeholder="Is there natural light? Space for gear?" />
            </label>
          </div>

          <label className="form-field">
            <span>Venue photography restrictions</span>
            <textarea rows={3} value={data.venueRestrictions} onChange={(e) => update("venueRestrictions", e.target.value)} placeholder="No flash during ceremony, drone restrictions, off-limits areas, etc." />
          </label>

          <label className="form-field">
            <span>Will the photographer be provided a meal?</span>
            <select value={data.photographerMeals} onChange={(e) => update("photographerMeals", e.target.value)}>
              <option value="">Select…</option>
              <option value="yes">Yes — we&apos;ll feed you</option>
              <option value="no">No — we&apos;ll plan for a break</option>
            </select>
          </label>
        </div>
      )}

      {/* Step 5: Contract & Payment */}
      {step === 5 && (
        <div className="intake-step">
          <h2>Contract & Payment</h2>
          <p className="intake-step-intro">Last step — the legal and payment details so we can prepare your contract.</p>

          <div className="form-row">
            <label className="form-field">
              <span>Your legal name (as on ID) *</span>
              <input type="text" value={data.legalName1} onChange={(e) => update("legalName1", e.target.value)} placeholder="Full legal name" />
            </label>
            <label className="form-field">
              <span>Partner&apos;s legal name (as on ID) *</span>
              <input type="text" value={data.legalName2} onChange={(e) => update("legalName2", e.target.value)} placeholder="Full legal name" />
            </label>
          </div>

          <label className="form-field">
            <span>Billing address</span>
            <input type="text" value={data.billingAddress} onChange={(e) => update("billingAddress", e.target.value)} placeholder="Where should we send invoices?" />
          </label>

          <div className="form-row">
            <label className="form-field">
              <span>Preferred payment method</span>
              <select value={data.paymentMethod} onChange={(e) => update("paymentMethod", e.target.value)}>
                <option value="">Select…</option>
                <option value="card">Credit/debit card</option>
                <option value="ach">ACH bank transfer</option>
                <option value="check">Check</option>
              </select>
            </label>
            <label className="form-field">
              <span>Payment plan preference</span>
              <select value={data.paymentPlan} onChange={(e) => update("paymentPlan", e.target.value)}>
                <option value="">Select…</option>
                <option value="full">Full payment upfront</option>
                <option value="2-part">2-part (deposit + balance)</option>
                <option value="3-part">3-part (deposit + 2 installments)</option>
                <option value="custom">Custom — let&apos;s discuss</option>
              </select>
            </label>
          </div>

          <div className="intake-review">
            <p className="intake-review-title">Almost done!</p>
            <p>Once you submit, we&apos;ll review everything and prepare a personalized proposal with your contract within 48 hours. You can always come back to this form using your private link if you need to update anything.</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="intake-nav">
        {step > 1 && (
          <button className="button button-outline" type="button" onClick={prevStep} disabled={saving}>
            ← Back
          </button>
        )}
        {saving && <span className="save-indicator">Saving…</span>}
        {step < 5 ? (
          <button className="button button-dark" type="button" onClick={nextStep} disabled={saving}>
            Continue →
          </button>
        ) : (
          <button className="button button-dark intake-submit" type="button" onClick={finalSubmit} disabled={saving}>
            {saving ? "Submitting…" : "Submit intake form →"}
          </button>
        )}
      </div>
    </div>
  );
}