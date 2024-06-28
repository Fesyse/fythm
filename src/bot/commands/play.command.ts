import { SlashCommandPipe } from "@discord-nestjs/common"
import {
	Command,
	EventParams,
	Handler,
	InteractionEvent,
	MessageEvent
} from "@discord-nestjs/core"
import { ClientEvents, EmbedBuilder, Message } from "discord.js"

import { PlayDto } from "../dto/play.dto"
import { joinVoiceChannel } from "@discordjs/voice"
import { YoutubeService } from "@/youtube/youtube.service"
import { imageSize } from "@/utils"

@Command({
	name: "play",
	description: "Plays a song"
})
export class PlayCommand {
	constructor(private youtubeService: YoutubeService) {}

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

		// @ts-ignore
		const user = message.author ?? (message.user as typeof message.author)

		const embed = new EmbedBuilder()
			.setColor(0x0099ff)
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

		message.reply({
			embeds: [embed]
		})
	}
}
