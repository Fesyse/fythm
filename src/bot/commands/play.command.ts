import { SlashCommandPipe } from "@discord-nestjs/common"
import {
	Command,
	EventParams,
	Handler,
	InteractionEvent,
	MessageEvent
} from "@discord-nestjs/core"
import { ClientEvents, Message } from "discord.js"

import { PlayDto } from "../dto/play.dto"
import { joinVoiceChannel } from "@discordjs/voice"
import { YoutubeService } from "@/youtube/youtube.service"
import { getImageSizes } from "@/utils"

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

		const imageSizes = getImageSizes(
			"https://i.ytimg.com/vi/J8NKwTYkDH8/maxresdefault.jpg"
		)
		console.log(imageSizes)
		message.reply({
			embeds: [
				{
					image: {
						url: "https://i.ytimg.com/vi/J8NKwTYkDH8/maxresdefault.jpg",
						width: imageSizes.width / 10,
						height: imageSizes.height / 10
					},
					description: `**Started playing** [${music[0].title}](${music[0].link}).`
				}
			]
		})
	}
}
