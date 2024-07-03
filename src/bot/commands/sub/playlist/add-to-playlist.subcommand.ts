import { AddToPlaylistDto } from "@/bot/dto/playlist/add-to-playlist.dto"
import { DrizzleAsyncProvider } from "@/db/drizzle.provider"
import { Database } from "@/types"
import { getUserFromMessage } from "@/utils"
import { SlashCommandPipe } from "@discord-nestjs/common"
import { Handler, IA, SubCommand, MessageEvent } from "@discord-nestjs/core"
import { Inject } from "@nestjs/common"
import { Message } from "discord.js"

@SubCommand({ name: "add", description: "Add song to playlist." })
export class AddToPlaylistSubCommand {
	constructor(@Inject(DrizzleAsyncProvider) private drizzle: Database) {}
	@Handler()
	onAddToPlaylistSubCommand(
		@IA(SlashCommandPipe) dto: AddToPlaylistDto,
		@MessageEvent() message: Message
	) {
		const user = getUserFromMessage(message)
		return "susnyare"
	}
}
