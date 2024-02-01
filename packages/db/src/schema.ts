import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const messages = pgTable(`messages`, {
  id: serial(`id`).primaryKey(),
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  text: varchar(`text`, { length: 256 }),
});
