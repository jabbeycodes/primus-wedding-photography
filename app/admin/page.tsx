import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { getDb } from "@/db";
import { inquiries, intakeData } from "@/db/schema";
import "./admin.css";

export const dynamic = "force-dynamic";

type IntakeRow = typeof intakeData.$inferSelect;
type InquiryRow = typeof inquiries.$inferSelect;

function formatField(label: string, value: string | null | undefined): string | null {
  if (!value || value.trim() === "") return null;
  if (label === "Add-ons") {
    try { return JSON.parse(value).join(", "); } catch { return value; }
  }
  if (label === "Payment method") {
    const labels: Record<string, string> = {
      cashapp: "Cash App ($primus10)",
      zelle: "Zelle (336) 457-2361 — Joshua Abbey",
    };
    return labels[value] || value;
  }
  if (label === "Payment plan") {
    const labels: Record<string, string> = {
      full: "Full payment upfront",
      "2-part": "2-part (deposit + balance)",
      "3-part": "3-part (deposit + 2 installments)",
      custom: "Custom — let's discuss",
    };
    return labels[value] || value;
  }
  return value;
}

function IntakeDetails({ intake, inquiry }: { intake: IntakeRow; inquiry: InquiryRow }) {
  const sections: { title: string; fields: [string, keyof IntakeRow][] }[] = [
    {
      title: "Logistics",
      fields: [
        ["Partner's name", "partnerName"],
        ["Mailing address", "bestAddress"],
        ["Ceremony start", "ceremonyStartTime"],
        ["Reception start", "receptionStartTime"],
        ["Getting-ready location", "gettingReadyLocation"],
        ["Reception venue", "receptionVenue"],
        ["Guest count", "guestCount"],
        ["First look", "firstLook"],
        ["Send-off type", "sendOffType"],
      ],
    },
    {
      title: "Coverage & Moments",
      fields: [
        ["Must-capture moments", "mustCaptureMoments"],
        ["Family portrait list", "familyPortraitList"],
        ["Bridal party size", "bridalPartySize"],
        ["Cultural traditions", "culturalTraditions"],
        ["Planned surprises", "plannedSurprises"],
        ["Add-ons", "addOns"],
        ["Engagement session", "engagementSession"],
      ],
    },
    {
      title: "Style & Vision",
      fields: [
        ["Photography style", "photographyStyle"],
        ["Must-have shots", "mustHaveShots"],
        ["Shots to avoid", "shotsToAvoid"],
        ["Color palette", "colorPalette"],
        ["Inspiration links", "inspirationLinks"],
        ["Self-conscious areas", "selfConsciousAreas"],
      ],
    },
    {
      title: "Vendors & Day-Of",
      fields: [
        ["Wedding planner", "weddingPlanner"],
        ["Coordinator", "coordinator"],
        ["DJ", "dj"],
        ["Officiant", "officiant"],
        ["Videographer", "videographer"],
        ["Venue contact", "venueContact"],
        ["Day-of contact", "dayOfContact"],
        ["Parking notes", "parkingNotes"],
        ["Getting-ready room", "gettingReadyRoomNotes"],
        ["Venue restrictions", "venueRestrictions"],
        ["Photographer meals", "photographerMeals"],
      ],
    },
    {
      title: "Contract & Payment",
      fields: [
        ["Legal name 1", "legalName1"],
        ["Legal name 2", "legalName2"],
        ["Billing address", "billingAddress"],
        ["Payment method", "paymentMethod"],
        ["Payment plan", "paymentPlan"],
      ],
    },
  ];

  return (
    <div className="intake-details">
      {sections.map((section) => {
        const hasData = section.fields.some(([, key]) => formatField("", intake[key] as string));
        if (!hasData) return null;
        return (
          <div key={section.title} className="intake-section">
            <h3>{section.title}</h3>
            <dl>
              {section.fields.map(([label, key]) => {
                const val = formatField(label, intake[key] as string);
                if (!val) return null;
                return (
                  <div key={key}>
                    <dt>{label}</dt>
                    <dd>{val}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
        );
      })}
    </div>
  );
}

export default async function AdminPage() {
  let rows: InquiryRow[] = [];
  const intakes: Record<number, IntakeRow | null> = {};
  let error = null;

  try {
    const db = getDb();
    rows = await db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt), desc(inquiries.id))
      .limit(100);

    // Fetch intake data for all inquiries
    for (const row of rows) {
      const [intake] = await db
        .select()
        .from(intakeData)
        .where(eq(intakeData.inquiryId, row.id))
        .limit(1);
      intakes[row.id] = intake || null;
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load inquiries";
  }

  const statusColors: Record<string, string> = {
    "new": "badge-new",
    "intake-sent": "badge-sent",
    "intake-complete": "badge-complete",
    "proposed": "badge-proposed",
    "booked": "badge-booked",
    "archived": "badge-archived",
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <h1>Primus Photography — Inquiries Dashboard</h1>
        <Link href="/" className="admin-home-link">← Back to site</Link>
      </header>

      {error && (
        <div className="admin-error">
          <p>{error}</p>
          <p className="admin-error-hint">
            Make sure the database migration has been applied. Run:
            <code>npx wrangler d1 execute primus-photography --file=drizzle/0000_large_genesis.sql</code>
          </p>
        </div>
      )}

      {!error && rows.length === 0 && (
        <div className="admin-empty">
          <p>No inquiries yet. When couples submit the contact form, they&apos;ll appear here.</p>
        </div>
      )}

      <div className="admin-list">
        {rows.map((inquiry) => {
          const intake = intakes[inquiry.id];
          return (
            <details key={inquiry.id} className="admin-card">
              <summary className="admin-card-summary">
                <div className="admin-card-header">
                  <strong>{inquiry.name}</strong>
                  {inquiry.weddingDate && (
                    <span className="admin-date">
                      {new Date(inquiry.weddingDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  )}
                  <span className={`admin-badge ${statusColors[inquiry.status] || ""}`}>
                    {inquiry.status}
                  </span>
                </div>
                <div className="admin-card-meta">
                  <span>{inquiry.email}</span>
                  {inquiry.venue && <span>· {inquiry.venue}</span>}
                  {inquiry.package && <span>· {inquiry.package}</span>}
                </div>
              </summary>

              <div className="admin-card-body">
                <div className="admin-inquiry">
                  <h3>Original Inquiry</h3>
                  <dl>
                    <div><dt>Name</dt><dd>{inquiry.name}</dd></div>
                    <div><dt>Email</dt><dd>{inquiry.email}</dd></div>
                    {inquiry.phone && <div><dt>Phone</dt><dd>{inquiry.phone}</dd></div>}
                    {inquiry.weddingDate && <div><dt>Wedding date</dt><dd>{inquiry.weddingDate}</dd></div>}
                    {inquiry.venue && <div><dt>Venue</dt><dd>{inquiry.venue}</dd></div>}
                    {inquiry.package && <div><dt>Package</dt><dd>{inquiry.package}</dd></div>}
                    {inquiry.referralSource && <div><dt>Found us via</dt><dd>{inquiry.referralSource}</dd></div>}
                    {inquiry.message && <div><dt>Message</dt><dd>{inquiry.message}</dd></div>}
                  </dl>
                </div>

                {intake ? (
                  <IntakeDetails intake={intake} inquiry={inquiry} />
                ) : (
                  <div className="admin-no-intake">
                    <p>Intake form not yet completed.</p>
                    <p className="admin-portal-link">
                      Portal link: <code>/portal/{inquiry.portalToken}</code>
                    </p>
                  </div>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </main>
  );
}