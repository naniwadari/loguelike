"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var State_1 = require("../State");
exports.default = (function (con) {
    var messages = State_1.S.messages;
    con.save();
    con.textBaseline = "top";
    con.textAlign = "left";
    con.font = "16px consolas";
    con.translate(config_1.DrawRange.x * config_1.TyleSize.x, config_1.SCREEN.Y - ((16 + 6) * config_1.MessageLength.limit + 8 * 2));
    for (var i = 0; i < messages.list.length; i++) {
        var type = messages.list[i].type;
        if (type === config_1.MessageType.normal) {
            con.fillStyle = "white";
        }
        else if (type === config_1.MessageType.special) {
            con.fillStyle = "yellow";
        }
        else if (type === config_1.MessageType.danger) {
            con.fillStyle = "red";
        }
        else {
            throw new Error("not supported");
        }
        con.fillText(messages.list[i].text, 8, (16 + 6) * i + 8);
    }
    con.restore();
});
