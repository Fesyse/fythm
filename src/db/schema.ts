import { sql } from "drizzle-orm"
import { pgTable, serial, text, makePgArray, jsonb } from "drizzle-orm/pg-core"

const music = pgTable("music", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	duration: text("duration").notNull(),
	artist: text("artist").notNull(),
	url: text("url").notNull()
})
type Music = typeof music.$inferSelect

const playlist = pgTable("playlist", {
	id: serial("id").primaryKey(),
	music: jsonb("music")
		.notNull()
		.$type<Music[]>()
		.default(sql`'[]'::jsonb`)
})
type Playlist = typeof playlist.$inferSelect

const user = pgTable("user", {
	id: serial("id").primaryKey(),
	playlist: jsonb("playlist").$type<Playlist>()
})
type User = typeof user.$inferSelect

export { user, playlist, music, Music, Playlist, User }
