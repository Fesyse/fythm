import { DiscordModule } from "@discord-nestjs/core"
import { Module } from "@nestjs/common"

import { PlayCommand } from "@/bot/commands/play.command"
import { PlaylistCommand } from "@/bot/commands/playlist.command"
import { YoutubeService } from "@/youtube/youtube.service"

@Module({
	imports: [DiscordModule.forFeature()],
	providers: [YoutubeService, PlayCommand, PlaylistCommand]
})
export class BotModule {}
