import { SlashCommandPipe } from "@discord-nestjs/common"
import {
	Command,
	EventParams,
	Handler,
	InteractionEvent,
	MessageEvent
} from "@discord-nestjs/core"
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ClientEvents,
	EmbedBuilder,
	Message,
	User
} from "discord.js"

import { PlayDto } from "../dto/play.dto"
import { joinVoiceChannel } from "@discordjs/voice"
import { YoutubeService } from "@/youtube/youtube.service"
import { imageSize } from "@/utils"
import { Music } from "ytubes/dist/types/data"

@Command({
	name: "play",
	description: "Plays a song"
})
export class PlayCommand {
	constructor(private youtubeService: YoutubeService) {}

	getPlayCommandEmbed(message: Message, selectedMusic: Music) {
		let user: User
		if ("user" in message) user = message.user as typeof message.author
		else user = message.author

		const embed = new EmbedBuilder()
			.setColor("#fff0db")
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
			.setFooter({
				text: "Fythm",
				iconURL: "https://i.ibb.co/W6c32cx/fythm-logo.png"
			})
		return embed
	}
	getPlayCommandActionButtonRows() {
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

	joinVoiceChannel(message: Message) {
		const connection = joinVoiceChannel({
			channelId: message.channelId,
			guildId: message.guildId,
			adapterCreator: message.guild.voiceAdapterCreator
		})

		return connection
	}

	@Handler()
	async onPlayCommand(
		@InteractionEvent(SlashCommandPipe) dto: PlayDto,
		@EventParams() args: ClientEvents["interactionCreate"],
		@MessageEvent() message: Message
	) {
		const voice = message.member.voice
		if (!voice.channelId)
			return await message.reply(
				`You must be in a voice channel in order to play music.`
			)

		const connection = joinVoiceChannel({
			channelId: message.channelId,
			guildId: message.guildId,
			adapterCreator: message.guild.voiceAdapterCreator
		})
		const music = await this.youtubeService.findMusic(dto.song)
		const selectedMusic = music[0]
		if (!music.length) return `No music found with given prompt.`

		const embed = this.getPlayCommandEmbed(message, selectedMusic)

		await message.reply({
			embeds: [embed],
			components: [...this.getPlayCommandActionButtonRows()]
		})
	}
}
