ALTER TABLE "comment" ALTER COLUMN "author_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comment" ALTER COLUMN "post_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "author_id" SET NOT NULL;