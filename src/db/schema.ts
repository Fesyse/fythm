import { relations, sql } from "drizzle-orm"
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core"

const users = pgTable("users", {
	id: text("id").notNull().primaryKey(),
	subscriptionExpireDate: timestamp("subscription_expire_date"),
	username: text("username").notNull(),
	avatarUrl: text("avatar_url")
})

const musics = pgTable("musics", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	duration: text("duration").notNull(),
	artist: text("artist").notNull(),
	url: text("url").notNull(),
	thumbnailImageUrl: text("thumbnail_image_url").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade", onUpdate: "restrict" })
})

// Define relations
const usersRelations = relations(users, ({ many }) => ({
	musics: many(musics)
}))

const musicsRelations = relations(musics, ({ one }) => ({
	user: one(users, {
		fields: [musics.userId],
		references: [users.id]
	})
}))

type Music = typeof musics.$inferSelect
type User = typeof users.$inferSelect

export { users, musics, Music, User, usersRelations, musicsRelations }
