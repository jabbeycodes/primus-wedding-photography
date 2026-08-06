import { eq } from "drizzle-orm";
import Link from "next/link";
import { getDb } from "@/db";
import { inquiries, intakeData } from "@/db/schema";
import IntakeForm from "@/app/components/IntakeForm";
import "./portal.css";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ token: string }> };

export default async function PortalPage({ params }: Params) {
  const { token } = await params;

  let inquiry = null;
  let intake = null;
  let error = null;

  try {
    const db = getDb();
    const [row] = await db
      .select()
      .from(inquiries)
      .where(eq(inquiries.portalToken, token))
      .limit(1);

    if (row) {
      inquiry = row;
      const [intakeRow] = await db
        .select()
        .from(intakeData)
        .where(eq(intakeData.inquiryId, row.id))
        .limit(1);
      intake = intakeRow || null;
    } else {
      error = "Invalid or expired link";
    }
  } catch {
    error = "Could not load your portal — please try again later";
  }

  if (error || !inquiry) {
    return (
      <main className="portal-page">
        <div className="portal-container">
          <div className="portal-error">
            <h1>Link not found</h1>
            <p>{error}</p>
            <Link className="button button-dark" href="/">← Back to home</Link>
          </div>
        </div>
      </main>
    );
  }

  const statusLabels: Record<string, string> = {
    "new": "Inquiry received",
    "intake-sent": "Intake form sent — waiting for you",
    "intake-complete": "Intake complete — preparing your proposal",
    "proposed": "Proposal sent — awaiting your response",
    "booked": "Booked — see you on your wedding day!",
    "archived": "Archived",
  };

  const statusFlow = ["new", "intake-sent", "intake-complete", "proposed", "booked"];
  const currentStatusIndex = statusFlow.indexOf(inquiry.status);

  return (
    <main className="portal-page">
      <div className="portal-container">
        <header className="portal-header">
          <Link href="/" aria-label="Primus Photography home">
            <img src="/images/primus-logo.jpg" alt="Primus Photography" className="portal-logo" />
          </Link>
        </header>

        <div className="portal-welcome">
          <p className="eyebrow">Client portal</p>
          <h1>Welcome, {inquiry.name.split(" ")[0]}!</h1>
          <p>
            {inquiry.weddingDate
              ? `Your wedding date: ${new Date(inquiry.weddingDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`
              : "Let's get your wedding day planned together."}
          </p>
        </div>

        {/* Status tracker */}
        <div className="status-tracker">
          {statusFlow.map((status, i) => (
            <div
              key={status}
              className={i <= currentStatusIndex ? "status-item done" : "status-item"}
            >
              <span className="status-dot">{i < currentStatusIndex ? "✓" : i + 1}</span>
              <span className="status-text">{statusLabels[status]}</span>
            </div>
          ))}
        </div>

        {/* Intake form or completion message */}
        {inquiry.status === "intake-complete" || inquiry.status === "proposed" || inquiry.status === "booked" ? (
          <div className="portal-intake-done">
            <h2>Your intake form is complete!</h2>
            <p>
              {inquiry.status === "proposed"
                ? "We've sent your proposal — check your email for the details."
                : inquiry.status === "booked"
                ? "You're booked! We're so excited to photograph your wedding day. Check your email for next steps."
                : "We're reviewing your details and will send your personalized proposal within 48 hours."}
            </p>
            <a className="button button-dark" href="https://www.instagram.com/primus_inspirations/" target="_blank" rel="noreferrer">
              Follow our work ↗
            </a>
          </div>
        ) : (
          <div className="portal-intake-section">
            <h2>Your intake form</h2>
            <p className="intake-section-intro">
              Fill this out at your own pace — your progress saves automatically.
              Once complete, we&apos;ll prepare your personalized proposal within 48 hours.
            </p>
            <IntakeForm token={token} />
          </div>
        )}

        {/* Contact info */}
        <div className="portal-contact">
          <p>Questions? Text us anytime at (336) 457-2361 or reply to any email we&apos;ve sent.</p>
        </div>
      </div>
    </main>
  );
}