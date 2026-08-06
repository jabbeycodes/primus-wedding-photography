import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Wedding inquiry submissions from the contact form
export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  weddingDate: text("wedding_date"),
  venue: text("venue"),
  package: text("package"),
  message: text("message").notNull().default(""),
  // new | intake-sent | intake-complete | proposed | booked | archived
  status: text("status").notNull().default("new"),
  // Secure random token for client portal access (no login required)
  portalToken: text("portal_token"),
  // How they found us (google, instagram, referral, etc.)
  referralSource: text("referral_source"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Detailed intake questionnaire data (one-to-one with inquiries)
export const intakeData = sqliteTable("intake_data", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  inquiryId: integer("inquiry_id").notNull(),
  // Step 1: Logistics
  partnerName: text("partner_name"),
  bestAddress: text("best_address"),
  ceremonyStartTime: text("ceremony_start_time"),
  receptionStartTime: text("reception_start_time"),
  gettingReadyLocation: text("getting_ready_location"),
  receptionVenue: text("reception_venue"),
  guestCount: text("guest_count"),
  firstLook: text("first_look"), // yes | no | undecided
  sendOffType: text("send_off_type"),
  // Step 2: Coverage
  mustCaptureMoments: text("must_capture_moments"),
  familyPortraitList: text("family_portrait_list"),
  bridalPartySize: text("bridal_party_size"),
  culturalTraditions: text("cultural_traditions"),
  plannedSurprises: text("planned_surprises"),
  addOns: text("add_ons"), // JSON array of selected add-ons
  engagementSession: text("engagement_session"), // yes | no | maybe
  // Step 3: Style
  photographyStyle: text("photography_style"), // editorial | documentary | fine-art | classic | mixed
  mustHaveShots: text("must_have_shots"),
  shotsToAvoid: text("shots_to_avoid"),
  colorPalette: text("color_palette"),
  inspirationLinks: text("inspiration_links"),
  selfConsciousAreas: text("self_conscious_areas"),
  // Step 4: Vendors & Logistics
  weddingPlanner: text("wedding_planner"),
  coordinator: text("coordinator"),
  dj: text("dj"),
  officiant: text("officiant"),
  videographer: text("videographer"),
  venueContact: text("venue_contact"),
  dayOfContact: text("day_of_contact"),
  parkingNotes: text("parking_notes"),
  gettingReadyRoomNotes: text("getting_ready_room_notes"),
  venueRestrictions: text("venue_restrictions"),
  photographerMeals: text("photographer_meals"), // yes | no
  // Step 5: Contract
  legalName1: text("legal_name_1"),
  legalName2: text("legal_name_2"),
  billingAddress: text("billing_address"),
  paymentMethod: text("payment_method"), // card | ach | check
  paymentPlan: text("payment_plan"), // full | 2-part | 3-part | custom
  // Metadata
  completedAt: text("completed_at"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Lightweight leads from quick-capture forms (newsletter, date checker, etc.)
export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  source: text("source").notNull(), // newsletter | date-checker | sticky-cta | packages
  weddingDate: text("wedding_date"),
  note: text("note"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});