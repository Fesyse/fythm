import { relations, sql } from "drizzle-orm"
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"

const user = pgTable("user", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull(),
	avatarUrl: text("avatar_url")
})

const playlist = pgTable("playlist", {
	id: serial("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade", onUpdate: "restrict" })
		.unique() // This ensures one-to-one relationship
})

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

// Define relations
const userRelations = relations(user, ({ one }) => ({
	playlist: one(playlist, {
		fields: [user.id],
		references: [playlist.userId]
	})
}))

const playlistRelations = relations(playlist, ({ one, many }) => ({
	user: one(user, {
		fields: [playlist.userId],
		references: [user.id]
	}),
	music: many(music)
}))

const musicRelations = relations(music, ({ one }) => ({
	playlist: one(playlist, {
		fields: [music.playlistId],
		references: [playlist.id]
	})
}))

type Music = typeof music.$inferSelect
type Playlist = typeof playlist.$inferSelect
type User = typeof user.$inferSelect

export {
	user,
	playlist,
	music,
	Music,
	Playlist,
	User,
	userRelations,
	playlistRelations,
	musicRelations
}
