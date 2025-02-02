import { DiscordModule } from "@discord-nestjs/core"
import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { GatewayIntentBits } from "discord.js"

import { BotModule } from "./bot/bot.module"
import { BotGateway } from "./bot/bot.gateaway"

@Module({
	imports: [
		ConfigModule.forRoot(),
		DiscordModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				token: configService.get("DISCORD_TOKEN"),
				discordClientOptions: {
					intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
				},
				registerCommandOptions: [
					{
						forGuild: configService.get("GUILD_ID_WITH_COMMANDS"),
						removeCommandsBefore: true
					}
				],
				failOnLogin: true
			}),
			inject: [ConfigService]
		}),
		BotModule
	],
	providers: [BotGateway]
})
export class AppModule {}
