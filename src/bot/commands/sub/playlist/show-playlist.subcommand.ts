import { EMBED_COLOR, LOGO_URL, MAX_MUSICS_IN_PLAYLIST } from "@/constants"
import { DrizzleAsyncProvider } from "@/db/drizzle.provider"
import { Music } from "@/db/schema"
import { Database } from "@/types"
import { getDefaultEmbedFooter, getUserFromMessage } from "@/utils"
import { YoutubeService } from "@/youtube/youtube.service"
import { Handler, MessageEvent, SubCommand } from "@discord-nestjs/core"
import { Inject } from "@nestjs/common"
import { EmbedBuilder, Message } from "discord.js"
import { PlayCommand } from "../../play.command"

@SubCommand({ name: "show", description: "Show your playlist." })
export class ShowPlaylistSubCommand {
	constructor(
		@Inject(DrizzleAsyncProvider) private drizzle: Database,
		private youtubeService: YoutubeService
	) {}

	private getShowPlaylistEmbed(playlist: Music[], description?: string) {
		const embed = new EmbedBuilder()
			.setTitle(":musical_score:  Your playlist")
			.setColor(EMBED_COLOR)
			.setFooter(
				getDefaultEmbedFooter(
					`${playlist.length}/${MAX_MUSICS_IN_PLAYLIST} songs are in playlist.`
				)
			)
		if (description) embed.setDescription(description)
		playlist.map(music => {
			embed.addFields({
				name: "Name",
				value: music.title,
				inline: true
			})
			embed.addFields({
				name: "Author",
				value: music.artist,
				inline: true
			})
			embed.addFields({
				name: "Duration",
				value: music.duration,
				inline: true
			})
		})
		return embed
	}

	@Handler()
	async onShowPlaylistSubCommand(
		@MessageEvent() message: Message,
		description?: string
	) {
		const user = getUserFromMessage(message)
		const playlist = await this.drizzle.query.musics.findMany({
			where: (music, { eq }) => eq(music.userId, user.id)
		})
		const embed = this.getShowPlaylistEmbed(playlist, description)

		message.reply({
			embeds: [embed]
		})
	}
}
