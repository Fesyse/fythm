import { AddToPlaylistDto } from "@/bot/dto/playlist/add-to-playlist.dto"
import { SlashCommandPipe } from "@discord-nestjs/common"
import { Handler, IA, SubCommand } from "@discord-nestjs/core"

@SubCommand({ name: "add", description: "Add song to playlist." })
export class AddToPlaylistSubCommand {
	@Handler()
	onAddToPlaylistSubCommand(@IA(SlashCommandPipe) dto: AddToPlaylistDto) {
		return "susnyare"
	}
}
