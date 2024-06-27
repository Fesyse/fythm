import { DiscordModule } from "@discord-nestjs/core"
import { Module } from "@nestjs/common"

import { PlayCommand } from "@/bot/commands/play.command"
import { PlaylistCommand } from "@/bot/commands/playlist.command"

@Module({
	imports: [DiscordModule.forFeature()],
	providers: [PlayCommand, PlaylistCommand]
})
export class BotModule {}
