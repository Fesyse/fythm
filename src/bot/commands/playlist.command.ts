import { Command } from "@discord-nestjs/core"
import { AddToPlaylistSubCommand } from "./sub/playlist/add-to-playlist.subcommand"
import { ShowPlaylistSubCommand } from "./sub/playlist/show-playlist.subcommand"

@Command({
	name: "playlist",
	description: "Playlist that containts your favorite songs.",
	include: [ShowPlaylistSubCommand, AddToPlaylistSubCommand]
})
export class PlaylistCommand {}
