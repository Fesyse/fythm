import { AddToPlaylistDto } from "@/bot/dto/playlist/add-to-playlist.dto"
import { DrizzleAsyncProvider } from "@/db/drizzle.provider"
import { Music, musics } from "@/db/schema"
import { Database } from "@/types"
import { getDefaultEmbedFooter, getUserFromMessage } from "@/utils"
import { YoutubeService } from "@/youtube/youtube.service"
import { SlashCommandPipe } from "@discord-nestjs/common"
import { Handler, IA, SubCommand, MessageEvent } from "@discord-nestjs/core"
import { Inject } from "@nestjs/common"
import { EmbedBuilder, Message } from "discord.js"
import { ShowPlaylistSubCommand } from "./show-playlist.subcommand"
import { LOGO_URL, MAX_MUSICS_IN_PLAYLIST } from "@/constants"

@SubCommand({ name: "add", description: "Add song to playlist." })
export class AddToPlaylistSubCommand {
	constructor(
		@Inject(DrizzleAsyncProvider) private drizzle: Database,
		private youtube: YoutubeService
	) {}

	get addToPlaylistErrorEmbed() {
		const embed = new EmbedBuilder()
			.setTitle("You've reached maximum amount of songs in playlist!")
			.setColor("Red")
			.setDescription(
				"To add more songs you need to either delete one or subscribe to premium.\n\nTo see more about premium subscription write `/subscriptions` command."
			)
			.setFooter(getDefaultEmbedFooter())

		return embed
	}

	@Handler()
	async onAddToPlaylistSubCommand(
		@IA(SlashCommandPipe) dto: AddToPlaylistDto,
		@MessageEvent() message: Message
	) {
		const user = getUserFromMessage(message)
		const playlist = await this.drizzle.query.musics.findMany({
			where: (musics, { eq }) => eq(musics.userId, user.id)
		})
		if (playlist.length === MAX_MUSICS_IN_PLAYLIST)
			return message.reply({
				embeds: [this.addToPlaylistErrorEmbed]
			})

		const songs = await this.youtube.findMusic(dto.song)
		const selectedMusic = songs[0]
		if (!songs.length) return message.reply("Song not found!")

		await this.drizzle.insert(musics).values({
			title: selectedMusic.title,
			thumbnailImageUrl: selectedMusic.thumbnail,
			duration: selectedMusic.duration,
			artist: selectedMusic.artist,
			url: selectedMusic.link,
			userId: user.id
		})
		// showing playlist after adding music to playlist
		await new ShowPlaylistSubCommand(
			this.drizzle,
			this.youtube
		).onShowPlaylistSubCommand(
			message,
			`Successfully added \`${selectedMusic.title}\` song to playlist.`
		)
	}
}
