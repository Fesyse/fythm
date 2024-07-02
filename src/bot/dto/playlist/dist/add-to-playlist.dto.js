"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AddToPlaylistDto = void 0;
var play_dto_1 = require("@/bot/dto/play.dto");
var AddToPlaylistDto = /** @class */ (function (_super) {
    __extends(AddToPlaylistDto, _super);
    function AddToPlaylistDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AddToPlaylistDto;
}(play_dto_1.PlayDto));
exports.AddToPlaylistDto = AddToPlaylistDto;
