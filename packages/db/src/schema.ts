import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const messages = pgTable(`messages`, {
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  expiresAt: timestamp(`expires_at`).notNull(),
  id: text(`id`).primaryKey(),
  numUpvotes: integer(`num_upvotes`).default(0).notNull(),
  text: varchar(`text`, { length: 256 }).notNull(),
  userAvatarSrc: varchar(`user_avatar_src`, { length: 256 }).notNull(),
  userName: varchar(`user_name`, { length: 256 }).notNull(),
});
