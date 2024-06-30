import { Injectable, Logger } from "@nestjs/common"
import { On, Once, InjectDiscordClient } from "@discord-nestjs/core"
import { ButtonInteraction, Client, ClientEvents, Message } from "discord.js"

type CustomId = string
type ButtonAction = Function

@Injectable()
export class BotGateway {
	private readonly logger = new Logger(BotGateway.name)
	private readonly buttonActions = {
		"custom-id": () => {} // example
	} satisfies Record<CustomId, ButtonAction> // TODO: Add button actions

	constructor(
		@InjectDiscordClient()
		private readonly client: Client
	) {}

	@Once("ready")
	onReady() {
		this.logger.log(`Bot ${this.client.user.tag} was started!`)
	}

	@On("interactionCreate")
	async onInteraction(
		interaction: ClientEvents["interactionCreate"][0]
	): Promise<void> {
		if (interaction instanceof ButtonInteraction) {
			const buttonAction = this.buttonActions[interaction.customId]
			buttonAction()
		}
	}
}
