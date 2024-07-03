import { EMBED_COLOR, LOGO_URL, MAX_MUSICS_IN_PLAYLIST } from "@/constants"
import { DrizzleService } from "@/db/drizzle.service"
import { Music } from "@/db/schema"
import { getUserFromMessage } from "@/utils"
import { YoutubeService } from "@/youtube/youtube.service"
import { Handler, MessageEvent, SubCommand } from "@discord-nestjs/core"
import { EmbedBuilder, Message } from "discord.js"

@SubCommand({ name: "show", description: "Show your playlist." })
export class ShowPlaylistSubCommand {
	constructor(
		private drizzle: DrizzleService,
		private youtubeService: YoutubeService
	) {}

	private getShowPlaylistEmbed(playlist: Music[]) {
		const embed = new EmbedBuilder()
			.setTitle(":musical_score:  Your playlist")
			.setColor(EMBED_COLOR)
			.setFooter({
				text: `Fythm - ${playlist.length}/${MAX_MUSICS_IN_PLAYLIST} songs are in playlist.`,
				iconURL: LOGO_URL
			})
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
	async onShowPlaylistSubCommand(@MessageEvent() message: Message) {
		const user = getUserFromMessage(message)
		const playlist = await this.drizzle.getDb().query.musics.findMany({
			where: (music, { eq }) => eq(music.userId, user.id)
		})
		const embed = this.getShowPlaylistEmbed([...playlist, ...playlist])

		message.reply({
			embeds: [embed]
		})
	}
}
