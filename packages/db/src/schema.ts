/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable arrow-body-style */
import { relations } from 'drizzle-orm';
import {
  pgTable,
  primaryKey,
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
  postedAt: timestamp(`posted_at`).notNull(),
  text: varchar(`text`, { length: 2048 }).notNull(),
  updatedAt: timestamp(`updated_at`).notNull(),
});

const postId = () => post.id;

export const comment = pgTable(`comment`, {
  authorId: text(`author_id`).references(userId).notNull(),
  createdAt: timestamp(`created_at`).defaultNow().notNull(),
  id: text(`id`).primaryKey(),
  postId: text(`post_id`).references(postId).notNull(),
  text: varchar(`text`, { length: 2048 }).notNull(),
});

export const upvote = pgTable(
  `upvote`,
  {
    createdAt: timestamp(`created_at`).defaultNow().notNull(),
    postId: text(`post_id`).references(postId).notNull(),
    userId: text(`user_id`).references(userId).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.userId] }),
  })
);

// -----------------------------------------------------------------------------
// Relations
// -----------------------------------------------------------------------------

export const userRelations = relations(user, ({ many }) => ({
  comments: many(comment),
  posts: many(post),
  upvotes: many(upvote),
}));

export const postRelations = relations(post, ({ many, one }) => ({
  author: one(user, { fields: [post.authorId], references: [user.id] }),
  comments: many(comment),
  upvotes: many(upvote),
}));

export const commentRelations = relations(comment, ({ one }) => ({
  author: one(user, { fields: [comment.authorId], references: [user.id] }),
  post: one(post, { fields: [comment.postId], references: [post.id] }),
}));

export const upvoteRelations = relations(upvote, ({ one }) => ({
  post: one(post, { fields: [upvote.postId], references: [post.id] }),
  user: one(user, { fields: [upvote.userId], references: [user.id] }),
}));
