import { SlashCommandPipe } from "@discord-nestjs/common"
import {
	Command,
	Handler,
	InteractionEvent,
	MessageEvent
} from "@discord-nestjs/core"
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
	Message,
	User
} from "discord.js"

import { PlayDto } from "../dto/play.dto"
import { joinVoiceChannel } from "@discordjs/voice"
import { YoutubeService } from "@/youtube/youtube.service"
import { Music } from "ytubes/dist/types/data"
import { Database } from "@/types"
import { getDefaultEmbedFooter, getUserFromMessage } from "@/utils"
import { EMBED_COLOR, LOGO_URL } from "@/constants"
import { Inject } from "@nestjs/common"
import { DrizzleAsyncProvider } from "@/db/drizzle.provider"

@Command({
	name: "play",
	description: "Plays a song by given query"
})
export class PlayCommand {
	constructor(
		@Inject(DrizzleAsyncProvider) private drizzle: Database,
		private youtubeService: YoutubeService
	) {}

	get playCommandButtonRows() {
		const firstButtonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("volume-down")
				.setLabel("- Vol")
				.setStyle(ButtonStyle.Secondary)
				.setEmoji("🔉"),
			new ButtonBuilder()
				.setCustomId("volume-mute")
				.setLabel("Mute")
				.setStyle(ButtonStyle.Secondary)
				.setEmoji("🔇"),
			new ButtonBuilder()
				.setCustomId("volume-up")
				.setLabel("+ Vol")
				.setStyle(ButtonStyle.Secondary)
				.setEmoji("🔊")
		)
		return [firstButtonRow]
	}
	getPlayCommandEmbed(message: Message, selectedMusic: Music) {
		const user = getUserFromMessage(message)

		const embed = new EmbedBuilder()
			.setColor(EMBED_COLOR)
			.setTitle(`:musical_note:  Playing song \`${selectedMusic.title}\``)
			.setAuthor({
				name: user.displayName,
				iconURL: user.avatarURL() ?? "/img/user.svg",
				url: "https://discord.js.org"
			})
			.setThumbnail(selectedMusic.thumbnail)
			.addFields(
				{
					name: ":mens: Requested by",
					value: user.toString(),
					inline: true
				},
				{
					name: ":clock1: Music duration",
					value: `\`${selectedMusic.duration}\``,
					inline: true
				},
				{
					name: ":copyright: Song author",
					value: `\`${selectedMusic.artist}\``,
					inline: true
				}
			)
			.setTimestamp()
			.setFooter(getDefaultEmbedFooter())
		return embed
	}

	joinVoiceChannel(message: Message) {
		const connection = joinVoiceChannel({
			channelId: message.member.voice.channelId,
			guildId: message.guildId,
			adapterCreator: message.member.voice.guild.voiceAdapterCreator
		})

		return connection
	}

	@Handler()
	async onPlayCommand(
		@InteractionEvent(SlashCommandPipe) dto: PlayDto,
		@MessageEvent() message: Message
	) {
		const voice = message.member.voice
		if (!voice.channelId)
			return await message.reply(
				`You must be in a voice channel in order to play music.`
			)

		let isBotConnected = false
		const voiceMembers = message.guild.channels.cache.get(
			voice.channelId
		).members

		if (voiceMembers instanceof Map) {
			voiceMembers.map(member => {
				if (!member.user.bot) return
				isBotConnected = member.user.id === process.env.DISCORD_APP_ID
			})
		}

		if (!isBotConnected) this.joinVoiceChannel(message)
		const music = await this.youtubeService.findMusic(dto.song)
		const selectedMusic = music[0]
		if (!music.length) return message.reply("Song not found!")

		const embed = this.getPlayCommandEmbed(message, selectedMusic)

		await message.reply({
			embeds: [embed],
			components: [...this.playCommandButtonRows]
		})
	}
}
