import { DrizzleService } from "@/db/drizzle.service"
import { Database } from "@/types"
import { getUserFromMessage } from "@/utils"
import { YoutubeService } from "@/youtube/youtube.service"
import { Handler, MessageEvent, SubCommand } from "@discord-nestjs/core"
import { Message } from "discord.js"

@SubCommand({ name: "show", description: "Show your playlist." })
export class ShowPlaylistSubCommand {
	constructor(
		private drizzle: DrizzleService,
		private youtubeService: YoutubeService
	) {}
	@Handler()
	async onShowPlaylistSubCommand(@MessageEvent() message: Message) {
		const user = getUserFromMessage(message)
		try {
			const playlist = await this.drizzle.getDb().query.playlist.findFirst({
				where: (playlist, { eq }) => eq(playlist.userId, user.id),
				with: {
					music: true
				}
			})
			console.log(playlist)
			return "successfully queried playlist"
		} catch {
			return "susnyuara"
		}
	}
}
