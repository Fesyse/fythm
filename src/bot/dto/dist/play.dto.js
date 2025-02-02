"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlayDto = void 0;
var core_1 = require("@discord-nestjs/core");
var class_transformer_1 = require("class-transformer");
var PlayDto = /** @class */ (function () {
    function PlayDto() {
    }
    __decorate([
        class_transformer_1.Transform(function (_a) {
            var value = _a.value;
            return value.toUpperCase();
        }),
        core_1.Param({
            name: "song",
            description: "Name or URL of song/playlist. Could be from (YandexMusic, Spotify, SoundCloud)",
            required: true
        })
    ], PlayDto.prototype, "song");
    return PlayDto;
}());
exports.PlayDto = PlayDto;
