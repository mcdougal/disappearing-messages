/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-body-style */
import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// -----------------------------------------------------------------------------
// Tables
// -----------------------------------------------------------------------------

export const user = pgTable(`user`, {
  avatarSrc: varchar(`avatar_src`, { length: 256 }).notNull(),
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  id: text(`id`).primaryKey(),
  name: varchar(`name`, { length: 256 }).notNull(),
  sessionId: varchar(`session_id`, { length: 256 }).unique().notNull(),
});

const userId = () => user.id;

export const post = pgTable(`post`, {
  authorId: text(`author_id`).references(userId).notNull(),
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  expiresAt: timestamp(`expires_at`).notNull(),
  id: text(`id`).primaryKey(),
  numUpvotes: integer(`num_upvotes`).default(0).notNull(),
  postedAt: timestamp(`posted_at`).notNull(),
  text: varchar(`text`, { length: 2048 }).notNull(),
});

const postId = () => post.id;

export const comment = pgTable(`comment`, {
  authorId: text(`author_id`).references(userId).notNull(),
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  id: text(`id`).primaryKey(),
  postId: text(`post_id`).references(postId).notNull(),
  text: varchar(`text`, { length: 2048 }).notNull(),
});

// -----------------------------------------------------------------------------
// Relations
// -----------------------------------------------------------------------------

export const userRelations = relations(user, ({ many }) => ({
  posts: many(post),
}));

export const postRelations = relations(post, ({ many, one }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
  }),
  comments: many(comment),
}));

export const commentRelations = relations(comment, ({ one }) => ({
  author: one(user, {
    fields: [comment.authorId],
    references: [user.id],
  }),
  post: one(post, {
    fields: [comment.postId],
    references: [post.id],
  }),
}));
