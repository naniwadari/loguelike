"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SCREEN;
(function (SCREEN) {
    SCREEN[SCREEN["X"] = 1600] = "X";
    SCREEN[SCREEN["Y"] = 800] = "Y";
})(SCREEN = exports.SCREEN || (exports.SCREEN = {}));
var MessageLength;
(function (MessageLength) {
    MessageLength[MessageLength["limit"] = 8] = "limit";
})(MessageLength = exports.MessageLength || (exports.MessageLength = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["normal"] = 0] = "normal";
    MessageType[MessageType["special"] = 1] = "special";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var MapBluePrint;
(function (MapBluePrint) {
    MapBluePrint[MapBluePrint["LX"] = 25] = "LX";
    MapBluePrint[MapBluePrint["LY"] = 25] = "LY";
    MapBluePrint[MapBluePrint["PX"] = 32] = "PX";
    MapBluePrint[MapBluePrint["PY"] = 32] = "PY";
    MapBluePrint[MapBluePrint["wideX"] = 40] = "wideX";
    MapBluePrint[MapBluePrint["wideY"] = 40] = "wideY";
})(MapBluePrint = exports.MapBluePrint || (exports.MapBluePrint = {}));
var MapType;
(function (MapType) {
    MapType[MapType["floor"] = 0] = "floor";
    MapType[MapType["wall"] = 1] = "wall";
    MapType[MapType["downstair"] = 2] = "downstair";
})(MapType = exports.MapType || (exports.MapType = {}));
var TyleSize;
(function (TyleSize) {
    TyleSize[TyleSize["x"] = 32] = "x";
    TyleSize[TyleSize["y"] = 32] = "y";
})(TyleSize = exports.TyleSize || (exports.TyleSize = {}));
var DrawRange;
(function (DrawRange) {
    DrawRange[DrawRange["x"] = 25] = "x";
    DrawRange[DrawRange["y"] = 25] = "y";
})(DrawRange = exports.DrawRange || (exports.DrawRange = {}));
exports.CanStand = [];
exports.CanStand[MapType.floor] = true;
exports.CanStand[MapType.wall] = false;
exports.CanStand[MapType.downstair] = true;
