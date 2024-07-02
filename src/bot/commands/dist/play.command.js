"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.PlayCommand = void 0;
var common_1 = require("@discord-nestjs/common");
var core_1 = require("@discord-nestjs/core");
var discord_js_1 = require("discord.js");
var voice_1 = require("@discordjs/voice");
var PlayCommand = /** @class */ (function () {
    function PlayCommand(drizzle, youtubeService) {
        this.drizzle = drizzle;
        this.youtubeService = youtubeService;
        this.drizzle = drizzle.getDb();
    }
    Object.defineProperty(PlayCommand.prototype, "playCommandButtonRows", {
        get: function () {
            var firstButtonRow = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId("volume-down")
                .setLabel("- Vol")
                .setStyle(discord_js_1.ButtonStyle.Secondary)
                .setEmoji("🔉"), new discord_js_1.ButtonBuilder()
                .setCustomId("volume-mute")
                .setLabel("Mute")
                .setStyle(discord_js_1.ButtonStyle.Secondary)
                .setEmoji("🔇"), new discord_js_1.ButtonBuilder()
                .setCustomId("volume-up")
                .setLabel("+ Vol")
                .setStyle(discord_js_1.ButtonStyle.Secondary)
                .setEmoji("🔊"));
            return [firstButtonRow];
        },
        enumerable: false,
        configurable: true
    });
    PlayCommand.prototype.getPlayCommandEmbed = function (message, selectedMusic) {
        var _a;
        var user;
        if ("user" in message)
            user = message.user;
        else
            user = message.author;
        var embed = new discord_js_1.EmbedBuilder()
            .setColor("#fff0db")
            .setTitle(":musical_note:  Playing song `" + selectedMusic.title + "`")
            .setAuthor({
            name: user.displayName,
            iconURL: (_a = user.avatarURL()) !== null && _a !== void 0 ? _a : "/img/user.svg",
            url: "https://discord.js.org"
        })
            .setThumbnail(selectedMusic.thumbnail)
            .addFields({
            name: ":mens: Requested by",
            value: user.toString(),
            inline: true
        }, {
            name: ":clock1: Music duration",
            value: "`" + selectedMusic.duration + "`",
            inline: true
        }, {
            name: ":copyright: Song author",
            value: "`" + selectedMusic.artist + "`",
            inline: true
        })
            .setTimestamp()
            .setFooter({
            text: "Fythm",
            iconURL: "https://i.ibb.co/W6c32cx/fythm-logo.png"
        });
        return embed;
    };
    PlayCommand.prototype.joinVoiceChannel = function (message) {
        var connection = voice_1.joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guildId,
            adapterCreator: message.member.voice.guild.voiceAdapterCreator
        });
        return connection;
    };
    PlayCommand.prototype.onPlayCommand = function (dto, message) {
        return __awaiter(this, void 0, void 0, function () {
            var voice, isBotConnected, voiceMembers, music, selectedMusic, embed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        voice = message.member.voice;
                        if (!!voice.channelId) return [3 /*break*/, 2];
                        return [4 /*yield*/, message.reply("You must be in a voice channel in order to play music.")];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        isBotConnected = false;
                        voiceMembers = message.guild.channels.cache.get(voice.channelId).members;
                        if (voiceMembers instanceof Map) {
                            voiceMembers.map(function (member) {
                                if (!member.user.bot)
                                    return;
                                isBotConnected = member.user.id === process.env.DISCORD_APP_ID;
                            });
                        }
                        if (!isBotConnected)
                            this.joinVoiceChannel(message);
                        return [4 /*yield*/, this.youtubeService.findMusic(dto.song)];
                    case 3:
                        music = _a.sent();
                        selectedMusic = music[0];
                        if (!music.length)
                            return [2 /*return*/, "No music found with given prompt."];
                        embed = this.getPlayCommandEmbed(message, selectedMusic);
                        return [4 /*yield*/, message.reply({
                                embeds: [embed],
                                components: __spreadArrays(this.playCommandButtonRows)
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Handler(),
        __param(0, core_1.InteractionEvent(common_1.SlashCommandPipe)),
        __param(1, core_1.MessageEvent())
    ], PlayCommand.prototype, "onPlayCommand");
    PlayCommand = __decorate([
        core_1.Command({
            name: "play",
            description: "Plays a song"
        })
    ], PlayCommand);
    return PlayCommand;
}());
exports.PlayCommand = PlayCommand;
