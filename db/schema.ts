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
  status: text("status").notNull().default("new"), // new | contacted | booked | archived
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
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