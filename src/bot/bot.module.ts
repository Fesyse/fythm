import { DiscordModule } from "@discord-nestjs/core"
import { Module } from "@nestjs/common"

import { PlayCommand } from "@/bot/commands/play.command"
import { PlaylistCommand } from "@/bot/commands/playlist.command"
import { YoutubeService } from "@/youtube/youtube.service"
import { AddToPlaylistSubCommand } from "./commands/sub/playlist/add-to-playlist.subcommand"
import { ShowPlaylistSubCommand } from "./commands/sub/playlist/show-playlist.subcommand"
import { drizzleProvider } from "@/db/drizzle.provider"

@Module({
	imports: [DiscordModule.forFeature()],
	providers: [
		...drizzleProvider,
		YoutubeService,
		PlayCommand,
		PlaylistCommand,
		ShowPlaylistSubCommand,
		AddToPlaylistSubCommand
	]
})
export class BotModule {}
