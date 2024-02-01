import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const messages = pgTable(`messages`, {
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  expiresAt: timestamp(`expires_at`).notNull(),
  id: text(`id`).primaryKey(),
  text: varchar(`text`, { length: 256 }).notNull(),
});
