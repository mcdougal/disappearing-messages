ALTER TABLE "user" ADD COLUMN "session_id" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_session_id_unique" UNIQUE("session_id");