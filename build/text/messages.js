"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
class MessageList {
    constructor() {
        this.list = [];
    }
    add(message) {
        this.list.push(message);
        while (this.list.length > config_1.MessageLength.limit) {
            this.list.shift();
        }
    }
}
exports.MessageList = MessageList;
class Message {
    constructor(text, type) {
        this.text = text;
        this.type = type;
    }
}
exports.Message = Message;
