import { relations, sql } from "drizzle-orm"
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"

const music = pgTable("music", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	duration: text("duration").notNull(),
	artist: text("artist").notNull(),
	url: text("url").notNull(),
	playlistId: integer("playlist_id")
		.notNull()
		.references(() => playlist.id)
})
type Music = typeof music.$inferSelect

const playlist = pgTable("playlist", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade", onUpdate: "restrict" })
})
type Playlist = typeof playlist.$inferSelect

const user = pgTable("user", {
	id: integer("id").notNull().primaryKey(),
	username: text("username").notNull(),
	avatarUrl: text("avatar_url"),
	playlistId: integer("playlist_id").references(() => playlist.id, {
		onDelete: "cascade",
		onUpdate: "restrict"
	})
})
type User = typeof user.$inferSelect

const userRelations = relations(user, ({ one }) => ({
	playlist: one(playlist)
}))
const playlistRelations = relations(playlist, ({ one }) => ({
	user: one(user)
}))

export { user, playlist, music, Music, Playlist, User }
