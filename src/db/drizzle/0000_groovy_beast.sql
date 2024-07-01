CREATE TABLE IF NOT EXISTS "music" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"duration" text NOT NULL,
	"artist" text NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "playlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"music" jsonb DEFAULT '[]'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"playlist" jsonb
);
