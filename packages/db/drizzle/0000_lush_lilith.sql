CREATE SCHEMA "disappearing_messages";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "disappearing_messages"."comment" (
	"author_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"post_id" text NOT NULL,
	"text" varchar(2048) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "disappearing_messages"."post" (
	"author_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"posted_at" timestamp NOT NULL,
	"text" varchar(2048) NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "disappearing_messages"."upvote" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"post_id" text NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "upvote_post_id_user_id_pk" PRIMARY KEY("post_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "disappearing_messages"."user" (
	"avatar_src" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"session_id" varchar(256) NOT NULL,
	CONSTRAINT "user_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "disappearing_messages"."comment" ADD CONSTRAINT "comment_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "disappearing_messages"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "disappearing_messages"."comment" ADD CONSTRAINT "comment_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "disappearing_messages"."post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "disappearing_messages"."post" ADD CONSTRAINT "post_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "disappearing_messages"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "disappearing_messages"."upvote" ADD CONSTRAINT "upvote_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "disappearing_messages"."post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "disappearing_messages"."upvote" ADD CONSTRAINT "upvote_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "disappearing_messages"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
