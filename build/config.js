"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SCREEN;
(function (SCREEN) {
    SCREEN[SCREEN["X"] = 1600] = "X";
    SCREEN[SCREEN["Y"] = 800] = "Y";
})(SCREEN = exports.SCREEN || (exports.SCREEN = {}));
var Direction;
(function (Direction) {
    Direction[Direction["top"] = 0] = "top";
    Direction[Direction["topRight"] = 1] = "topRight";
    Direction[Direction["right"] = 2] = "right";
    Direction[Direction["bottomRight"] = 3] = "bottomRight";
    Direction[Direction["bottom"] = 4] = "bottom";
    Direction[Direction["bottomLeft"] = 5] = "bottomLeft";
    Direction[Direction["left"] = 6] = "left";
    Direction[Direction["topLeft"] = 7] = "topLeft";
})(Direction = exports.Direction || (exports.Direction = {}));
var EnemyConf;
(function (EnemyConf) {
    EnemyConf[EnemyConf["popInitMin"] = 0] = "popInitMin";
    EnemyConf[EnemyConf["popInitMax"] = 2] = "popInitMax";
    //モンスターの視野
    EnemyConf[EnemyConf["fieldOfView"] = 5] = "fieldOfView";
})(EnemyConf = exports.EnemyConf || (exports.EnemyConf = {}));
var MessageLength;
(function (MessageLength) {
    MessageLength[MessageLength["limit"] = 8] = "limit";
})(MessageLength = exports.MessageLength || (exports.MessageLength = {}));
var MessageType;
(function (MessageType) {
    MessageType[MessageType["normal"] = 0] = "normal";
    MessageType[MessageType["special"] = 1] = "special";
    MessageType[MessageType["danger"] = 2] = "danger";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var FloorConf;
(function (FloorConf) {
    FloorConf[FloorConf["width"] = 40] = "width";
    FloorConf[FloorConf["height"] = 40] = "height";
})(FloorConf = exports.FloorConf || (exports.FloorConf = {}));
var MapType;
(function (MapType) {
    MapType[MapType["wall"] = 0] = "wall";
    MapType[MapType["floor"] = 1] = "floor";
    MapType[MapType["downstair"] = 2] = "downstair";
})(MapType = exports.MapType || (exports.MapType = {}));
var RoomConf;
(function (RoomConf) {
    // 部屋のサイズ
    RoomConf[RoomConf["maxWidth"] = 10] = "maxWidth";
    RoomConf[RoomConf["maxHeight"] = 10] = "maxHeight";
    RoomConf[RoomConf["minWidth"] = 7] = "minWidth";
    RoomConf[RoomConf["minHeight"] = 7] = "minHeight";
    //部屋作成の試行回数
    RoomConf[RoomConf["trialNum"] = 50] = "trialNum";
    //部屋と部屋の距離
    RoomConf[RoomConf["distance_x"] = 5] = "distance_x";
    RoomConf[RoomConf["distance_y"] = 5] = "distance_y";
})(RoomConf = exports.RoomConf || (exports.RoomConf = {}));
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
//# sourceMappingURL=config.js.map