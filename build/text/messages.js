"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var MessageList = /** @class */ (function () {
    function MessageList() {
        this.list = [];
    }
    MessageList.prototype.add = function (message) {
        this.list.push(message);
        while (this.list.length > config_1.MessageLength.limit) {
            this.list.shift();
        }
    };
    return MessageList;
}());
exports.MessageList = MessageList;
var Message = /** @class */ (function () {
    function Message(text, type) {
        this.text = text;
        this.type = type;
    }
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=messages.js.map