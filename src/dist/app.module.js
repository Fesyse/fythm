"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@discord-nestjs/core");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var discord_js_1 = require("discord.js");
var bot_module_1 = require("./bot/bot.module");
var bot_gateaway_1 = require("./bot/bot.gateaway");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot(),
                core_1.DiscordModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (configService) { return ({
                        token: configService.get("DISCORD_TOKEN"),
                        discordClientOptions: {
                            intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages]
                        },
                        registerCommandOptions: [
                            {
                                forGuild: configService.get("GUILD_ID_WITH_COMMANDS"),
                                removeCommandsBefore: true
                            }
                        ],
                        failOnLogin: true
                    }); },
                    inject: [config_1.ConfigService]
                }),
                bot_module_1.BotModule
            ],
            providers: [bot_gateaway_1.BotGateway]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
