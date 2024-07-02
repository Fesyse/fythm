import { DiscordModule } from "@discord-nestjs/core"
import { Module } from "@nestjs/common"

import { PlayCommand } from "@/bot/commands/play.command"
import { PlaylistCommand } from "@/bot/commands/playlist.command"
import { YoutubeService } from "@/youtube/youtube.service"
import { DrizzleService } from "@/db/drizzle.service"
import { AddToPlaylistSubCommand } from "./commands/sub/add-to-playlist.subcommand"

@Module({
	imports: [DiscordModule.forFeature()],
	providers: [
		YoutubeService,
		DrizzleService,
		PlayCommand,
		PlaylistCommand,
		AddToPlaylistSubCommand
	]
})
export class BotModule {}
