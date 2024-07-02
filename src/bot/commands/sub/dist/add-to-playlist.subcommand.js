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
exports.__esModule = true;
exports.AddToPlaylistSubCommand = void 0;
var common_1 = require("@discord-nestjs/common");
var core_1 = require("@discord-nestjs/core");
var AddToPlaylistSubCommand = /** @class */ (function () {
    function AddToPlaylistSubCommand() {
    }
    AddToPlaylistSubCommand.prototype.onPhoneNumberCommand = function (dto) {
        return true;
    };
    __decorate([
        core_1.Handler(),
        __param(0, core_1.IA(common_1.SlashCommandPipe))
    ], AddToPlaylistSubCommand.prototype, "onPhoneNumberCommand");
    AddToPlaylistSubCommand = __decorate([
        core_1.SubCommand({ name: "add", description: "Add song to playlist." })
    ], AddToPlaylistSubCommand);
    return AddToPlaylistSubCommand;
}());
exports.AddToPlaylistSubCommand = AddToPlaylistSubCommand;
