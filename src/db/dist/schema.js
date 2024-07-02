"use strict";
exports.__esModule = true;
exports.music = exports.playlist = exports.user = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
var music = pg_core_1.pgTable("music", {
    id: pg_core_1.serial("id").primaryKey(),
    title: pg_core_1.text("title").notNull(),
    duration: pg_core_1.text("duration").notNull(),
    artist: pg_core_1.text("artist").notNull(),
    url: pg_core_1.text("url").notNull(),
    playlistId: pg_core_1.integer("playlist_id")
        .notNull()
        .references(function () { return playlist.id; })
});
exports.music = music;
var playlist = pg_core_1.pgTable("playlist", {
    id: pg_core_1.serial("id").primaryKey(),
    userId: pg_core_1.integer("user_id")
        .notNull()
        .references(function () { return user.id; }, { onDelete: "cascade", onUpdate: "restrict" })
});
exports.playlist = playlist;
var user = pg_core_1.pgTable("user", {
    id: pg_core_1.integer("id").notNull().primaryKey(),
    username: pg_core_1.text("username").notNull(),
    avatarUrl: pg_core_1.text("avatar_url"),
    playlistId: pg_core_1.integer("playlist_id").references(function () { return playlist.id; }, {
        onDelete: "cascade",
        onUpdate: "restrict"
    })
});
exports.user = user;
var userRelations = drizzle_orm_1.relations(user, function (_a) {
    var one = _a.one;
    return ({
        playlist: one(playlist)
    });
});
var playlistRelations = drizzle_orm_1.relations(playlist, function (_a) {
    var one = _a.one;
    return ({
        user: one(user)
    });
});
