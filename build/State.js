"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = __importDefault(require("./player"));
var config_1 = require("./config");
var messages_1 = require("./messages");
exports.S = {
    fields: [],
    fieldSize: { x: config_1.MapBluePrint.LX, y: config_1.MapBluePrint.LY },
    player: new player_1.default(0, 0),
    messages: new messages_1.MessageList(),
    Frag: { start: false },
    env: { diagonal: false },
    KeyPress: {
        left: false,
        right: false,
        up: false,
        down: false,
    },
    seed: Date.now().toString(10),
};
