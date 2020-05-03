"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = __importDefault(require("./player/player"));
var messages_1 = require("./text/messages");
exports.S = {
    floors: [],
    enemys: [],
    // fieldSize: { x: MapBluePrint.LX, y: MapBluePrint.LY },
    player: new player_1.default(0, 0),
    messages: new messages_1.MessageList(),
    Frag: {
        start: false,
        gameover: false,
        eyecatch: false,
    },
    env: { diagonal: false },
    KeyPress: {
        left: false,
        right: false,
        up: false,
        down: false,
    },
    seed: Date.now().toString(10),
};
//# sourceMappingURL=State.js.map