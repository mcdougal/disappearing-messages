import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const messages = pgTable(`messages`, {
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  expiresAt: timestamp(`expires_at`).notNull(),
  id: serial(`id`).primaryKey(),
  text: varchar(`text`, { length: 256 }),
});
