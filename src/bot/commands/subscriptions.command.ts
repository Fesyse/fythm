import { EMBED_COLOR, MAX_MUSICS_IN_PLAYLIST } from "@/constants"
import { getDefaultEmbedFooter } from "@/utils"
import { Command, Handler, MessageEvent } from "@discord-nestjs/core"
import { EmbedBuilder, Message } from "discord.js"
@Command({
	name: "subscriptions",
	description:
		"See all subscriptions, that can enchance your musical experience."
})
export class SubscriptionsCommand {
	get freeTierEmbed() {
		const benefits: string =
			":white_check_mark:  " +
			[
				"Play songs in vc",
				`Up to ${MAX_MUSICS_IN_PLAYLIST} songs in playlist`
			].join("\n:white_check_mark:  ")
		return new EmbedBuilder()
			.setColor(EMBED_COLOR)
			.setTitle(":black_circle:  Free tier  :black_circle:")
			.setDescription("Default tier that everyone have access to.")
			.addFields({
				name: "Benefits",
				value: benefits
			})
			.setFooter(getDefaultEmbedFooter("Free tier"))
	}
	get premiumTierEmbed() {
		const benefits: string =
			":white_check_mark:  " +
			[
				"All benefits from free tier  :arrow_up:",
				"Unlimited amount of songs in playlist"
			].join("\n:white_check_mark:  ")
		return new EmbedBuilder()
			.setColor(EMBED_COLOR)
			.setTitle(":star:  Premium tier  :star:")
			.setDescription("Premium tier that enchanes your musical experience.")
			.addFields({
				name: "Benefits",
				value: benefits
			})
			.setFooter(getDefaultEmbedFooter("Premium tier"))
	}

	@Handler()
	async onSubscriptionsCommand(@MessageEvent() message: Message) {
		message.reply({
			embeds: [this.freeTierEmbed, this.premiumTierEmbed]
		})
	}
}
