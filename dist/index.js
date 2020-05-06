/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/State.ts":
/*!**********************!*\
  !*** ./src/State.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst player_1 = __importDefault(__webpack_require__(/*! ./player/player */ \"./src/player/player.ts\"));\nconst messages_1 = __webpack_require__(/*! ./text/messages */ \"./src/text/messages.ts\");\nconst Bag_1 = __webpack_require__(/*! ./item/Bag */ \"./src/item/Bag.ts\");\nexports.S = {\n    floors: [],\n    enemys: [],\n    player: new player_1.default(0, 0),\n    fallItems: [],\n    bags: new Bag_1.Bag(),\n    bagCursor: 0,\n    messages: new messages_1.MessageList(),\n    Frag: {\n        start: false,\n        gameover: false,\n        menu: false,\n        eyecatch: false,\n    },\n    env: { diagonal: false },\n    KeyPress: {\n        left: false,\n        right: false,\n        up: false,\n        down: false,\n    },\n    seed: Date.now().toString(10),\n};\n\n\n//# sourceURL=webpack:///./src/State.ts?");

/***/ }),

/***/ "./src/battle/battleEvents.ts":
/*!************************************!*\
  !*** ./src/battle/battleEvents.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst calcDamage_1 = __importDefault(__webpack_require__(/*! ./calcDamage */ \"./src/battle/calcDamage.ts\"));\nconst messages_1 = __webpack_require__(/*! ../text/messages */ \"./src/text/messages.ts\");\nconst text_1 = __webpack_require__(/*! ../text/text */ \"./src/text/text.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nvar battleEvent;\n(function (battleEvent) {\n    function searchEnemy(point, enemys) {\n        let targetEnemy = undefined;\n        let enemyIndex = 0;\n        for (let i = 0; i < enemys.length; i++) {\n            if (enemys[i].point.x === point.x && enemys[i].point.y === point.y) {\n                targetEnemy = enemys[i];\n                enemyIndex = i;\n                const result = { enemy: targetEnemy, index: enemyIndex };\n                return result;\n            }\n        }\n        const result = { enemy: undefined, index: undefined };\n        return result;\n    }\n    battleEvent.searchEnemy = searchEnemy;\n    function attackResult(enemy) {\n        let damage = calcDamage_1.default(State_1.S.player.ATK, enemy.DEF);\n        enemy.HP -= damage;\n        State_1.S.messages.add(new messages_1.Message(text_1.actionMsg.attack(enemy.name, damage), config_1.MessageType.normal));\n    }\n    battleEvent.attackResult = attackResult;\n    function defeatEnemy(enemys, enemy, index) {\n        enemys.splice(index, 1);\n        State_1.S.player.EXP += enemy.EXP;\n        State_1.S.messages.add(new messages_1.Message(text_1.actionMsg.kill(enemy.name, enemy.EXP), config_1.MessageType.normal));\n    }\n    battleEvent.defeatEnemy = defeatEnemy;\n    function levelUp() {\n        State_1.S.player.level++;\n        State_1.S.player.baseHP = Math.ceil(State_1.S.player.baseHP * 1.2);\n        State_1.S.player.baseATK = Math.ceil(State_1.S.player.baseATK * 1.1);\n        State_1.S.player.baseDEF = Math.ceil(State_1.S.player.baseDEF * 1.1);\n        State_1.S.player.HP = State_1.S.player.totalHP;\n        State_1.S.player.ATK = State_1.S.player.totalATK;\n        State_1.S.player.DEF = State_1.S.player.totalDEF;\n        State_1.S.player.requireEXP = Math.ceil(State_1.S.player.requireEXP * 2.4);\n        State_1.S.messages.add(new messages_1.Message(text_1.actionMsg.levelUp(State_1.S.player.level), config_1.MessageType.special));\n    }\n    battleEvent.levelUp = levelUp;\n})(battleEvent = exports.battleEvent || (exports.battleEvent = {}));\n\n\n//# sourceURL=webpack:///./src/battle/battleEvents.ts?");

/***/ }),

/***/ "./src/battle/calcDamage.ts":
/*!**********************************!*\
  !*** ./src/battle/calcDamage.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = (atk, def) => {\n    let damage = Math.ceil((atk * 1.1 - def * 0.4) * Math.random());\n    if (damage <= 0) {\n        damage = 1;\n    }\n    return damage;\n};\n\n\n//# sourceURL=webpack:///./src/battle/calcDamage.ts?");

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar SCREEN;\n(function (SCREEN) {\n    SCREEN[SCREEN[\"X\"] = 1600] = \"X\";\n    SCREEN[SCREEN[\"Y\"] = 800] = \"Y\";\n})(SCREEN = exports.SCREEN || (exports.SCREEN = {}));\nvar Direction;\n(function (Direction) {\n    Direction[Direction[\"top\"] = 0] = \"top\";\n    Direction[Direction[\"topRight\"] = 1] = \"topRight\";\n    Direction[Direction[\"right\"] = 2] = \"right\";\n    Direction[Direction[\"bottomRight\"] = 3] = \"bottomRight\";\n    Direction[Direction[\"bottom\"] = 4] = \"bottom\";\n    Direction[Direction[\"bottomLeft\"] = 5] = \"bottomLeft\";\n    Direction[Direction[\"left\"] = 6] = \"left\";\n    Direction[Direction[\"topLeft\"] = 7] = \"topLeft\";\n})(Direction = exports.Direction || (exports.Direction = {}));\nvar FadeConf;\n(function (FadeConf) {\n    FadeConf[FadeConf[\"blackout\"] = 500] = \"blackout\";\n    FadeConf[FadeConf[\"blackoutRatio\"] = 100] = \"blackoutRatio\";\n    FadeConf[FadeConf[\"whiteout\"] = 1000] = \"whiteout\";\n    FadeConf[FadeConf[\"whiteoutRatio\"] = 200] = \"whiteoutRatio\";\n    FadeConf[FadeConf[\"inTimeShort\"] = 1700] = \"inTimeShort\";\n    FadeConf[FadeConf[\"outTimeShort\"] = 500] = \"outTimeShort\";\n    FadeConf[FadeConf[\"fadeRatio\"] = 1000] = \"fadeRatio\";\n    FadeConf[FadeConf[\"fastFadeRatio\"] = 500] = \"fastFadeRatio\";\n    FadeConf[FadeConf[\"interval\"] = 20] = \"interval\";\n})(FadeConf = exports.FadeConf || (exports.FadeConf = {}));\nvar EnemyConf;\n(function (EnemyConf) {\n    EnemyConf[EnemyConf[\"popInitMin\"] = 0] = \"popInitMin\";\n    EnemyConf[EnemyConf[\"popInitMax\"] = 2] = \"popInitMax\";\n    //モンスターの視野\n    EnemyConf[EnemyConf[\"fieldOfView\"] = 5] = \"fieldOfView\";\n})(EnemyConf = exports.EnemyConf || (exports.EnemyConf = {}));\nvar MessageLength;\n(function (MessageLength) {\n    MessageLength[MessageLength[\"limit\"] = 8] = \"limit\";\n})(MessageLength = exports.MessageLength || (exports.MessageLength = {}));\nvar MessageType;\n(function (MessageType) {\n    MessageType[MessageType[\"normal\"] = 0] = \"normal\";\n    MessageType[MessageType[\"special\"] = 1] = \"special\";\n    MessageType[MessageType[\"danger\"] = 2] = \"danger\";\n})(MessageType = exports.MessageType || (exports.MessageType = {}));\nvar FloorConf;\n(function (FloorConf) {\n    FloorConf[FloorConf[\"width\"] = 40] = \"width\";\n    FloorConf[FloorConf[\"height\"] = 40] = \"height\";\n})(FloorConf = exports.FloorConf || (exports.FloorConf = {}));\nvar MapType;\n(function (MapType) {\n    MapType[MapType[\"wall\"] = 0] = \"wall\";\n    MapType[MapType[\"floor\"] = 1] = \"floor\";\n    MapType[MapType[\"downstair\"] = 2] = \"downstair\";\n})(MapType = exports.MapType || (exports.MapType = {}));\nvar RoomConf;\n(function (RoomConf) {\n    // 部屋のサイズ\n    RoomConf[RoomConf[\"maxWidth\"] = 10] = \"maxWidth\";\n    RoomConf[RoomConf[\"maxHeight\"] = 10] = \"maxHeight\";\n    RoomConf[RoomConf[\"minWidth\"] = 7] = \"minWidth\";\n    RoomConf[RoomConf[\"minHeight\"] = 7] = \"minHeight\";\n    //部屋作成の試行回数\n    RoomConf[RoomConf[\"trialNum\"] = 50] = \"trialNum\";\n    //部屋と部屋の距離\n    RoomConf[RoomConf[\"distance_x\"] = 5] = \"distance_x\";\n    RoomConf[RoomConf[\"distance_y\"] = 5] = \"distance_y\";\n})(RoomConf = exports.RoomConf || (exports.RoomConf = {}));\nvar TyleSize;\n(function (TyleSize) {\n    TyleSize[TyleSize[\"x\"] = 32] = \"x\";\n    TyleSize[TyleSize[\"y\"] = 32] = \"y\";\n})(TyleSize = exports.TyleSize || (exports.TyleSize = {}));\nvar DrawRange;\n(function (DrawRange) {\n    DrawRange[DrawRange[\"x\"] = 25] = \"x\";\n    DrawRange[DrawRange[\"y\"] = 25] = \"y\";\n})(DrawRange = exports.DrawRange || (exports.DrawRange = {}));\nexports.CanStand = [];\nexports.CanStand[MapType.floor] = true;\nexports.CanStand[MapType.wall] = false;\nexports.CanStand[MapType.downstair] = true;\n\n\n//# sourceURL=webpack:///./src/config.ts?");

/***/ }),

/***/ "./src/config/draw.ts":
/*!****************************!*\
  !*** ./src/config/draw.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TextConf;\n(function (TextConf) {\n    TextConf[TextConf[\"margin\"] = 8] = \"margin\";\n    TextConf[TextConf[\"lineheight\"] = 6] = \"lineheight\";\n    TextConf[TextConf[\"cursorSize\"] = 16] = \"cursorSize\";\n})(TextConf = exports.TextConf || (exports.TextConf = {}));\nvar FontConf;\n(function (FontConf) {\n    FontConf[\"S\"] = \"16px consolas\";\n    FontConf[\"M\"] = \"20px consolas\";\n    FontConf[\"L\"] = \"24px consolas\";\n})(FontConf = exports.FontConf || (exports.FontConf = {}));\n\n\n//# sourceURL=webpack:///./src/config/draw.ts?");

/***/ }),

/***/ "./src/config/item.ts":
/*!****************************!*\
  !*** ./src/config/item.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ItemConf;\n(function (ItemConf) {\n    ItemConf[ItemConf[\"popMin\"] = 0] = \"popMin\";\n    ItemConf[ItemConf[\"popMax\"] = 3] = \"popMax\";\n    ItemConf[ItemConf[\"bagMax\"] = 10] = \"bagMax\";\n})(ItemConf = exports.ItemConf || (exports.ItemConf = {}));\nvar ItemId;\n(function (ItemId) {\n    ItemId[ItemId[\"club\"] = 1001] = \"club\";\n    ItemId[ItemId[\"leatherShield\"] = 2001] = \"leatherShield\";\n    ItemId[ItemId[\"greenHerb\"] = 3001] = \"greenHerb\";\n})(ItemId = exports.ItemId || (exports.ItemId = {}));\nvar ItemType;\n(function (ItemType) {\n    ItemType[ItemType[\"weapon\"] = 0] = \"weapon\";\n    ItemType[ItemType[\"shield\"] = 1] = \"shield\";\n    ItemType[ItemType[\"potion\"] = 2] = \"potion\";\n})(ItemType = exports.ItemType || (exports.ItemType = {}));\nexports.ItemList = [\n    //武器\n    {\n        id: ItemId.club,\n        types: ItemType.weapon,\n        name: \"こんぼう\",\n        ATK: 3,\n        DEF: 0,\n        HP: 0,\n    },\n    //防具\n    {\n        id: ItemId.leatherShield,\n        types: ItemType.shield,\n        name: \"かわのたて\",\n        ATK: 0,\n        DEF: 2,\n        HP: 0,\n    },\n    //回復薬\n    {\n        id: ItemId.greenHerb,\n        types: ItemType.potion,\n        name: \"やくそう\",\n        ATK: 0,\n        DEF: 0,\n        HP: 10,\n    },\n];\n\n\n//# sourceURL=webpack:///./src/config/item.ts?");

/***/ }),

/***/ "./src/debug/Debug.ts":
/*!****************************!*\
  !*** ./src/debug/Debug.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst Draw_1 = __webpack_require__(/*! ../draw/Draw */ \"./src/draw/Draw.ts\");\nconst getOffFloor_1 = __importDefault(__webpack_require__(/*! ../event/getOffFloor */ \"./src/event/getOffFloor.ts\"));\nconst LayerDraw_1 = __webpack_require__(/*! ../draw/LayerDraw */ \"./src/draw/LayerDraw.ts\");\nexports.default = () => {\n    window.addEventListener(\"keydown\", (e) => {\n        // デバッグキー P\n        if (e.keyCode === 80) {\n            searchDownstairsPoint();\n            searchEnemysPoint();\n        }\n        // マップリクリエイトキー　0\n        else if (e.keyCode === 48) {\n            checkState();\n        }\n    });\n};\nfunction mapRecreate() {\n    getOffFloor_1.default();\n    Draw_1.draw(Draw_1.con, State_1.S.env);\n}\nfunction checkState() {\n    console.log(State_1.S);\n}\nfunction forceGameOver() {\n    State_1.S.player.HP = 0;\n    State_1.S.Frag.gameover = true;\n    LayerDraw_1.layerIn(LayerDraw_1.layer, State_1.S.env);\n    console.log(\"強制ゲームオーバー\");\n    console.log(State_1.S.Frag.gameover);\n}\nfunction searchDownstairsPoint() {\n    const floor = State_1.S.floors[State_1.S.player.depth];\n    let downStairsPoint = floor.downstair;\n    console.log(\"階段の座標\");\n    console.log(downStairsPoint);\n}\nfunction searchEnemysPoint() {\n    console.log(\"モンスターの座標\");\n    const enemys = State_1.S.enemys;\n    for (let i = 0; i < enemys.length; i++) {\n        console.log(enemys[i]);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/debug/Debug.ts?");

/***/ }),

/***/ "./src/draw/Draw.ts":
/*!**************************!*\
  !*** ./src/draw/Draw.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst culcDrawStartPoint_1 = __importDefault(__webpack_require__(/*! ./culcDrawStartPoint */ \"./src/draw/culcDrawStartPoint.ts\"));\nconst drawDiagonalArrow_1 = __importDefault(__webpack_require__(/*! ./drawDiagonalArrow */ \"./src/draw/drawDiagonalArrow.ts\"));\nconst drawMessage_1 = __importDefault(__webpack_require__(/*! ./drawMessage */ \"./src/draw/drawMessage.ts\"));\nconst drawTyles_1 = __webpack_require__(/*! ./drawTyles */ \"./src/draw/drawTyles.ts\");\nconst drawStatus_1 = __importDefault(__webpack_require__(/*! ./drawStatus */ \"./src/draw/drawStatus.ts\"));\nconst drawEnemys_1 = __importDefault(__webpack_require__(/*! ./drawEnemys */ \"./src/draw/drawEnemys.ts\"));\nconst drawPlayer_1 = __importDefault(__webpack_require__(/*! ./drawPlayer */ \"./src/draw/drawPlayer.ts\"));\nconst drawTitle_1 = __importDefault(__webpack_require__(/*! ./drawTitle */ \"./src/draw/drawTitle.ts\"));\nconst drawBag_1 = __webpack_require__(/*! ./drawBag */ \"./src/draw/drawBag.ts\");\nconst drawFallItem_1 = __importDefault(__webpack_require__(/*! ./drawFallItem */ \"./src/draw/drawFallItem.ts\"));\nexports.canvas = document.getElementById(\"game\");\nexports.con = exports.canvas.getContext(\"2d\");\nfunction draw(con, env) {\n    con.fillStyle = \"black\";\n    con.fillRect(0, 0, config_1.SCREEN.X, config_1.SCREEN.Y);\n    if (!State_1.S.Frag.start) {\n        drawTitle_1.default(con);\n        return;\n    }\n    const drawStartPoint = culcDrawStartPoint_1.default();\n    const playerDrawPoint = {\n        x: State_1.S.player.x - drawStartPoint.x,\n        y: State_1.S.player.y - drawStartPoint.y,\n    };\n    // タイルの描画\n    drawTyles_1.drawTyles(con, drawStartPoint);\n    //モンスターの描画\n    drawEnemys_1.default(con, drawStartPoint);\n    //メッセージの描画\n    drawMessage_1.default(con);\n    //ステータスの描画\n    drawStatus_1.default(con);\n    //バッグの中身の描画\n    drawBag_1.drawBag(con, State_1.S);\n    //フロアに落ちているアイテムの描画\n    drawFallItem_1.default(con, drawStartPoint);\n    //プレイヤーの描画\n    drawPlayer_1.default(con, playerDrawPoint);\n    //斜め移動の矢印の描画\n    if (State_1.S.env.diagonal) {\n        drawDiagonalArrow_1.default(con, playerDrawPoint);\n    }\n}\nexports.draw = draw;\n\n\n//# sourceURL=webpack:///./src/draw/Draw.ts?");

/***/ }),

/***/ "./src/draw/Layer.ts":
/*!***************************!*\
  !*** ./src/draw/Layer.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nvar Layer;\n(function (Layer) {\n    Layer.size = {\n        x: config_1.TyleSize.x * config_1.DrawRange.x,\n        y: config_1.TyleSize.y * config_1.DrawRange.y,\n    };\n    function gameover(layer) {\n        layer.save();\n        layer.globalAlpha = 0.5;\n        layer.fillRect(0, 0, Layer.size.x, Layer.size.y);\n        layer.globalAlpha = 1;\n        layer.textBaseline = \"alphabetic\";\n        layer.textAlign = \"center\";\n        layer.fillStyle = \"white\";\n        layer.font = \"48px layersolas\";\n        layer.fillText(\"Game Over\", Layer.size.x / 2, Layer.size.y / 3);\n        layer.font = \"32px consolas\";\n        layer.fillText(\"Zキーでタイトルへ戻る\", Layer.size.x / 2, (Layer.size.y / 4) * 3);\n        layer.restore();\n    }\n    Layer.gameover = gameover;\n    function eyecatch(layer, alpha) {\n        layer.save();\n        layer.globalAlpha = alpha;\n        layer.textBaseline = \"alphabetic\";\n        layer.textAlign = \"center\";\n        layer.fillStyle = \"white\";\n        layer.font = \"48px layersolas\";\n        layer.fillText(\"お試しダンジョン\" + \"　\" + `${State_1.S.player.depth}F`, Layer.size.x / 2, Layer.size.y / 3);\n        layer.restore();\n    }\n    Layer.eyecatch = eyecatch;\n    function background(layer, alpha) {\n        layer.save();\n        //描画されていた範囲のリセット\n        layer.clearRect(0, 0, Layer.size.x, Layer.size.y);\n        layer.globalAlpha = alpha;\n        layer.fillRect(0, 0, Layer.size.x, Layer.size.y);\n    }\n    Layer.background = background;\n    function clear(layer) {\n        layer.save();\n        layer.globalAlpha = 1;\n        layer.clearRect(0, 0, Layer.size.x, Layer.size.y);\n        layer.restore();\n    }\n    Layer.clear = clear;\n})(Layer = exports.Layer || (exports.Layer = {}));\n\n\n//# sourceURL=webpack:///./src/draw/Layer.ts?");

/***/ }),

/***/ "./src/draw/LayerDraw.ts":
/*!*******************************!*\
  !*** ./src/draw/LayerDraw.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst Layer_1 = __webpack_require__(/*! ./Layer */ \"./src/draw/Layer.ts\");\nexports.canvas = document.getElementById(\"layer\");\nexports.layer = exports.canvas.getContext(\"2d\");\nfunction layerIn(layer, env) {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (State_1.S.Frag.eyecatch) {\n            yield blackout(layer);\n            yield fadeIn(layer);\n            return;\n        }\n        if (State_1.S.Frag.gameover) {\n            Layer_1.Layer.gameover(layer);\n            return;\n        }\n    });\n}\nexports.layerIn = layerIn;\nfunction layerOut(layer, env) {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (State_1.S.Frag.eyecatch) {\n            State_1.S.Frag.eyecatch = false;\n            yield whiteout(layer);\n            Layer_1.Layer.clear(layer);\n            return;\n        }\n        if (State_1.S.Frag.gameover) {\n            Layer_1.Layer.clear(layer);\n        }\n    });\n}\nexports.layerOut = layerOut;\nfunction whiteout(layer) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let start = Date.now();\n        let settime = config_1.FadeConf.whiteout;\n        let ratio = config_1.FadeConf.whiteoutRatio;\n        return new Promise((resolve) => {\n            let timer = setInterval(() => {\n                let passed = calcPassedTime(start);\n                let alpha = calcOutAlpha(passed, ratio);\n                if (passed >= settime) {\n                    clearInterval(timer);\n                    return resolve();\n                }\n                Layer_1.Layer.background(layer, alpha);\n                Layer_1.Layer.eyecatch(layer, alpha);\n            });\n        });\n    });\n}\nexports.whiteout = whiteout;\nfunction blackout(layer) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let start = Date.now();\n        let settime = config_1.FadeConf.blackout;\n        let ratio = config_1.FadeConf.blackoutRatio;\n        return new Promise((resolve) => {\n            let timer = setInterval(() => {\n                let passed = calcPassedTime(start);\n                let alpha = calcInAlpha(passed, ratio);\n                if (passed >= settime) {\n                    clearInterval(timer);\n                    return resolve();\n                }\n                Layer_1.Layer.background(layer, alpha);\n            });\n        });\n    });\n}\nexports.blackout = blackout;\nfunction fadeIn(layer) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let start = Date.now();\n        let inTime = config_1.FadeConf.inTimeShort;\n        let ratio = config_1.FadeConf.fadeRatio;\n        let interval = config_1.FadeConf.interval;\n        return new Promise((resolve) => {\n            let timer = setInterval(() => {\n                let passed = calcPassedTime(start);\n                let alpha = calcInAlpha(passed, ratio);\n                if (passed >= inTime) {\n                    clearInterval(timer);\n                    return resolve();\n                }\n                Layer_1.Layer.eyecatch(layer, alpha);\n            }, interval);\n        });\n    });\n}\nexports.fadeIn = fadeIn;\nfunction fadeOut(layer) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let start = Date.now();\n        let inTime = config_1.FadeConf.outTimeShort;\n        let ratio = config_1.FadeConf.fastFadeRatio;\n        let interval = config_1.FadeConf.interval;\n        return new Promise((resolve) => {\n            let timer = setInterval(() => {\n                let passed = calcPassedTime(start);\n                let alpha = calcOutAlpha(passed, ratio);\n                if (passed >= inTime) {\n                    clearInterval(timer);\n                    return resolve();\n                }\n                console.log(alpha);\n                Layer_1.Layer.clear(layer);\n                Layer_1.Layer.eyecatch(layer, alpha);\n            }, interval);\n        });\n    });\n}\nexports.fadeOut = fadeOut;\nfunction calcPassedTime(start) {\n    let passed = Date.now() - start;\n    return passed;\n}\nexports.calcPassedTime = calcPassedTime;\nfunction calcInAlpha(passed, ratio) {\n    let alpha = passed / ratio;\n    if (alpha >= 1)\n        alpha = 1;\n    return alpha;\n}\nexports.calcInAlpha = calcInAlpha;\nfunction calcOutAlpha(passed, ratio) {\n    let alpha = 1 - passed / ratio;\n    if (alpha <= 0)\n        alpha = 0;\n    return alpha;\n}\nexports.calcOutAlpha = calcOutAlpha;\n\n\n//# sourceURL=webpack:///./src/draw/LayerDraw.ts?");

/***/ }),

/***/ "./src/draw/culcDrawStartPoint.ts":
/*!****************************************!*\
  !*** ./src/draw/culcDrawStartPoint.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nexports.default = () => {\n    let drawStartPoint = { x: 0, y: 0 };\n    // 描画を開始するX座標を計算\n    //プレイヤーのxが描画範囲の半分以内なら始点は0\n    if (State_1.S.player.x <= Math.floor(config_1.DrawRange.x / 2)) {\n        drawStartPoint.x = 0;\n    }\n    //画面描画が右端で止まるところを始点とする\n    else if (State_1.S.player.x >=\n        State_1.S.floors[State_1.S.player.depth].size.width - Math.floor(config_1.DrawRange.x / 2)) {\n        drawStartPoint.x = State_1.S.floors[State_1.S.player.depth].size.width - config_1.DrawRange.x;\n    }\n    else {\n        drawStartPoint.x = State_1.S.player.x - Math.floor(config_1.DrawRange.x / 2);\n    }\n    //描画を開始するY座標を計算\n    if (State_1.S.player.y <= Math.floor(config_1.DrawRange.y / 2)) {\n        drawStartPoint.y = 0;\n    }\n    else if (State_1.S.player.y >=\n        State_1.S.floors[State_1.S.player.depth].size.height - Math.floor(config_1.DrawRange.y / 2)) {\n        drawStartPoint.y = State_1.S.floors[State_1.S.player.depth].size.height - config_1.DrawRange.y;\n    }\n    else {\n        drawStartPoint.y = State_1.S.player.y - Math.floor(config_1.DrawRange.y / 2);\n    }\n    return drawStartPoint;\n};\n\n\n//# sourceURL=webpack:///./src/draw/culcDrawStartPoint.ts?");

/***/ }),

/***/ "./src/draw/drawBag.ts":
/*!*****************************!*\
  !*** ./src/draw/drawBag.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst draw_1 = __webpack_require__(/*! ../config/draw */ \"./src/config/draw.ts\");\nconst item_1 = __webpack_require__(/*! ../config/item */ \"./src/config/item.ts\");\nfunction drawBag(con, S) {\n    let items = S.bags.items;\n    let bagCursor = S.bagCursor;\n    let margin = draw_1.TextConf.margin;\n    let cursor = draw_1.TextConf.cursorSize;\n    let lineheight = draw_1.TextConf.lineheight;\n    let statusHeight = 30 * 6 + 8;\n    let height = margin + (24 + lineheight) * item_1.ItemConf.bagMax + margin * 2;\n    let width = 230;\n    let rectStart = {\n        x: config_1.DrawRange.x * config_1.TyleSize.x + margin,\n        y: statusHeight + margin * 3,\n    };\n    con.save();\n    con.strokeStyle = \"white\";\n    con.strokeRect(rectStart.x, rectStart.y, width, height);\n    con.restore;\n    con.save();\n    con.textBaseline = \"top\";\n    con.textAlign = \"left\";\n    con.translate(rectStart.x + margin, rectStart.y + margin);\n    for (let i = 0; i < items.length; i++) {\n        let text = items[i].item.name;\n        let x = margin + cursor + cursor;\n        if (S.player.weapon) {\n            if (S.player.weapon.index === i) {\n                text = \"E\" + items[i].item.name;\n                x = margin + cursor;\n            }\n        }\n        if (S.player.shield) {\n            if (S.player.shield.index === i) {\n                text = \"E\" + items[i].item.name;\n                x = margin + cursor;\n            }\n        }\n        con.fillStyle = \"white\";\n        con.font = draw_1.FontConf.L;\n        con.fillText(text, x, (24 + lineheight) * i + 8);\n    }\n    con.restore();\n    if (S.Frag.menu) {\n        con.save();\n        con.font = draw_1.FontConf.L;\n        con.fillStyle = \"white\";\n        con.translate(rectStart.x + margin * 2, rectStart.y + margin * 2);\n        con.fillText(\">\", 0, (24 + lineheight) * bagCursor + 8);\n        con.restore();\n    }\n}\nexports.drawBag = drawBag;\n\n\n//# sourceURL=webpack:///./src/draw/drawBag.ts?");

/***/ }),

/***/ "./src/draw/drawDiagonalArrow.ts":
/*!***************************************!*\
  !*** ./src/draw/drawDiagonalArrow.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nexports.default = (con, playerDrawPoint) => {\n    con.save();\n    con.strokeStyle = \"black\";\n    con.translate(playerDrawPoint.x * config_1.TyleSize.x + config_1.TyleSize.x / 2, playerDrawPoint.y * config_1.TyleSize.y + config_1.TyleSize.y / 2);\n    con.rotate(Math.PI / 4);\n    con.beginPath();\n    con.moveTo(config_1.TyleSize.x / 2 + 4, -4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, -4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, -4 - 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8 + 8, 0);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, 4 + 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4, 4);\n    con.closePath();\n    con.stroke();\n    con.rotate((Math.PI / 4) * 2);\n    con.beginPath();\n    con.moveTo(config_1.TyleSize.x / 2 + 4, -4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, -4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, -4 - 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8 + 8, 0);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, 4 + 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4, 4);\n    con.closePath();\n    con.stroke();\n    con.rotate((Math.PI / 4) * 2);\n    con.beginPath();\n    con.moveTo(config_1.TyleSize.x / 2 + 4, -4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, -4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, -4 - 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8 + 8, 0);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, 4 + 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4, 4);\n    con.closePath();\n    con.stroke();\n    con.rotate((Math.PI / 4) * 2);\n    con.beginPath();\n    con.moveTo(config_1.TyleSize.x / 2 + 4, -4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, -4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, -4 - 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8 + 8, 0);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, 4 + 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4, 4);\n    con.closePath();\n    con.stroke();\n    con.rotate((Math.PI / 4) * 2);\n    con.beginPath();\n    con.moveTo(config_1.TyleSize.x / 2 + 4, -4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, -4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, -4 - 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8 + 8, 0);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, 4 + 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4 + 8, 4);\n    con.lineTo(config_1.TyleSize.x / 2 + 4, 4);\n    con.closePath();\n    con.stroke();\n    con.restore();\n};\n\n\n//# sourceURL=webpack:///./src/draw/drawDiagonalArrow.ts?");

/***/ }),

/***/ "./src/draw/drawEnemys.ts":
/*!********************************!*\
  !*** ./src/draw/drawEnemys.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst Enemy_1 = __webpack_require__(/*! ../enemy/Enemy */ \"./src/enemy/Enemy.ts\");\nconst blackballImg = new Image();\nblackballImg.src = \"./src/image/blackball.png\";\nexports.default = (con, drawStartPoint) => {\n    con.textBaseline = \"middle\";\n    con.textAlign = \"center\";\n    const enemys = State_1.S.enemys;\n    for (let i = 0; i < enemys.length; i++) {\n        if (enemys[i].point.x >= drawStartPoint.x &&\n            enemys[i].point.x < drawStartPoint.x + config_1.DrawRange.x &&\n            enemys[i].point.y >= drawStartPoint.y &&\n            drawStartPoint.y + config_1.DrawRange.y) {\n            drawEnemy(con, enemys[i], drawStartPoint);\n        }\n    }\n};\nfunction drawEnemy(con, enemy, drawStartPoint) {\n    const id = enemy.id;\n    if (id === Enemy_1.EnemyId.slime) {\n        drawEnemyImg.slime(con, enemy.point, drawStartPoint);\n    }\n    else if (id === Enemy_1.EnemyId.rat) {\n        drawEnemyImg.rat(con, enemy.point, drawStartPoint);\n    }\n}\nvar drawEnemyImg;\n(function (drawEnemyImg) {\n    function slime(con, popPoint, drawStartPoint) {\n        const ratio = 0.6;\n        const size_x = config_1.TyleSize.x * ratio;\n        const size_y = config_1.TyleSize.y * ratio;\n        const fix = (config_1.TyleSize.x * (1 - ratio)) / 2;\n        con.drawImage(blackballImg, 0, 0, 32, 32, (popPoint.x - drawStartPoint.x) * config_1.TyleSize.x + fix, (popPoint.y - drawStartPoint.y) * config_1.TyleSize.y + fix, size_x, size_y);\n    }\n    drawEnemyImg.slime = slime;\n    function rat(con, popPoint, drawStartPoint) {\n        con.fillStyle = \"blown\";\n        con.font = \"16px consolas\";\n        con.fillText(\"R\", (popPoint.x - drawStartPoint.x) * config_1.TyleSize.x + config_1.TyleSize.x / 2, (popPoint.y - drawStartPoint.y) * config_1.TyleSize.y + config_1.TyleSize.y / 2);\n    }\n    drawEnemyImg.rat = rat;\n})(drawEnemyImg = exports.drawEnemyImg || (exports.drawEnemyImg = {}));\n\n\n//# sourceURL=webpack:///./src/draw/drawEnemys.ts?");

/***/ }),

/***/ "./src/draw/drawFallItem.ts":
/*!**********************************!*\
  !*** ./src/draw/drawFallItem.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst item_1 = __webpack_require__(/*! ../config/item */ \"./src/config/item.ts\");\nexports.default = (con, drawStartPoint) => {\n    con.textBaseline = \"middle\";\n    con.textAlign = \"center\";\n    const items = State_1.S.fallItems;\n    for (let i = 0; i < items.length; i++) {\n        let item = items[i];\n        let point = item.point;\n        if (point.x >= drawStartPoint.x &&\n            point.x < drawStartPoint.x + config_1.DrawRange.x &&\n            point.y >= drawStartPoint.y &&\n            point.y < drawStartPoint.y + config_1.DrawRange.y) {\n            drawFallItems(con, item, drawStartPoint);\n        }\n    }\n};\nfunction drawFallItems(con, item, drawStartPoint) {\n    const type = item.item.types;\n    if (type === item_1.ItemType.weapon) {\n        drawItemImg.weapon(con, item.point, drawStartPoint);\n    }\n    else if (type === item_1.ItemType.shield) {\n        drawItemImg.shield(con, item.point, drawStartPoint);\n    }\n    else if (type === item_1.ItemType.potion) {\n        drawItemImg.potion(con, item.point, drawStartPoint);\n    }\n}\nexports.drawFallItems = drawFallItems;\n/* imgデータ定義 */\nconst weaponImg = new Image();\nweaponImg.src = \"./src/image/weapon32*32.png\";\nconst shieldImg = new Image();\nshieldImg.src = \"./src/image/shield32*32.png\";\nconst potionImg = new Image();\npotionImg.src = \"./src/image/potion32*32.png\";\nvar drawItemImg;\n(function (drawItemImg) {\n    const tipSize = 32;\n    const ratio = 0.8;\n    const size_x = config_1.TyleSize.x * ratio;\n    const size_y = config_1.TyleSize.y * ratio;\n    const fix = (config_1.TyleSize.x * (1 - ratio)) / 2;\n    function weapon(con, point, drawStartPoint) {\n        con.drawImage(weaponImg, tipSize * 1, tipSize * 0, 32, 32, (point.x - drawStartPoint.x) * config_1.TyleSize.x + fix, (point.y - drawStartPoint.y) * config_1.TyleSize.y + fix, size_x, size_y);\n    }\n    drawItemImg.weapon = weapon;\n    function shield(con, point, drawStartPoint) {\n        con.drawImage(shieldImg, tipSize * 1, tipSize * 0, 32, 32, (point.x - drawStartPoint.x) * config_1.TyleSize.x + fix, (point.y - drawStartPoint.y) * config_1.TyleSize.y + fix, size_x, size_y);\n    }\n    drawItemImg.shield = shield;\n    function potion(con, point, drawStartPoint) {\n        con.drawImage(potionImg, tipSize * 14, tipSize * 0, 32, 32, (point.x - drawStartPoint.x) * config_1.TyleSize.x + fix, (point.y - drawStartPoint.y) * config_1.TyleSize.y + fix, size_x, size_y);\n    }\n    drawItemImg.potion = potion;\n})(drawItemImg = exports.drawItemImg || (exports.drawItemImg = {}));\n\n\n//# sourceURL=webpack:///./src/draw/drawFallItem.ts?");

/***/ }),

/***/ "./src/draw/drawMessage.ts":
/*!*********************************!*\
  !*** ./src/draw/drawMessage.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nexports.default = (con) => {\n    const messages = State_1.S.messages;\n    con.save();\n    con.textBaseline = \"top\";\n    con.textAlign = \"left\";\n    con.font = \"16px consolas\";\n    con.translate(config_1.DrawRange.x * config_1.TyleSize.x, config_1.SCREEN.Y - ((16 + 6) * config_1.MessageLength.limit + 8 * 2));\n    for (let i = 0; i < messages.list.length; i++) {\n        const type = messages.list[i].type;\n        if (type === config_1.MessageType.normal) {\n            con.fillStyle = \"white\";\n        }\n        else if (type === config_1.MessageType.special) {\n            con.fillStyle = \"yellow\";\n        }\n        else if (type === config_1.MessageType.danger) {\n            con.fillStyle = \"red\";\n        }\n        else {\n            throw new Error(\"not supported\");\n        }\n        con.fillText(messages.list[i].text, 8, (16 + 6) * i + 8);\n    }\n    con.restore();\n};\n\n\n//# sourceURL=webpack:///./src/draw/drawMessage.ts?");

/***/ }),

/***/ "./src/draw/drawPlayer.ts":
/*!********************************!*\
  !*** ./src/draw/drawPlayer.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nexports.default = (con, playerDrawPoint) => {\n    con.textBaseline = \"middle\";\n    con.textAlign = \"center\";\n    con.fillStyle = \"black\";\n    con.font = \"24px consolas\";\n    con.fillText(\"@\", playerDrawPoint.x * config_1.TyleSize.x + config_1.TyleSize.x / 2, playerDrawPoint.y * config_1.TyleSize.y + config_1.TyleSize.y / 2);\n};\n\n\n//# sourceURL=webpack:///./src/draw/drawPlayer.ts?");

/***/ }),

/***/ "./src/draw/drawStatus.ts":
/*!********************************!*\
  !*** ./src/draw/drawStatus.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst text_1 = __webpack_require__(/*! ../text/text */ \"./src/text/text.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nfunction fillStatusText(con, text, lineNum) {\n    con.fillText(text, 8, (24 + 6) * lineNum + 8);\n}\nexports.default = (con) => {\n    //ステータスメッセージの定義\n    const depth = State_1.S.player.depth + text_1.TEXT.depth;\n    const level = text_1.TEXT.level + \":\" + State_1.S.player.level;\n    const HP = text_1.TEXT.hp + \":\" + State_1.S.player.HP + \"/\" + State_1.S.player.totalHP;\n    const ATK = text_1.TEXT.ATK + \":\" + State_1.S.player.totalATK;\n    const DEF = text_1.TEXT.DEF + \":\" + State_1.S.player.totalDEF;\n    const EXP = text_1.TEXT.EXP + \":\" + State_1.S.player.EXP + \"/\" + State_1.S.player.requireEXP;\n    con.save();\n    con.textBaseline = \"top\";\n    con.textAlign = \"left\";\n    con.font = \"24px consolas\";\n    con.fillStyle = \"white\";\n    con.translate(config_1.DrawRange.x * config_1.TyleSize.x, 0);\n    fillStatusText(con, depth, 0);\n    fillStatusText(con, level, 1);\n    fillStatusText(con, HP, 2);\n    fillStatusText(con, ATK, 3);\n    fillStatusText(con, DEF, 4);\n    fillStatusText(con, EXP, 5);\n    con.restore();\n};\n\n\n//# sourceURL=webpack:///./src/draw/drawStatus.ts?");

/***/ }),

/***/ "./src/draw/drawTitle.ts":
/*!*******************************!*\
  !*** ./src/draw/drawTitle.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst text_1 = __webpack_require__(/*! ../text/text */ \"./src/text/text.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nexports.default = (con) => {\n    const size_x = config_1.DrawRange.x * config_1.TyleSize.x;\n    const size_y = config_1.DrawRange.y * config_1.TyleSize.y;\n    con.textBaseline = \"alphabetic\";\n    con.textAlign = \"center\";\n    con.fillStyle = \"white\";\n    con.font = \"48px consolas\";\n    con.fillText(text_1.TEXT.title, size_x / 2, size_y / 4);\n    con.font = \"32px consolas\";\n    con.fillText(\"> \" + text_1.TEXT.start, size_x / 2, (size_y / 4) * 3);\n};\n\n\n//# sourceURL=webpack:///./src/draw/drawTitle.ts?");

/***/ }),

/***/ "./src/draw/drawTyles.ts":
/*!*******************************!*\
  !*** ./src/draw/drawTyles.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\n//階段などのイメージ\nconst structureImg = new Image();\nstructureImg.src = \"./src/image/GBstructure.png\";\n//床のイメージ\nconst tyleImg = new Image();\ntyleImg.src = \"./src/image/GBtyle.png\";\n//壁のイメージ\nconst wallImg = new Image();\nwallImg.src = \"./src/image/GBwall.png\";\nfunction drawTyles(con, drawStartPoint) {\n    for (let i = 0; i < config_1.DrawRange.x; i++) {\n        for (let j = 0; j < config_1.DrawRange.y; j++) {\n            const block = State_1.S.floors[State_1.S.player.depth].blocks[drawStartPoint.x + i][drawStartPoint.y + j];\n            const tyleDrawPoint = { x: i, y: j };\n            if (block.base === config_1.MapType.floor) {\n                DrawTyle.floor(con, tyleDrawPoint);\n            }\n            else if (block.base === config_1.MapType.wall) {\n                DrawTyle.wall(con, tyleDrawPoint);\n            }\n            else if (block.base === config_1.MapType.downstair) {\n                //下地\n                DrawTyle.floor(con, tyleDrawPoint);\n                DrawTyle.downstair(con, tyleDrawPoint);\n            }\n        }\n    }\n}\nexports.drawTyles = drawTyles;\nvar DrawTyle;\n(function (DrawTyle) {\n    function floor(con, point) {\n        con.drawImage(tyleImg, 0, 5 * 16, 16, 16, point.x * config_1.TyleSize.x, point.y * config_1.TyleSize.y, config_1.TyleSize.x, config_1.TyleSize.y);\n    }\n    DrawTyle.floor = floor;\n    function wall(con, point) {\n        con.drawImage(wallImg, 0, 3 * 16, 16, 16, point.x * config_1.TyleSize.x, point.y * config_1.TyleSize.y, config_1.TyleSize.x, config_1.TyleSize.y);\n    }\n    DrawTyle.wall = wall;\n    function downstair(con, point) {\n        con.drawImage(structureImg, 1 * 16, 1 * 16, 16, 16, point.x * config_1.TyleSize.x, point.y * config_1.TyleSize.y, config_1.TyleSize.x, config_1.TyleSize.y);\n    }\n    DrawTyle.downstair = downstair;\n})(DrawTyle = exports.DrawTyle || (exports.DrawTyle = {}));\n\n\n//# sourceURL=webpack:///./src/draw/drawTyles.ts?");

/***/ }),

/***/ "./src/enemy/Enemy.ts":
/*!****************************!*\
  !*** ./src/enemy/Enemy.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nvar EnemyId;\n(function (EnemyId) {\n    EnemyId[EnemyId[\"slime\"] = 0] = \"slime\";\n    EnemyId[EnemyId[\"rat\"] = 1] = \"rat\";\n})(EnemyId = exports.EnemyId || (exports.EnemyId = {}));\nclass Enemy {\n    constructor(point, Material, level) {\n        this.name = Material.name;\n        this.point = point;\n        this.id = Material.id;\n        this.level = Material.level;\n        this.baseHP = Material.HP;\n        this.equipHP = 0;\n        this.baseATK = Material.ATK;\n        this.equipATK = 0;\n        this.baseDEF = Material.DEF;\n        this.equipDEF = 0;\n        this.EXP = Material.EXP;\n        //レベルが与えられていた場合はレベルアップ処理\n        if (level) {\n            while (level > this.level) {\n                this.level++;\n                this.baseHP = Math.ceil(this.baseHP * 1.2);\n                this.baseATK = Math.ceil(this.baseATK * 1.1);\n                this.baseDEF = Math.ceil(this.baseDEF * 1.1);\n                this.EXP = Math.ceil(this.EXP * 1.4);\n            }\n        }\n        this.HP = this.totalHP;\n        this.ATK = this.totalATK;\n        this.DEF = this.totalDEF;\n    }\n    get totalHP() {\n        return this.baseHP + this.equipHP;\n    }\n    get totalATK() {\n        return this.baseATK + this.equipATK;\n    }\n    get totalDEF() {\n        return this.baseDEF + this.equipDEF;\n    }\n    moveLeft() {\n        if (this.point.x === 0) {\n            return this;\n        }\n        this.point.x = --this.point.x;\n        return this;\n    }\n    moveUp() {\n        if (this.point.y === 0) {\n            return this;\n        }\n        this.point.y = --this.point.y;\n        return this;\n    }\n    moveRight() {\n        if (this.point.x === State_1.S.floors[State_1.S.player.depth].size.width - 1) {\n            return this;\n        }\n        this.point.x = ++this.point.x;\n        return this;\n    }\n    moveDown() {\n        if (this.point.y === State_1.S.floors[State_1.S.player.depth].size.height - 1) {\n            return this;\n        }\n        this.point.y = ++this.point.y;\n        return this;\n    }\n    moveUpperLeft() {\n        if (this.point.x === 0 || this.point.y === 0) {\n            return this;\n        }\n        this.point.x = --this.point.x;\n        this.point.y = --this.point.y;\n        return this;\n    }\n    moveUpperRight() {\n        if (this.point.x === State_1.S.floors[State_1.S.player.depth].size.width - 1 ||\n            this.point.y === 0) {\n            return this;\n        }\n        this.point.x = ++this.point.x;\n        this.point.y = --this.point.y;\n        return this;\n    }\n    moveDownnerLeft() {\n        if (this.point.x === State_1.S.floors[State_1.S.player.depth].size.width - 1 ||\n            this.point.y === State_1.S.floors[State_1.S.player.depth].size.height - 1) {\n            return this;\n        }\n        this.point.x = --this.point.x;\n        this.point.y = ++this.point.y;\n        return this;\n    }\n    moveDownnerRight() {\n        if (this.point.x === State_1.S.floors[State_1.S.player.depth].size.width - 1 ||\n            this.point.y === State_1.S.floors[State_1.S.player.depth].size.height - 1) {\n            return this;\n        }\n        this.point.x = ++this.point.x;\n        this.point.y = ++this.point.y;\n        return this;\n    }\n}\nexports.Enemy = Enemy;\n\n\n//# sourceURL=webpack:///./src/enemy/Enemy.ts?");

/***/ }),

/***/ "./src/enemy/EnemyList.ts":
/*!********************************!*\
  !*** ./src/enemy/EnemyList.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Enemy_1 = __webpack_require__(/*! ./Enemy */ \"./src/enemy/Enemy.ts\");\nexports.EnemyOnFloor = [\n    [],\n    [Enemy_1.EnemyId.slime, Enemy_1.EnemyId.rat],\n    [Enemy_1.EnemyId.slime, Enemy_1.EnemyId.rat],\n];\nexports.EnemyList = [\n    {\n        id: Enemy_1.EnemyId.slime,\n        name: \"スライム\",\n        level: 1,\n        HP: 5,\n        ATK: 1,\n        DEF: 1,\n        EXP: 1,\n    },\n    {\n        id: Enemy_1.EnemyId.rat,\n        name: \"大ネズミ\",\n        level: 1,\n        HP: 7,\n        ATK: 2,\n        DEF: 2,\n        EXP: 3,\n    },\n];\n\n\n//# sourceURL=webpack:///./src/enemy/EnemyList.ts?");

/***/ }),

/***/ "./src/enemy/doEnemyTurn.ts":
/*!**********************************!*\
  !*** ./src/enemy/doEnemyTurn.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst calcDamage_1 = __importDefault(__webpack_require__(/*! ../battle/calcDamage */ \"./src/battle/calcDamage.ts\"));\nconst messages_1 = __webpack_require__(/*! ../text/messages */ \"./src/text/messages.ts\");\nconst text_1 = __webpack_require__(/*! ../text/text */ \"./src/text/text.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nfunction default_1() {\n    const enemys = State_1.S.enemys;\n    const player = { x: State_1.S.player.x, y: State_1.S.player.y };\n    const floor = State_1.S.floors[State_1.S.player.depth];\n    // console.log(`プレイヤーの位置`);\n    // console.log(player);\n    for (let i = 0; i < enemys.length; i++) {\n        let enemy = enemys[i];\n        const viewArea = calcFieldOfView(enemy);\n        // console.log(`索敵範囲`);\n        // console.log(viewArea);\n        //プレイヤーを探す\n        const result = isPointInArea(player, viewArea);\n        // console.log(`索敵結果 : ${result}`);\n        // console.log(\"移動前の敵の位置\");\n        // console.log(enemy.point);\n        // 視野内にプレイヤーを見つけた場合追尾する;\n        if (result) {\n            enemy = activeEnemy(enemy, enemys, player, floor);\n            //攻撃の結果プレイヤーのHPがゼロになったらゲームオーバー\n            if (State_1.S.player.HP <= 0) {\n                defeatPlayer();\n            }\n        }\n        else {\n            enemy = nonActiveEnemy(enemy, enemys, player, floor);\n        }\n        // console.log(\"移動後の敵の位置\");\n        // console.log(enemy.point);\n    }\n}\nexports.default = default_1;\nfunction activeEnemy(enemy, enemys, player, floor) {\n    /****** 攻撃判定 *******/\n    //プレイヤーと隣接しているか？\n    let isAdjacent = searchPlayer(enemy);\n    //隣接していたら攻撃を行って処理終了\n    if (isAdjacent) {\n        attackPlayer(enemy);\n        return enemy;\n    }\n    /****** 移動処理 *******/\n    //Dはdirection\n    const firstD = findNearDirection(player, enemy);\n    const secondDs = findSecondNearDirection(firstD);\n    const thirdDs = findThirdNearDirection(firstD);\n    //チェックする方向の配列\n    const tryDs = [\n        firstD,\n        secondDs.next,\n        secondDs.previous,\n        thirdDs.next,\n        thirdDs.previous,\n    ];\n    //移動を試みる\n    for (let i = 0; i < tryDs.length; i++) {\n        console.log(`${i}回目`);\n        let direction = tryDs[i];\n        let moveTo = movePoint(enemy, direction);\n        let isCanStand = floor.isCanStand(moveTo);\n        let isPointNoEnemy = moveToSearch(moveTo, enemys);\n        let isPointNoPlayer = player.x !== moveTo.x || player.y !== moveTo.y;\n        let moveCheck = isCanStand && isPointNoEnemy && isPointNoPlayer;\n        console.log(`moveCheck : ${moveCheck}`);\n        if (moveCheck) {\n            enemy.point = moveTo;\n            break;\n        }\n    }\n    return enemy;\n}\nexports.activeEnemy = activeEnemy;\n// プレイヤーがいなかった場合のモンスターの行動\nfunction nonActiveEnemy(enemy, enemys, player, floor) {\n    const moveTo = randomMove(enemy);\n    const isCanStand = floor.isCanStand(moveTo);\n    const isPointNoEnemy = moveToSearch(moveTo, enemys);\n    const isPointNoPlayer = player.x !== moveTo.x || player.y !== moveTo.y;\n    const moveCheck = isCanStand && isPointNoEnemy && isPointNoPlayer;\n    if (moveCheck) {\n        enemy.point = moveTo;\n        return enemy;\n    }\n    else {\n        return enemy;\n    }\n}\nexports.nonActiveEnemy = nonActiveEnemy;\nfunction isEnemyInRoom(enemy, rooms) {\n    let isInRoom = false;\n    for (let i = 0; i < rooms.length; i++) {\n        const room = rooms[i];\n        const result = room.isInRoom(enemy.point);\n        if (result) {\n            isInRoom = true;\n            break;\n        }\n    }\n    return isInRoom;\n}\nexports.isEnemyInRoom = isEnemyInRoom;\n//指定された座標にモンスターが存在するか判断、いたらtrueを返す\nfunction moveToSearch(point, enemys) {\n    let searchResult = true;\n    for (let i = 0; i < enemys.length; i++) {\n        if (enemys[i].point.x === point.x && enemys[i].point.y === point.y) {\n            searchResult = false;\n            break;\n        }\n    }\n    return searchResult;\n}\nexports.moveToSearch = moveToSearch;\n//ランダムでモンスターが移動する予定の座標を返す\nfunction randomMove(enemy) {\n    const direction = Math.floor(Math.random() * 8); //番号で移動方向を決める\n    const moveTo = movePoint(enemy, direction);\n    return moveTo;\n}\nexports.randomMove = randomMove;\nfunction movePoint(enemy, direction) {\n    let x = enemy.point.x;\n    let y = enemy.point.y;\n    let MoveTo;\n    if (direction === config_1.Direction.left)\n        x--;\n    else if (direction === config_1.Direction.top)\n        y--;\n    else if (direction === config_1.Direction.right)\n        x++;\n    else if (direction === config_1.Direction.bottom)\n        y++;\n    else if (direction === config_1.Direction.topLeft) {\n        x--;\n        y--;\n    }\n    else if (direction === config_1.Direction.topRight) {\n        x++;\n        y--;\n    }\n    else if (direction === config_1.Direction.bottomLeft) {\n        x--;\n        y++;\n    }\n    else if (direction === config_1.Direction.bottomRight) {\n        x++;\n        y++;\n    }\n    MoveTo = { x: x, y: y };\n    return MoveTo;\n}\nexports.movePoint = movePoint;\nfunction findNearDirection(point, enemy) {\n    const target = point;\n    const self = enemy.point;\n    let direction;\n    //左上\n    if (target.x < self.x && target.y < self.y)\n        direction = config_1.Direction.topLeft;\n    //真上\n    else if (target.x === self.x && target.y < self.y)\n        direction = config_1.Direction.top;\n    //右上\n    else if (target.x > self.x && target.y < self.y)\n        direction = config_1.Direction.topRight;\n    //右\n    else if (target.x > self.x && target.y === self.y)\n        direction = config_1.Direction.right;\n    //右下\n    else if (target.x > self.x && target.y > self.y)\n        direction = config_1.Direction.bottomRight;\n    //真下\n    else if (target.x === self.x && target.y > self.y)\n        direction = config_1.Direction.bottom;\n    //左下\n    else if (target.x < self.y && target.y > self.y)\n        direction = config_1.Direction.bottomLeft;\n    //左\n    else\n        direction = config_1.Direction.left;\n    return direction;\n}\nexports.findNearDirection = findNearDirection;\nfunction findSecondNearDirection(direction) {\n    let next;\n    let previous;\n    if (direction === config_1.Direction.topLeft) {\n        next = config_1.Direction.top;\n        previous = --direction;\n    }\n    else if (direction === config_1.Direction.top) {\n        next = ++direction;\n        previous = config_1.Direction.topLeft;\n    }\n    else {\n        next = ++direction;\n        previous = --direction;\n    }\n    return { next: next, previous: previous };\n}\nexports.findSecondNearDirection = findSecondNearDirection;\nfunction findThirdNearDirection(direction) {\n    let next;\n    let previous;\n    if (direction === config_1.Direction.topLeft) {\n        next = config_1.Direction.topRight;\n        previous = direction - 2;\n    }\n    else if (direction === config_1.Direction.left) {\n        next = config_1.Direction.top;\n        previous = direction - 2;\n    }\n    else if (direction === config_1.Direction.top) {\n        next = direction + 2;\n        previous = config_1.Direction.left;\n    }\n    else if (direction === config_1.Direction.topRight) {\n        next = direction + 2;\n        previous = config_1.Direction.topLeft;\n    }\n    else {\n        next = direction + 2;\n        previous = direction - 2;\n    }\n    return { next: next, previous: previous };\n}\nexports.findThirdNearDirection = findThirdNearDirection;\n//プレイヤーが倒された場合\nfunction defeatPlayer() {\n    State_1.S.player.HP = 0;\n    State_1.S.Frag.gameover = true;\n    const addMsg = new messages_1.Message(text_1.TEXT.die, config_1.MessageType.danger);\n    State_1.S.messages.add(addMsg);\n}\nexports.defeatPlayer = defeatPlayer;\n//モンスターがプレイヤーに攻撃する処理\nfunction attackPlayer(enemy) {\n    const damage = calcDamage_1.default(enemy.ATK, State_1.S.player.DEF);\n    State_1.S.player.HP -= damage;\n    State_1.S.messages.add(new messages_1.Message(text_1.actionMsg.beAttacked(enemy.name, damage), config_1.MessageType.normal));\n}\nexports.attackPlayer = attackPlayer;\nfunction calcFieldOfView(enemy) {\n    const view = config_1.EnemyConf.fieldOfView;\n    const start = { x: enemy.point.x - view, y: enemy.point.y - view };\n    const end = { x: enemy.point.x + view, y: enemy.point.y + view };\n    const fieldOfView = { start: start, end: end };\n    return fieldOfView;\n}\nexports.calcFieldOfView = calcFieldOfView;\nfunction isPointInArea(point, area) {\n    let isIn = false;\n    if (point.x >= area.start.x &&\n        point.x <= area.end.x &&\n        point.y >= area.start.y &&\n        point.y <= area.end.y) {\n        isIn = true;\n    }\n    return isIn;\n}\nexports.isPointInArea = isPointInArea;\n//モンスターの周辺にプレイヤーがいればtrueを返す\nfunction searchPlayer(enemy) {\n    //エネミーの座標取り出し\n    const player = State_1.S.player;\n    const self = enemy.point;\n    //上下左右でプレイヤーを探す\n    const left = player.x === self.x - 1 && player.y === self.y;\n    const up = player.x === self.x && player.y === self.y - 1;\n    const right = player.x === self.x + 1 && player.y === self.y;\n    const down = player.x === self.x && player.y === self.y + 1;\n    const upperLeft = player.x === self.x - 1 && player.y === self.y - 1;\n    const upperRight = player.x === self.x + 1 && player.y === self.y - 1;\n    const downLeft = player.x === self.x - 1 && player.y === self.y + 1;\n    const downRight = player.x === self.x + 1 && player.y === self.y + 1;\n    if (left ||\n        up ||\n        right ||\n        down ||\n        upperLeft ||\n        upperRight ||\n        downLeft ||\n        downRight) {\n        return true;\n    }\n    else {\n        return false;\n    }\n}\nexports.searchPlayer = searchPlayer;\n\n\n//# sourceURL=webpack:///./src/enemy/doEnemyTurn.ts?");

/***/ }),

/***/ "./src/enemy/popEnemy.ts":
/*!*******************************!*\
  !*** ./src/enemy/popEnemy.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst EnemyList_1 = __webpack_require__(/*! ./EnemyList */ \"./src/enemy/EnemyList.ts\");\nconst Enemy_1 = __webpack_require__(/*! ./Enemy */ \"./src/enemy/Enemy.ts\");\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst RandomNum_1 = __webpack_require__(/*! ../module/RandomNum */ \"./src/module/RandomNum.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nexports.default = (floor) => {\n    let popEnemys = [];\n    for (let i = 0; i < floor.rooms.length; i++) {\n        //部屋に湧く敵の数を決める\n        let popCountLim = RandomNum_1.Random.rangeInt(config_1.EnemyConf.popInitMin, config_1.EnemyConf.popInitMax);\n        for (let j = 0; j < popCountLim; j++) {\n            // ポップポイントをランダムで決める\n            const popPoint = floor.coordinateCanStand();\n            //プレイヤーと同じ位置のポップを避ける\n            const isNotOverlap = checkOverlappingPlayer(popPoint, {\n                x: State_1.S.player.x,\n                y: State_1.S.player.y,\n            });\n            //被っていなかったらモンスターの配列に入れる\n            if (isNotOverlap) {\n                let list = EnemyList_1.EnemyOnFloor[State_1.S.player.depth];\n                //まだリストができていなかった場合\n                if (!list) {\n                    list = EnemyList_1.EnemyOnFloor[EnemyList_1.EnemyOnFloor.length - 1];\n                }\n                //階層の出現リストからランダムに敵を選ぶ\n                const enemyNum = RandomNum_1.Random.rangeInt(0, list.length);\n                const EnemyId = list[enemyNum];\n                const material = EnemyList_1.EnemyList[EnemyId];\n                const popEnemy = new Enemy_1.Enemy(popPoint, material);\n                popEnemys.push(popEnemy);\n            }\n        }\n    }\n    return popEnemys;\n};\n//プレイヤーと同じ位置での発生を避ける\nfunction checkOverlappingPlayer(enemyPoint, playerPoint) {\n    if (enemyPoint.x === playerPoint.x && enemyPoint.y === playerPoint.y) {\n        return false;\n    }\n    return true;\n}\n\n\n//# sourceURL=webpack:///./src/enemy/popEnemy.ts?");

/***/ }),

/***/ "./src/event/MoveEvent.ts":
/*!********************************!*\
  !*** ./src/event/MoveEvent.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst KeyCode_1 = __webpack_require__(/*! ../key/KeyCode */ \"./src/key/KeyCode.ts\");\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst Draw_1 = __webpack_require__(/*! ../draw/Draw */ \"./src/draw/Draw.ts\");\nconst player_1 = __importDefault(__webpack_require__(/*! ../player/player */ \"./src/player/player.ts\"));\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst battleEvents_1 = __webpack_require__(/*! ../battle/battleEvents */ \"./src/battle/battleEvents.ts\");\nconst doEnemyTurn_1 = __importDefault(__webpack_require__(/*! ../enemy/doEnemyTurn */ \"./src/enemy/doEnemyTurn.ts\"));\nconst getOffFloor_1 = __importDefault(__webpack_require__(/*! ./getOffFloor */ \"./src/event/getOffFloor.ts\"));\nconst LayerDraw_1 = __webpack_require__(/*! ../draw/LayerDraw */ \"./src/draw/LayerDraw.ts\");\nconst text_1 = __webpack_require__(/*! ../text/text */ \"./src/text/text.ts\");\nconst item_1 = __webpack_require__(/*! ../config/item */ \"./src/config/item.ts\");\nexports.default = () => {\n    window.addEventListener(\"keydown\", (e) => {\n        if (State_1.S.Frag.gameover || !State_1.S.Frag.start || State_1.S.Frag.menu) {\n            return;\n        }\n        let floor = State_1.S.floors[State_1.S.player.depth];\n        e.preventDefault();\n        if (e.keyCode === KeyCode_1.KeyCode.left ||\n            e.keyCode === KeyCode_1.KeyCode.up ||\n            e.keyCode === KeyCode_1.KeyCode.right ||\n            e.keyCode === KeyCode_1.KeyCode.down) {\n            const movePlayer = new player_1.default(State_1.S.player.x, State_1.S.player.y);\n            // shiftを押している\n            if (e.shiftKey) {\n                if (State_1.S.KeyPress.left && State_1.S.KeyPress.up) {\n                    movePlayer.moveUpperLeft(floor);\n                }\n                else if (State_1.S.KeyPress.right && State_1.S.KeyPress.up) {\n                    movePlayer.moveUpperRight(floor);\n                }\n                else if (State_1.S.KeyPress.left && State_1.S.KeyPress.down) {\n                    movePlayer.moveDownnerLeft(floor);\n                }\n                else if (State_1.S.KeyPress.right && State_1.S.KeyPress.down) {\n                    movePlayer.moveDownnerRight(floor);\n                }\n                else {\n                    return;\n                }\n            }\n            // shiftを押していない\n            else {\n                if (e.keyCode === KeyCode_1.KeyCode.left) {\n                    movePlayer.moveLeft();\n                }\n                else if (e.keyCode === KeyCode_1.KeyCode.up) {\n                    movePlayer.moveUp();\n                }\n                else if (e.keyCode === KeyCode_1.KeyCode.right) {\n                    movePlayer.moveRight(floor);\n                }\n                else if (e.keyCode === KeyCode_1.KeyCode.down) {\n                    movePlayer.moveDown(floor);\n                }\n            }\n            // 現在の位置から移動していた場合\n            if (movePlayer.x !== State_1.S.player.x || movePlayer.y !== State_1.S.player.y) {\n                const movePoint = { x: movePlayer.x, y: movePlayer.y };\n                /* 移動先にアイテムがあった場合 */\n                const fallItems = State_1.S.fallItems;\n                const searchItemResult = searchFallItem(movePoint, fallItems);\n                console.log(searchItemResult);\n                if (searchItemResult) {\n                    if (State_1.S.bags.items.length === item_1.ItemConf.bagMax) {\n                        let cantPickMsg = { text: text_1.TEXT.bagFull, type: config_1.MessageType.normal };\n                        State_1.S.messages.add(cantPickMsg);\n                    }\n                    else {\n                        let pickResult = pickFallItem(State_1.S, searchItemResult);\n                        let pickFallItemMsg = {\n                            text: text_1.actionMsg.pickFallItem(searchItemResult.item.name),\n                            type: config_1.MessageType.normal,\n                        };\n                        State_1.S.bags = pickResult.bags;\n                        State_1.S.fallItems = pickResult.fallItems;\n                        State_1.S.messages.add(pickFallItemMsg);\n                    }\n                }\n                //移動先に敵がいた場合\n                const enemys = State_1.S.enemys;\n                const result = battleEvents_1.battleEvent.searchEnemy(movePoint, enemys);\n                if ((result.enemy && result.index) ||\n                    (result.enemy && result.index === 0) //0はfalseを返すため場合分け\n                ) {\n                    const targetEnemy = result.enemy;\n                    const enemyIndex = result.index;\n                    //ダメージ計算\n                    battleEvents_1.battleEvent.attackResult(targetEnemy);\n                    //敵のHPが0以下になった場合\n                    if (targetEnemy.HP <= 0) {\n                        battleEvents_1.battleEvent.defeatEnemy(enemys, targetEnemy, enemyIndex);\n                    }\n                    while (State_1.S.player.EXP >= State_1.S.player.requireEXP) {\n                        battleEvents_1.battleEvent.levelUp();\n                    }\n                }\n                else {\n                    //移動予定のブロックを特定\n                    const targetBlock = State_1.S.floors[State_1.S.player.depth].blocks[movePoint.x][movePoint.y];\n                    //移動先が通過可能なブロックならプレイヤーの座標を更新\n                    if (config_1.CanStand[targetBlock.base]) {\n                        State_1.S.player.x = movePoint.x;\n                        State_1.S.player.y = movePoint.y;\n                    }\n                    else {\n                        Draw_1.draw(Draw_1.con, State_1.S.env);\n                    }\n                }\n            }\n            else {\n                return;\n            }\n        }\n        else {\n            return;\n        }\n        doEnemyTurn_1.default();\n        if (State_1.S.Frag.gameover) {\n            LayerDraw_1.layerIn(LayerDraw_1.layer, State_1.S.env);\n        }\n        Draw_1.draw(Draw_1.con, State_1.S.env);\n    });\n    window.addEventListener(\"keydown\", (e) => __awaiter(void 0, void 0, void 0, function* () {\n        e.preventDefault(); //スペースでのスクロールを防止\n        if (e.keyCode === KeyCode_1.KeyCode.space) {\n            const block = State_1.S.floors[State_1.S.player.depth].blocks[State_1.S.player.x][State_1.S.player.y];\n            if (block.base === config_1.MapType.downstair) {\n                getOffFloor_1.default();\n                State_1.S.Frag.eyecatch = true;\n            }\n        }\n        else {\n            return;\n        }\n        yield LayerDraw_1.layerIn(LayerDraw_1.layer, State_1.S.env);\n        Draw_1.draw(Draw_1.con, State_1.S.env);\n        yield LayerDraw_1.layerOut(LayerDraw_1.layer, State_1.S.env);\n    }));\n};\nfunction searchFallItem(movePoint, fallItems) {\n    for (let i = 0; i < fallItems.length; i++) {\n        let fallItem = fallItems[i];\n        let point = fallItem.point;\n        if (point.x === movePoint.x && point.y === movePoint.y) {\n            return fallItem;\n        }\n    }\n}\nexports.searchFallItem = searchFallItem;\nfunction pickFallItem(S, fallItem) {\n    S.bags.store(fallItem.item);\n    S.fallItems = removeByIndex(S.fallItems, fallItem.index);\n    return { bags: S.bags, fallItems: S.fallItems };\n}\nexports.pickFallItem = pickFallItem;\nfunction removeByIndex(items, index) {\n    items.some((v, i) => {\n        if (v.index === index)\n            items.splice(i, 1);\n    });\n    return items;\n}\nexports.removeByIndex = removeByIndex;\n\n\n//# sourceURL=webpack:///./src/event/MoveEvent.ts?");

/***/ }),

/***/ "./src/event/getOffFloor.ts":
/*!**********************************!*\
  !*** ./src/event/getOffFloor.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst text_1 = __webpack_require__(/*! ../text/text */ \"./src/text/text.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst messages_1 = __webpack_require__(/*! ../text/messages */ \"./src/text/messages.ts\");\nconst CreateFloor_1 = __importDefault(__webpack_require__(/*! ../floor/CreateFloor */ \"./src/floor/CreateFloor.ts\"));\nconst popEnemy_1 = __importDefault(__webpack_require__(/*! ../enemy/popEnemy */ \"./src/enemy/popEnemy.ts\"));\nconst popItem_1 = __importDefault(__webpack_require__(/*! ../item/popItem */ \"./src/item/popItem.ts\"));\nexports.default = () => {\n    State_1.S.player.stairDown(State_1.S.floors[State_1.S.player.depth]);\n    State_1.S.messages.add(new messages_1.Message(text_1.TEXT.downstair, config_1.MessageType.normal));\n    if (!State_1.S.floors[State_1.S.player.depth]) {\n        const floorSize = {\n            width: config_1.FloorConf.width,\n            height: config_1.FloorConf.height,\n        };\n        let floor = CreateFloor_1.default(floorSize);\n        //フロアステートの更新\n        State_1.S.floors[State_1.S.player.depth] = floor;\n        //プレイヤーの位置更新\n        let playerPoint = floor.coordinateCanStand();\n        State_1.S.player.x = playerPoint.x;\n        State_1.S.player.y = playerPoint.y;\n        //モンスターのリセット\n        State_1.S.enemys = [];\n        //モンスターのイニシャライズ\n        State_1.S.enemys = popEnemy_1.default(floor);\n        //アイテムの生成\n        State_1.S.fallItems = popItem_1.default(floor);\n    }\n};\n\n\n//# sourceURL=webpack:///./src/event/getOffFloor.ts?");

/***/ }),

/***/ "./src/floor/CreateFloor.ts":
/*!**********************************!*\
  !*** ./src/floor/CreateFloor.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst createRooms_1 = __importDefault(__webpack_require__(/*! ./usecase/createRooms */ \"./src/floor/usecase/createRooms.ts\"));\nconst createDownstair_1 = __importDefault(__webpack_require__(/*! ./usecase/createDownstair */ \"./src/floor/usecase/createDownstair.ts\"));\nconst createGates_1 = __webpack_require__(/*! ./usecase/createGates */ \"./src/floor/usecase/createGates.ts\");\nconst fillUpWall_1 = __importDefault(__webpack_require__(/*! ./usecase/fillUpWall */ \"./src/floor/usecase/fillUpWall.ts\"));\nconst digRooms_1 = __importDefault(__webpack_require__(/*! ./usecase/digRooms */ \"./src/floor/usecase/digRooms.ts\"));\nconst digPaths_1 = __importDefault(__webpack_require__(/*! ./usecase/digPaths */ \"./src/floor/usecase/digPaths.ts\"));\nconst putDownstair_1 = __importDefault(__webpack_require__(/*! ./usecase/putDownstair */ \"./src/floor/usecase/putDownstair.ts\"));\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst Floor_1 = __webpack_require__(/*! ./Floor */ \"./src/floor/Floor.ts\");\nexports.default = (floorSize) => {\n    let rooms = [];\n    let gates = [];\n    let downstair;\n    //部屋の生成\n    rooms = createRooms_1.default(config_1.RoomConf.trialNum, floorSize);\n    //ゲートポイントの生成\n    let result = createGates_1.createGates(rooms);\n    gates = result.gates;\n    rooms = result.rooms;\n    downstair = createDownstair_1.default(rooms);\n    console.log(gates);\n    console.log(rooms);\n    let floor = new Floor_1.Floor(floorSize, rooms, gates, downstair);\n    floor.blocks = fillUpWall_1.default(floor, floor.blocks);\n    floor.blocks = digRooms_1.default(floor, floor.blocks);\n    floor.blocks = digPaths_1.default(floor, floor.blocks);\n    floor.blocks = putDownstair_1.default(floor);\n    return floor;\n};\n\n\n//# sourceURL=webpack:///./src/floor/CreateFloor.ts?");

/***/ }),

/***/ "./src/floor/Dig.ts":
/*!**************************!*\
  !*** ./src/floor/Dig.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nclass Dig {\n    constructor(A, B) {\n        (this.start = A), (this.end = B);\n    }\n    //部屋を掘る\n    square(blocks) {\n        for (let i = this.start.x; i <= this.end.x; i++) {\n            for (let j = this.start.y; j <= this.end.y; j++) {\n                blocks[i][j].base = config_1.MapType.floor;\n            }\n        }\n        return blocks;\n    }\n    //横にパスを掘る\n    sideToside(blocks) {\n        const axisX = Math.floor(Math.abs(this.start.x + this.end.x) / 2);\n        //掘り進めるポイント\n        const start_end = { x: axisX, y: this.start.y };\n        const end_end = { x: axisX, y: this.end.y };\n        blocks = new Dig(this.start, start_end).side(blocks);\n        blocks = new Dig(this.end, end_end).side(blocks);\n        //両部屋から掘り進めた道をつなげる\n        blocks = new Dig(start_end, end_end).vertical(blocks);\n        return blocks;\n    }\n    //縦にパスを掘る\n    topTobottom(blocks) {\n        const axisY = Math.floor(Math.abs(this.start.y + this.end.y) / 2);\n        const start_end = { x: this.start.x, y: axisY };\n        const end_end = { x: this.end.x, y: axisY };\n        blocks = new Dig(this.start, start_end).vertical(blocks);\n        blocks = new Dig(this.end, end_end).vertical(blocks);\n        //両部屋から掘り進めた道をつなげる\n        blocks = new Dig(start_end, end_end).side(blocks);\n        return blocks;\n    }\n    //縦に掘る\n    vertical(blocks) {\n        //縦軸がずれてたら処理終了\n        if (this.start.x !== this.end.x) {\n            console.log(\"基準となる軸がずれています\");\n            return blocks;\n        }\n        const axisX = this.start.x;\n        if (this.start.y <= this.end.y) {\n            for (let i = this.start.y; i <= this.end.y; i++) {\n                blocks[axisX][i].base = config_1.MapType.floor;\n            }\n        }\n        else {\n            for (let i = this.end.y; i <= this.start.y; i++) {\n                blocks[axisX][i].base = config_1.MapType.floor;\n            }\n        }\n        return blocks;\n    }\n    //横に掘る\n    side(blocks) {\n        if (this.start.y !== this.end.y) {\n            console.log(\"基準となる軸がずれています\");\n            return blocks;\n        }\n        const axisY = this.start.y;\n        if (this.start.x <= this.end.x) {\n            for (let i = this.start.x; i <= this.end.x; i++) {\n                blocks[i][axisY].base = config_1.MapType.floor;\n            }\n        }\n        else {\n            for (let i = this.end.x; i <= this.start.x; i++) {\n                blocks[i][axisY].base = config_1.MapType.floor;\n            }\n        }\n        return blocks;\n    }\n}\nexports.default = Dig;\n\n\n//# sourceURL=webpack:///./src/floor/Dig.ts?");

/***/ }),

/***/ "./src/floor/Floor.ts":
/*!****************************!*\
  !*** ./src/floor/Floor.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst Dig_1 = __importDefault(__webpack_require__(/*! ./Dig */ \"./src/floor/Dig.ts\"));\nconst RandomNum_1 = __webpack_require__(/*! ../module/RandomNum */ \"./src/module/RandomNum.ts\");\nclass Floor {\n    constructor(floorSize, rooms, gates, downstair) {\n        this.size = floorSize;\n        this.rooms = rooms;\n        this.gates = gates;\n        this.downstair = downstair;\n        this.blocks = [];\n    }\n    coordinateCanStand() {\n        const roomNum = RandomNum_1.Random.rangeInt(0, this.rooms.length - 1);\n        const room = this.rooms[roomNum];\n        const x = RandomNum_1.Random.rangeInt(room.start.x, room.end.x);\n        const y = RandomNum_1.Random.rangeInt(room.start.y, room.end.y);\n        const point = { x: x, y: y };\n        return point;\n    }\n    isInFloor(point) {\n        let result = false;\n        if (point.x > 0 &&\n            point.x < this.size.width - 2 &&\n            point.y > 0 &&\n            point.y < this.size.height - 2) {\n            result = true;\n        }\n        return result;\n    }\n    isCanStand(point) {\n        let isCanStand = false;\n        let x = point.x;\n        let y = point.y;\n        if (this.blocks[x][y].base === config_1.MapType.floor) {\n            isCanStand = true;\n        }\n        return isCanStand;\n    }\n    fillWall(blocks) {\n        for (let i = 0; i <= this.size.width; i++) {\n            blocks[i] = [];\n            for (let j = 0; j <= this.size.height; j++) {\n                blocks[i][j] = { base: config_1.MapType.wall };\n            }\n        }\n    }\n    digPaths(blocks) {\n        for (let i = 0; i < this.gates.length; i++) {\n            let gate = this.gates[i];\n            if (gate.direction === config_1.Direction.left ||\n                gate.direction === config_1.Direction.right) {\n                new Dig_1.default(gate.A, gate.B).sideToside(blocks);\n            }\n            else {\n                new Dig_1.default(gate.A, gate.B).topTobottom(blocks);\n            }\n        }\n    }\n}\nexports.Floor = Floor;\n\n\n//# sourceURL=webpack:///./src/floor/Floor.ts?");

/***/ }),

/***/ "./src/floor/Room.ts":
/*!***************************!*\
  !*** ./src/floor/Room.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nclass Room {\n    constructor(point, size, index) {\n        if (index) {\n            this.index = index;\n        }\n        this.size = size;\n        this.start = point;\n        this.end = this.calcEnd(point, size);\n        this.center = this.calcCenter(point, size);\n        this.hasPath = [];\n        this.toPath = [];\n    }\n    //終点を計算\n    calcEnd(point, size) {\n        const result = {\n            x: point.x + size.width - 1,\n            y: point.y + size.height - 1,\n        };\n        return result;\n    }\n    //中心点を計算\n    calcCenter(point, size) {\n        const result = {\n            x: Math.floor(point.x + size.width / 2),\n            y: Math.floor(point.y + size.height / 2),\n        };\n        return result;\n    }\n    //与えられた座標が部屋の中にあるか判断する\n    isInRoom(point) {\n        let isIn = false;\n        if (point.x <= this.end.x &&\n            point.x >= this.start.x &&\n            point.y <= this.end.y &&\n            point.y >= this.start.x) {\n            isIn = true;\n        }\n        return isIn;\n    }\n    isNoDuplicate(rooms) {\n        let result = false;\n        const area_x = {\n            start: this.start.x - config_1.RoomConf.distance_x,\n            end: this.end.x + config_1.RoomConf.distance_x,\n        };\n        const area_y = {\n            start: this.start.y - config_1.RoomConf.distance_y,\n            end: this.end.y + config_1.RoomConf.distance_y,\n        };\n        //まだ部屋が無い場合、確実に生成できるので処理終了\n        if (rooms.length === 0) {\n            result = true;\n            return result;\n        }\n        //各部屋のxとyを比較する\n        for (let i = 0; i < rooms.length; i++) {\n            let room = rooms[i];\n            if (area_x.start > room.end.x ||\n                area_x.end < room.start.x ||\n                area_y.start > room.end.y ||\n                area_y.end < room.start.y) {\n                result = true;\n            }\n            else {\n                result = false;\n                break;\n            }\n        }\n        return result;\n    }\n    //作成しようとしている部屋がフロアからはみだしていないか確認する\n    isInFloor(floorSize) {\n        let result = true;\n        //部屋がフロアからはみ出していないか確認\n        if (this.start.x < 1 ||\n            this.start.y < 1 ||\n            this.end.x > floorSize.width - 2 ||\n            this.end.y > floorSize.height - 2) {\n            result = false;\n        }\n        return result;\n    }\n}\nexports.default = Room;\n\n\n//# sourceURL=webpack:///./src/floor/Room.ts?");

/***/ }),

/***/ "./src/floor/floorModel/firstFloor.ts":
/*!********************************************!*\
  !*** ./src/floor/floorModel/firstFloor.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Room_1 = __importDefault(__webpack_require__(/*! ../Room */ \"./src/floor/Room.ts\"));\nconst Floor_1 = __webpack_require__(/*! ../Floor */ \"./src/floor/Floor.ts\");\nconst fillUpWall_1 = __importDefault(__webpack_require__(/*! ../usecase/fillUpWall */ \"./src/floor/usecase/fillUpWall.ts\"));\nconst digRooms_1 = __importDefault(__webpack_require__(/*! ../usecase/digRooms */ \"./src/floor/usecase/digRooms.ts\"));\nconst putDownstair_1 = __importDefault(__webpack_require__(/*! ../usecase/putDownstair */ \"./src/floor/usecase/putDownstair.ts\"));\n/* 一階の設計図 */\nconst point = { x: 1, y: 1 };\nconst size = { width: 23, height: 23 };\nconst rooms = [new Room_1.default(point, size, 1)];\nconst downstair = { x: 13, y: 7 };\nconst gates = [];\nconst floorSize = { width: 25, height: 25 };\nconst firstFloor = new Floor_1.Floor(floorSize, rooms, gates, downstair);\nexports.firstFloor = firstFloor;\nfirstFloor.blocks = fillUpWall_1.default(firstFloor, firstFloor.blocks);\nfirstFloor.blocks = digRooms_1.default(firstFloor, firstFloor.blocks);\nfirstFloor.blocks = putDownstair_1.default(firstFloor);\n\n\n//# sourceURL=webpack:///./src/floor/floorModel/firstFloor.ts?");

/***/ }),

/***/ "./src/floor/usecase/createDownstair.ts":
/*!**********************************************!*\
  !*** ./src/floor/usecase/createDownstair.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst RandomNum_1 = __webpack_require__(/*! ../../module/RandomNum */ \"./src/module/RandomNum.ts\");\nexports.default = (rooms) => {\n    const roomNum = RandomNum_1.Random.rangeInt(0, rooms.length - 1);\n    const room = rooms[roomNum];\n    const x = RandomNum_1.Random.rangeInt(room.start.x, room.end.x);\n    const y = RandomNum_1.Random.rangeInt(room.start.y, room.end.y);\n    const putPoint = { x: x, y: y };\n    return putPoint;\n};\n\n\n//# sourceURL=webpack:///./src/floor/usecase/createDownstair.ts?");

/***/ }),

/***/ "./src/floor/usecase/createGates.ts":
/*!******************************************!*\
  !*** ./src/floor/usecase/createGates.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../../config */ \"./src/config.ts\");\nconst RandomNum_1 = __webpack_require__(/*! ../../module/RandomNum */ \"./src/module/RandomNum.ts\");\nconst RoomSearch_1 = __webpack_require__(/*! ../../module/RoomSearch */ \"./src/module/RoomSearch.ts\");\nfunction createGates(rooms) {\n    const tmpRooms = rooms.slice();\n    let gates = [];\n    for (let i = 0; i < rooms.length || i < 100; i++) {\n        const room = rooms[i];\n        const nearRoom = findNearRoom(room, tmpRooms);\n        if (nearRoom) {\n            const gate = createGate(room, nearRoom);\n            gates.push(gate);\n            if (nearRoom.index)\n                room.toPath.push(nearRoom.index);\n            if (room.index)\n                nearRoom.hasPath.push(room.index);\n            RoomSearch_1.RoomSearch.remove(tmpRooms, room);\n            rooms = RoomSearch_1.RoomSearch.update(rooms, room);\n            rooms = RoomSearch_1.RoomSearch.update(rooms, nearRoom);\n        }\n        else {\n            let targetIndex = RandomNum_1.Random.rangeInt(0, rooms.length - 1);\n            let target = RoomSearch_1.RoomSearch.byIndex(rooms, targetIndex);\n            if (room && target) {\n                if (target.index)\n                    room.toPath.push(target.index);\n                if (room.index)\n                    target.hasPath.push(room.index);\n                RoomSearch_1.RoomSearch.remove(tmpRooms, room);\n                rooms = RoomSearch_1.RoomSearch.update(rooms, room);\n                rooms = RoomSearch_1.RoomSearch.update(rooms, target);\n            }\n        }\n    }\n    return { rooms: rooms, gates: gates };\n}\nexports.createGates = createGates;\nfunction findNearRoom(room, rooms) {\n    let roomDistances = [];\n    if (rooms.length <= 1) {\n        return undefined;\n    }\n    for (let i = 0; i < rooms.length; i++) {\n        const target = rooms[i];\n        const distance = Math.abs(room.center.x - target.center.x) +\n            Math.abs(room.center.y - target.center.y);\n        //距離ゼロは自室なので加えない\n        if (distance !== 0) {\n            const result = { index: i, distance: distance };\n            roomDistances.push(result);\n        }\n    }\n    //部屋の距離を比較して配列を並び替える\n    roomDistances = roomDistances.sort((a, b) => {\n        return a.distance > b.distance ? 1 : -1;\n    });\n    //一番近い部屋を返す\n    return rooms[roomDistances[0].index];\n}\nexports.findNearRoom = findNearRoom;\n//パスを作る起点となるドアを決定する\nfunction createGate(room, target) {\n    const direction = findDireciton(room, target);\n    let A;\n    let B;\n    //掘る方向が左右\n    if (direction === config_1.Direction.left) {\n        A = randomGate(room, config_1.Direction.left);\n        B = randomGate(target, config_1.Direction.right);\n        let gate = { A: A, B: B, direction: config_1.Direction.left };\n        return gate;\n    }\n    else if (direction === config_1.Direction.right) {\n        A = randomGate(room, config_1.Direction.right);\n        B = randomGate(target, config_1.Direction.left);\n        let gate = { A: A, B: B, direction: config_1.Direction.right };\n        return gate;\n    }\n    //掘る方向が上下\n    else if (direction === config_1.Direction.top) {\n        A = randomGate(room, config_1.Direction.top);\n        B = randomGate(target, config_1.Direction.bottom);\n        let gate = { A: A, B: B, direction: config_1.Direction.top };\n        return gate;\n    }\n    else {\n        A = randomGate(room, config_1.Direction.bottom);\n        B = randomGate(target, config_1.Direction.top);\n        let gate = { A: A, B: B, direction: config_1.Direction.bottom };\n        return gate;\n    }\n}\nexports.createGate = createGate;\n//指定した部屋との上下左右の距離の差を比較して最も小さいものを返す\nfunction findDireciton(room, target) {\n    if (target.center.x <= room.start.x && target.center.y <= room.end.y) {\n        return config_1.Direction.left;\n    }\n    else if (target.center.x <= room.end.x && target.center.y >= room.end.y) {\n        return config_1.Direction.bottom;\n    }\n    else if (target.center.x >= room.end.x && target.center.y >= room.start.y) {\n        return config_1.Direction.right;\n    }\n    else if (target.center.x >= room.start.x &&\n        target.center.y <= room.start.y) {\n        return config_1.Direction.top;\n    }\n    else {\n        return config_1.Direction.top;\n    }\n}\nexports.findDireciton = findDireciton;\n//通路の始点をランダムに決める\nfunction randomGate(room, direction) {\n    let gate = { x: 0, y: 0 };\n    //方角毎に通路の始点をランダムに決める\n    if (direction === config_1.Direction.left) {\n        gate = { x: room.start.x, y: RandomNum_1.Random.rangeInt(room.start.y, room.end.y) };\n    }\n    else if (direction === config_1.Direction.right) {\n        gate = { x: room.end.x, y: RandomNum_1.Random.rangeInt(room.start.y, room.end.y) };\n    }\n    else if (direction === config_1.Direction.top) {\n        gate = { x: RandomNum_1.Random.rangeInt(room.start.x, room.end.x), y: room.start.y };\n    }\n    else if (direction === config_1.Direction.bottom) {\n        gate = { x: RandomNum_1.Random.rangeInt(room.start.x, room.end.x), y: room.end.y };\n    }\n    return gate;\n}\nexports.randomGate = randomGate;\n\n\n//# sourceURL=webpack:///./src/floor/usecase/createGates.ts?");

/***/ }),

/***/ "./src/floor/usecase/createRooms.ts":
/*!******************************************!*\
  !*** ./src/floor/usecase/createRooms.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../../config */ \"./src/config.ts\");\nconst RandomNum_1 = __webpack_require__(/*! ../../module/RandomNum */ \"./src/module/RandomNum.ts\");\nconst Room_1 = __importDefault(__webpack_require__(/*! ../Room */ \"./src/floor/Room.ts\"));\n//条件にあった部屋を作り出して配列を返す\nexports.default = (lim, floorSize) => {\n    let rooms = [];\n    let successCount = 1;\n    for (let i = 0; i < lim; i++) {\n        const size = randomRoomSize();\n        const startPoint = randomRoomStartPoint(floorSize);\n        const newRoom = new Room_1.default(startPoint, size);\n        if (newRoom.isNoDuplicate(rooms) && newRoom.isInFloor(floorSize)) {\n            newRoom.index = successCount;\n            successCount++;\n            rooms.push(newRoom);\n        }\n    }\n    return rooms;\n};\n//ランダムに部屋のサイズを返す\nfunction randomRoomSize() {\n    const width = RandomNum_1.Random.rangeInt(config_1.RoomConf.minWidth, config_1.RoomConf.maxWidth);\n    const height = RandomNum_1.Random.rangeInt(config_1.RoomConf.minHeight, config_1.RoomConf.maxHeight);\n    const size = { width: width, height: height };\n    return size;\n}\nexports.randomRoomSize = randomRoomSize;\n//ランダムに部屋の左上の座標を返す\nfunction randomRoomStartPoint(floorSize) {\n    //ランダムで座標を生成\n    const x = RandomNum_1.Random.rangeInt(1, floorSize.width);\n    const y = RandomNum_1.Random.rangeInt(1, floorSize.height);\n    const point = { x: x, y: y };\n    return point;\n}\nexports.randomRoomStartPoint = randomRoomStartPoint;\n\n\n//# sourceURL=webpack:///./src/floor/usecase/createRooms.ts?");

/***/ }),

/***/ "./src/floor/usecase/digPaths.ts":
/*!***************************************!*\
  !*** ./src/floor/usecase/digPaths.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Dig_1 = __importDefault(__webpack_require__(/*! ../Dig */ \"./src/floor/Dig.ts\"));\nconst config_1 = __webpack_require__(/*! ../../config */ \"./src/config.ts\");\nexports.default = (floor, blocks) => {\n    for (let i = 0; i < floor.gates.length; i++) {\n        let gate = floor.gates[i];\n        if (gate.direction === config_1.Direction.left ||\n            gate.direction === config_1.Direction.right) {\n            blocks = new Dig_1.default(gate.A, gate.B).sideToside(blocks);\n        }\n        else {\n            blocks = new Dig_1.default(gate.A, gate.B).topTobottom(blocks);\n        }\n    }\n    return blocks;\n};\n\n\n//# sourceURL=webpack:///./src/floor/usecase/digPaths.ts?");

/***/ }),

/***/ "./src/floor/usecase/digRooms.ts":
/*!***************************************!*\
  !*** ./src/floor/usecase/digRooms.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Dig_1 = __importDefault(__webpack_require__(/*! ../Dig */ \"./src/floor/Dig.ts\"));\nexports.default = (floor, blocks) => {\n    for (let i = 0; i < floor.rooms.length; i++) {\n        let room = floor.rooms[i];\n        blocks = new Dig_1.default(room.start, room.end).square(blocks);\n    }\n    return blocks;\n};\n\n\n//# sourceURL=webpack:///./src/floor/usecase/digRooms.ts?");

/***/ }),

/***/ "./src/floor/usecase/fillUpWall.ts":
/*!*****************************************!*\
  !*** ./src/floor/usecase/fillUpWall.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../../config */ \"./src/config.ts\");\nexports.default = (floor, blocks) => {\n    for (let i = 0; i <= floor.size.width; i++) {\n        blocks[i] = [];\n        for (let j = 0; j <= floor.size.height; j++) {\n            blocks[i][j] = { base: config_1.MapType.wall };\n        }\n    }\n    return blocks;\n};\n\n\n//# sourceURL=webpack:///./src/floor/usecase/fillUpWall.ts?");

/***/ }),

/***/ "./src/floor/usecase/putDownstair.ts":
/*!*******************************************!*\
  !*** ./src/floor/usecase/putDownstair.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../../config */ \"./src/config.ts\");\nexports.default = (floor) => {\n    const point = floor.downstair;\n    const blocks = floor.blocks;\n    blocks[point.x][point.y].base = config_1.MapType.downstair;\n    return blocks;\n};\n\n\n//# sourceURL=webpack:///./src/floor/usecase/putDownstair.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst MoveEvent_1 = __importDefault(__webpack_require__(/*! ./event/MoveEvent */ \"./src/event/MoveEvent.ts\"));\nconst State_1 = __webpack_require__(/*! ./State */ \"./src/State.ts\");\nconst Draw_1 = __webpack_require__(/*! ./draw/Draw */ \"./src/draw/Draw.ts\");\nconst moveKey_1 = __importDefault(__webpack_require__(/*! ./key/moveKey */ \"./src/key/moveKey.ts\"));\nconst player_1 = __importDefault(__webpack_require__(/*! ./player/player */ \"./src/player/player.ts\"));\nconst messages_1 = __webpack_require__(/*! ./text/messages */ \"./src/text/messages.ts\");\nconst text_1 = __webpack_require__(/*! ./text/text */ \"./src/text/text.ts\");\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/config.ts\");\nconst Debug_1 = __importDefault(__webpack_require__(/*! ./debug/Debug */ \"./src/debug/Debug.ts\"));\nconst firstFloor_1 = __webpack_require__(/*! ./floor/floorModel/firstFloor */ \"./src/floor/floorModel/firstFloor.ts\");\nconst LayerDraw_1 = __webpack_require__(/*! ./draw/LayerDraw */ \"./src/draw/LayerDraw.ts\");\nconst actionKey_1 = __importDefault(__webpack_require__(/*! ./key/actionKey */ \"./src/key/actionKey.ts\"));\nconst menuKey_1 = __importDefault(__webpack_require__(/*! ./key/menuKey */ \"./src/key/menuKey.ts\"));\nconst item_1 = __webpack_require__(/*! ./config/item */ \"./src/config/item.ts\");\nconst onMenu_1 = __importDefault(__webpack_require__(/*! ./key/moveKey/onMenu */ \"./src/key/moveKey/onMenu.ts\"));\nconst Potion_1 = __webpack_require__(/*! ./item/Potion */ \"./src/item/Potion.ts\");\nconst onMenu_2 = __webpack_require__(/*! ./key/cancelKey/onMenu */ \"./src/key/cancelKey/onMenu.ts\");\n// 決定キーを押すとinitイベントが走る\nfunction init() {\n    //レイヤー処理を取り除く\n    LayerDraw_1.layerOut(LayerDraw_1.layer, State_1.S.env);\n    //フラグ関係の初期化\n    State_1.S.Frag.gameover = false;\n    //ステートの初期化\n    State_1.S.floors = [];\n    State_1.S.player = new player_1.default(12, 12);\n    State_1.S.enemys = [];\n    State_1.S.messages = new messages_1.MessageList();\n    //フロアの生成とメッセージの追加\n    State_1.S.floors[0] = firstFloor_1.firstFloor;\n    State_1.S.messages.add(new messages_1.Message(text_1.TEXT.init, config_1.MessageType.special));\n    //初期アイテムの追加\n    let initPotion = new Potion_1.Potion(item_1.ItemId.greenHerb);\n    State_1.S.bags.store(initPotion);\n}\nexports.init = init;\n//画面描画\nDraw_1.draw(Draw_1.con, State_1.S.env);\n//移動キー\nmoveKey_1.default();\n//アクションキー\nactionKey_1.default();\n//メニューキー\nmenuKey_1.default();\nonMenu_1.default();\n//キャンセルキー\nonMenu_2.cancelOnMenu();\n/* プレイヤー移動イベント */\nMoveEvent_1.default();\n//デバッグ\nDebug_1.default();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/item/Bag.ts":
/*!*************************!*\
  !*** ./src/item/Bag.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Bag {\n    constructor() {\n        this.storeCount = 0;\n        this.items = [];\n    }\n    store(item) {\n        let store = { index: this.storeCount, item: item };\n        this.items.push(store);\n        ++this.storeCount;\n    }\n    take(index) {\n        this.items = removeByIndex(this.items, index);\n        this.items = renumbering(this.items);\n        --this.storeCount;\n    }\n}\nexports.Bag = Bag;\nfunction renumbering(items) {\n    if (items.length === 0) {\n        return items;\n    }\n    for (let i = 0; i < items.length; i++) {\n        items[i].index = i;\n    }\n    return items;\n}\nexports.renumbering = renumbering;\nfunction searchByIndex(items, index) {\n    let result = items.filter((item) => {\n        return item.index === index;\n    });\n    return result[0];\n}\nexports.searchByIndex = searchByIndex;\nfunction removeByIndex(items, index) {\n    items.some((v, i) => {\n        if (v.index === index)\n            items.splice(i, 1);\n    });\n    return items;\n}\nexports.removeByIndex = removeByIndex;\n\n\n//# sourceURL=webpack:///./src/item/Bag.ts?");

/***/ }),

/***/ "./src/item/Potion.ts":
/*!****************************!*\
  !*** ./src/item/Potion.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst item_1 = __webpack_require__(/*! ../config/item */ \"./src/config/item.ts\");\nconst list = item_1.ItemList;\nclass Potion {\n    constructor(id) {\n        let item = findItemByIndex(id, list);\n        this.id = item.id;\n        this.name = item.name;\n        this.types = item.types;\n        this.ATK = item.ATK;\n        this.DEF = item.DEF;\n        this.HP = item.HP;\n    }\n}\nexports.Potion = Potion;\nfunction findItemByIndex(id, list) {\n    let result = list.filter((item) => {\n        return item.id === id;\n    });\n    return result[0];\n}\n\n\n//# sourceURL=webpack:///./src/item/Potion.ts?");

/***/ }),

/***/ "./src/item/Shield.ts":
/*!****************************!*\
  !*** ./src/item/Shield.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst item_1 = __webpack_require__(/*! ../config/item */ \"./src/config/item.ts\");\nconst list = item_1.ItemList;\nclass Shield {\n    constructor(id) {\n        let item = findItemByIndex(id, list);\n        this.id = item.id;\n        this.name = item.name;\n        this.types = item.types;\n        this.ATK = item.ATK;\n        this.DEF = item.DEF;\n        this.HP = item.HP;\n    }\n}\nexports.Shield = Shield;\nfunction findItemByIndex(id, list) {\n    let result = list.filter((item) => {\n        return item.id === id;\n    });\n    return result[0];\n}\n\n\n//# sourceURL=webpack:///./src/item/Shield.ts?");

/***/ }),

/***/ "./src/item/Weapon.ts":
/*!****************************!*\
  !*** ./src/item/Weapon.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst item_1 = __webpack_require__(/*! ../config/item */ \"./src/config/item.ts\");\nconst list = item_1.ItemList;\nclass Weapon {\n    constructor(id) {\n        let item = findItemByIndex(id, list);\n        this.id = item.id;\n        this.name = item.name;\n        this.types = item.types;\n        this.ATK = item.ATK;\n        this.DEF = item.DEF;\n        this.HP = item.HP;\n    }\n}\nexports.Weapon = Weapon;\nfunction findItemByIndex(id, list) {\n    let result = list.filter((item) => {\n        return item.id === id;\n    });\n    return result[0];\n}\n\n\n//# sourceURL=webpack:///./src/item/Weapon.ts?");

/***/ }),

/***/ "./src/item/popItem.ts":
/*!*****************************!*\
  !*** ./src/item/popItem.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst RandomNum_1 = __webpack_require__(/*! ../module/RandomNum */ \"./src/module/RandomNum.ts\");\nconst item_1 = __webpack_require__(/*! ../config/item */ \"./src/config/item.ts\");\nconst Weapon_1 = __webpack_require__(/*! ./Weapon */ \"./src/item/Weapon.ts\");\nconst Shield_1 = __webpack_require__(/*! ./Shield */ \"./src/item/Shield.ts\");\nconst Potion_1 = __webpack_require__(/*! ./Potion */ \"./src/item/Potion.ts\");\nexports.default = (floor) => {\n    let popItems = [];\n    let index = 0;\n    let list = item_1.ItemList;\n    for (let i = 0; i < floor.rooms.length; i++) {\n        let popCountLim = RandomNum_1.Random.rangeInt(item_1.ItemConf.popMin, item_1.ItemConf.popMax);\n        for (let j = 0; j < popCountLim - 1; j++) {\n            const popPoint = floor.coordinateCanStand();\n            const isNotDownstair = checkOverlappingDownstair(popPoint, floor.downstair);\n            if (isNotDownstair) {\n                let itemNum = RandomNum_1.Random.rangeInt(0, list.length);\n                let itemMaterial = list[itemNum];\n                let item;\n                if (itemMaterial.types === item_1.ItemType.weapon) {\n                    item = new Weapon_1.Weapon(itemMaterial.id);\n                }\n                else if (itemMaterial.types === item_1.ItemType.shield) {\n                    item = new Shield_1.Shield(itemMaterial.id);\n                }\n                else if (itemMaterial.types === item_1.ItemType.potion) {\n                    item = new Potion_1.Potion(itemMaterial.id);\n                }\n                else {\n                    item = undefined;\n                }\n                if (item) {\n                    let fallItem = { index: index, point: popPoint, item: item };\n                    ++index;\n                    popItems.push(fallItem);\n                }\n            }\n        }\n    }\n    return popItems;\n};\nfunction checkOverlappingDownstair(point, downstair) {\n    if (point.x === downstair.x && point.y === downstair.y) {\n        return false;\n    }\n    return true;\n}\n\n\n//# sourceURL=webpack:///./src/item/popItem.ts?");

/***/ }),

/***/ "./src/key/KeyCode.ts":
/*!****************************!*\
  !*** ./src/key/KeyCode.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar KeyCode;\n(function (KeyCode) {\n    KeyCode[KeyCode[\"left\"] = 37] = \"left\";\n    KeyCode[KeyCode[\"up\"] = 38] = \"up\";\n    KeyCode[KeyCode[\"right\"] = 39] = \"right\";\n    KeyCode[KeyCode[\"down\"] = 40] = \"down\";\n    KeyCode[KeyCode[\"action\"] = 90] = \"action\";\n    KeyCode[KeyCode[\"menu\"] = 88] = \"menu\";\n    KeyCode[KeyCode[\"cancel\"] = 67] = \"cancel\";\n    KeyCode[KeyCode[\"shift\"] = 16] = \"shift\";\n    KeyCode[KeyCode[\"space\"] = 32] = \"space\";\n})(KeyCode = exports.KeyCode || (exports.KeyCode = {}));\n\n\n//# sourceURL=webpack:///./src/key/KeyCode.ts?");

/***/ }),

/***/ "./src/key/actionKey.ts":
/*!******************************!*\
  !*** ./src/key/actionKey.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst KeyCode_1 = __webpack_require__(/*! ./KeyCode */ \"./src/key/KeyCode.ts\");\nconst index_1 = __webpack_require__(/*! ../index */ \"./src/index.ts\");\nconst Draw_1 = __webpack_require__(/*! ../draw/Draw */ \"./src/draw/Draw.ts\");\nconst LayerDraw_1 = __webpack_require__(/*! ../draw/LayerDraw */ \"./src/draw/LayerDraw.ts\");\nconst Bag = __importStar(__webpack_require__(/*! ../item/Bag */ \"./src/item/Bag.ts\"));\nconst item_1 = __webpack_require__(/*! ../config/item */ \"./src/config/item.ts\");\nconst text_1 = __webpack_require__(/*! ../text/text */ \"./src/text/text.ts\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nexports.default = () => {\n    /* アクションキー */\n    window.addEventListener(\"keydown\", (e) => {\n        if (e.keyCode === KeyCode_1.KeyCode.action) {\n            //タイトル画面での操作\n            if (!State_1.S.Frag.start) {\n                titleScene(State_1.S, Draw_1.con);\n                return;\n            }\n            //ゲームオーバー時の操作\n            if (State_1.S.Frag.gameover) {\n                gameoverScene(State_1.S, Draw_1.con, LayerDraw_1.layer);\n                return;\n            }\n            //メニュー画面時の操作\n            if (State_1.S.Frag.menu) {\n                menuScene(State_1.S, Draw_1.con);\n                return;\n            }\n        }\n    });\n};\nfunction gameoverScene(S, con, layer) {\n    S.Frag.start = false;\n    LayerDraw_1.layerOut(layer, S.env);\n    Draw_1.draw(con, S.env);\n    return;\n}\nexports.gameoverScene = gameoverScene;\nfunction titleScene(S, con) {\n    S.Frag.start = true;\n    index_1.init();\n    Draw_1.draw(con, S.env);\n    return;\n}\nexports.titleScene = titleScene;\nfunction menuScene(S, con) {\n    let items = S.bags.items;\n    let index = S.bagCursor;\n    let bag = Bag.searchByIndex(items, index);\n    let item = bag.item;\n    console.log(bag);\n    let equipMsg = { text: text_1.actionMsg.equip(item.name), type: config_1.MessageType.normal };\n    let removeEquipMsg = {\n        text: text_1.actionMsg.removeEquip(item.name),\n        type: config_1.MessageType.normal,\n    };\n    let usePotionMsg = {\n        text: text_1.actionMsg.usePotion(item.name, item.HP),\n        type: config_1.MessageType.normal,\n    };\n    //武器\n    if (item.types === item_1.ItemType.weapon) {\n        //何も装備していない場合\n        if (!S.player.weapon) {\n            S.player.equip(bag);\n            S.messages.add(equipMsg);\n            Draw_1.draw(con, S.env);\n            return;\n        }\n        //装備していて、かつその装備が選択したものだった場合\n        if (S.player.weapon === bag) {\n            S.player.removeEquip(bag);\n            S.messages.add(removeEquipMsg);\n            Draw_1.draw(con, S.env);\n            return;\n        }\n        //装備していて、選択した装備が別のものだった場合\n        S.player.removeEquip(S.player.weapon);\n        S.player.equip(bag);\n        S.messages.add(equipMsg);\n        Draw_1.draw(con, S.env);\n        return;\n    }\n    //盾\n    if (item.types === item_1.ItemType.shield) {\n        //何も装備していない場合\n        if (!S.player.shield) {\n            S.player.equip(bag);\n            S.messages.add(equipMsg);\n            Draw_1.draw(con, S.env);\n            return;\n        }\n        //装備していて、かつその装備が選択した物だった場合\n        if (S.player.shield === bag) {\n            S.player.removeEquip(bag);\n            S.messages.add(removeEquipMsg);\n            Draw_1.draw(con, S.env);\n            return;\n        }\n        S.player.removeEquip(S.player.shield);\n        S.player.equip(bag);\n        S.messages.add(equipMsg);\n        Draw_1.draw(con, S.env);\n        return;\n    }\n    //くすり\n    if (item.types === item_1.ItemType.potion) {\n        S.player.usePotion(bag);\n        S.bags.take(bag.index);\n        S.messages.add(usePotionMsg);\n        if (S.bagCursor === S.bags.items.length) {\n            --S.bagCursor;\n            if (S.bagCursor < 0) {\n                S.bagCursor = 0;\n            }\n        }\n        Draw_1.draw(con, S.env);\n        return;\n    }\n}\nexports.menuScene = menuScene;\n\n\n//# sourceURL=webpack:///./src/key/actionKey.ts?");

/***/ }),

/***/ "./src/key/cancelKey/onMenu.ts":
/*!*************************************!*\
  !*** ./src/key/cancelKey/onMenu.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../..//State */ \"./src/State.ts\");\nconst KeyCode_1 = __webpack_require__(/*! ../KeyCode */ \"./src/key/KeyCode.ts\");\nconst Bag = __importStar(__webpack_require__(/*! ../../item/Bag */ \"./src/item/Bag.ts\"));\nconst text_1 = __webpack_require__(/*! ../..//text/text */ \"./src/text/text.ts\");\nconst config_1 = __webpack_require__(/*! ../..//config */ \"./src/config.ts\");\nconst Draw_1 = __webpack_require__(/*! ../..//draw/Draw */ \"./src/draw/Draw.ts\");\nfunction cancelOnMenu() {\n    window.addEventListener(\"keydown\", (e) => {\n        if (!State_1.S.Frag.menu) {\n            return;\n        }\n        if (e.keyCode === KeyCode_1.KeyCode.cancel) {\n            throwItem(State_1.S, Draw_1.con);\n        }\n    });\n}\nexports.cancelOnMenu = cancelOnMenu;\nfunction throwItem(S, con) {\n    if (S.bags.items.length === 0) {\n        return;\n    }\n    let index = S.bagCursor;\n    let items = S.bags.items;\n    let item = Bag.searchByIndex(items, index);\n    let throwMsg = {\n        text: text_1.actionMsg.throwItem(item.item.name),\n        type: config_1.MessageType.normal,\n    };\n    S.messages.add(throwMsg);\n    S.bags.take(index);\n    if (S.bagCursor === S.bags.items.length) {\n        --S.bagCursor;\n        if (S.bagCursor < 0) {\n            S.bagCursor = 0;\n        }\n    }\n    Draw_1.draw(con, S.env);\n}\nexports.throwItem = throwItem;\n\n\n//# sourceURL=webpack:///./src/key/cancelKey/onMenu.ts?");

/***/ }),

/***/ "./src/key/menuKey.ts":
/*!****************************!*\
  !*** ./src/key/menuKey.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst Draw_1 = __webpack_require__(/*! ../draw/Draw */ \"./src/draw/Draw.ts\");\nconst KeyCode_1 = __webpack_require__(/*! ./KeyCode */ \"./src/key/KeyCode.ts\");\nexports.default = () => {\n    window.addEventListener(\"keydown\", (e) => {\n        if (State_1.S.Frag.gameover || !State_1.S.Frag.start) {\n            return;\n        }\n        if (e.keyCode === KeyCode_1.KeyCode.menu) {\n            //メニューを閉じる\n            if (State_1.S.Frag.menu) {\n                menuClose(State_1.S, Draw_1.con);\n                console.log(State_1.S.Frag.menu);\n                return;\n            }\n            //メニューを開く\n            if (!State_1.S.Frag.menu) {\n                menuOpen(State_1.S, Draw_1.con);\n                console.log(State_1.S.Frag.menu);\n                return;\n            }\n        }\n    });\n};\nfunction menuOpen(S, con) {\n    S.Frag.menu = true;\n    Draw_1.draw(con, S.env);\n    return;\n}\nexports.menuOpen = menuOpen;\nfunction menuClose(S, con) {\n    S.Frag.menu = false;\n    Draw_1.draw(con, S.env);\n    return;\n}\nexports.menuClose = menuClose;\n\n\n//# sourceURL=webpack:///./src/key/menuKey.ts?");

/***/ }),

/***/ "./src/key/moveKey.ts":
/*!****************************!*\
  !*** ./src/key/moveKey.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst KeyCode_1 = __webpack_require__(/*! ./KeyCode */ \"./src/key/KeyCode.ts\");\nconst State_1 = __webpack_require__(/*! ../State */ \"./src/State.ts\");\nconst Draw_1 = __webpack_require__(/*! ../draw/Draw */ \"./src/draw/Draw.ts\");\nexports.default = () => {\n    // 移動キーが押されているか\n    window.addEventListener(\"keydown\", (e) => {\n        //gameoverフラグがあればリターン\n        if (e.keyCode === KeyCode_1.KeyCode.left) {\n            State_1.S.KeyPress.left = true;\n        }\n        else if (e.keyCode === KeyCode_1.KeyCode.up) {\n            State_1.S.KeyPress.up = true;\n        }\n        else if (e.keyCode === KeyCode_1.KeyCode.right) {\n            State_1.S.KeyPress.right = true;\n        }\n        else if (e.keyCode === KeyCode_1.KeyCode.down) {\n            State_1.S.KeyPress.down = true;\n        }\n        else {\n            State_1.S.KeyPress.left = false;\n            State_1.S.KeyPress.up = false;\n            State_1.S.KeyPress.right = false;\n            State_1.S.KeyPress.down = false;\n        }\n    });\n    // 移動キーが離されたかどうか\n    window.addEventListener(\"keyup\", (e) => {\n        if (e.keyCode === KeyCode_1.KeyCode.left) {\n            State_1.S.KeyPress.left = false;\n        }\n        else if (e.keyCode === KeyCode_1.KeyCode.up) {\n            State_1.S.KeyPress.up = false;\n        }\n        else if (e.keyCode === KeyCode_1.KeyCode.right) {\n            State_1.S.KeyPress.right = false;\n        }\n        else if (e.keyCode === KeyCode_1.KeyCode.down) {\n            State_1.S.KeyPress.down = false;\n        }\n    });\n    // shiftキー\n    window.addEventListener(\"keydown\", (e) => {\n        if (e.keyCode === KeyCode_1.KeyCode.shift) {\n            if (!State_1.S.env.diagonal) {\n                State_1.S.env.diagonal = true;\n                Draw_1.draw(Draw_1.con, State_1.S.env);\n            }\n            return;\n        }\n    });\n    // シフトを押しているかどうか\n    window.addEventListener(\"keyup\", (e) => {\n        if (e.keyCode === KeyCode_1.KeyCode.shift) {\n            if (State_1.S.env.diagonal) {\n                State_1.S.env.diagonal = false;\n                Draw_1.draw(Draw_1.con, State_1.S.env);\n            }\n        }\n    });\n    // ブラウザ以外を見ているとき\n    window.addEventListener(\"blur\", (e) => {\n        if (State_1.S.env.diagonal) {\n            State_1.S.env.diagonal = false;\n            Draw_1.draw(Draw_1.con, State_1.S.env);\n        }\n    });\n};\n\n\n//# sourceURL=webpack:///./src/key/moveKey.ts?");

/***/ }),

/***/ "./src/key/moveKey/onMenu.ts":
/*!***********************************!*\
  !*** ./src/key/moveKey/onMenu.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst KeyCode_1 = __webpack_require__(/*! ../KeyCode */ \"./src/key/KeyCode.ts\");\nconst State_1 = __webpack_require__(/*! ../../State */ \"./src/State.ts\");\nconst Draw_1 = __webpack_require__(/*! ../../draw/Draw */ \"./src/draw/Draw.ts\");\nexports.default = () => {\n    window.addEventListener(\"keydown\", (e) => {\n        if (!State_1.S.Frag.menu) {\n            return;\n        }\n        if (e.keyCode === KeyCode_1.KeyCode.up) {\n            upOnMenu(Draw_1.con, State_1.S);\n            return;\n        }\n        if (e.keyCode === KeyCode_1.KeyCode.down) {\n            downOnMenu(Draw_1.con, State_1.S);\n            return;\n        }\n    });\n};\nfunction upOnMenu(con, S) {\n    if (S.bagCursor === 0) {\n        return;\n    }\n    --S.bagCursor;\n    Draw_1.draw(con, S.env);\n    return;\n}\nfunction downOnMenu(con, S) {\n    if (S.bags.items.length === 0) {\n        return;\n    }\n    if (S.bagCursor === S.bags.items.length - 1) {\n        return;\n    }\n    ++S.bagCursor;\n    Draw_1.draw(con, S.env);\n    return;\n}\n\n\n//# sourceURL=webpack:///./src/key/moveKey/onMenu.ts?");

/***/ }),

/***/ "./src/module/RandomNum.ts":
/*!*********************************!*\
  !*** ./src/module/RandomNum.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Random;\n(function (Random) {\n    //範囲内の整数をランダムに返す\n    function rangeInt(min, max) {\n        const result = Math.floor(Math.random() * (max - min) + min);\n        return result;\n    }\n    Random.rangeInt = rangeInt;\n})(Random = exports.Random || (exports.Random = {}));\n\n\n//# sourceURL=webpack:///./src/module/RandomNum.ts?");

/***/ }),

/***/ "./src/module/RoomSearch.ts":
/*!**********************************!*\
  !*** ./src/module/RoomSearch.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar RoomSearch;\n(function (RoomSearch) {\n    //該当する部屋があれば配列から削除する\n    function remove(rooms, room) {\n        rooms.some((v, i) => {\n            if (v.index === room.index)\n                rooms.splice(i, 1);\n        });\n    }\n    RoomSearch.remove = remove;\n    function update(rooms, room) {\n        rooms.some((v, i) => {\n            if (v.index === room.index)\n                rooms[i] = room;\n        });\n        return rooms;\n    }\n    RoomSearch.update = update;\n    // 次の部屋を検索する\n    function connectTo(rooms, now) {\n        let nextIndex = now.toPath[now.toPath.length - 1];\n        let result = byIndex(rooms, nextIndex);\n        return result;\n    }\n    RoomSearch.connectTo = connectTo;\n    //次の部屋をインデックスで検索する\n    function byIndex(rooms, index) {\n        let result = rooms.filter((room) => {\n            return room.index === index;\n        });\n        return result[0];\n    }\n    RoomSearch.byIndex = byIndex;\n    //配列の中に部屋が存在すればtrueを返す\n    function isExist(rooms, room) {\n        let isExist;\n        isExist = rooms.some((v, i) => {\n            if (v.index === room.index)\n                return true;\n            else\n                return false;\n        });\n        return isExist;\n    }\n    RoomSearch.isExist = isExist;\n})(RoomSearch = exports.RoomSearch || (exports.RoomSearch = {}));\n\n\n//# sourceURL=webpack:///./src/module/RoomSearch.ts?");

/***/ }),

/***/ "./src/player/player.ts":
/*!******************************!*\
  !*** ./src/player/player.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nconst item_1 = __webpack_require__(/*! ../config/item */ \"./src/config/item.ts\");\nclass Player {\n    constructor(x, y) {\n        this.depth = 0;\n        this.point = { x: x, y: y };\n        this.x = x;\n        this.y = y;\n        this.level = 1;\n        this.baseHP = 16;\n        this.equipHP = 0;\n        this.baseATK = 4;\n        this.equipATK = 0;\n        this.baseDEF = 4;\n        this.equipDEF = 0;\n        this.EXP = 0;\n        this.requireEXP = 4;\n        this.HP = this.totalHP;\n        this.ATK = this.totalATK;\n        this.DEF = this.totalDEF;\n    }\n    get totalHP() {\n        return this.baseHP + this.equipHP;\n    }\n    get totalATK() {\n        return this.baseATK + this.equipATK;\n    }\n    get totalDEF() {\n        return this.baseDEF + this.equipDEF;\n    }\n    usePotion(bag) {\n        let item = bag.item;\n        let recoverHP = this.HP + item.HP;\n        this.equipATK = this.equipATK + item.ATK;\n        this.equipDEF = this.equipDEF + item.DEF;\n        if (recoverHP >= this.totalHP) {\n            recoverHP = this.totalHP;\n        }\n        this.HP = recoverHP;\n    }\n    equip(bag) {\n        let item = bag.item;\n        this.equipATK = this.equipATK + item.ATK;\n        this.equipDEF = this.equipDEF + item.DEF;\n        this.equipHP = this.equipHP + item.HP;\n        if (item.types === item_1.ItemType.weapon) {\n            this.weapon = bag;\n            return;\n        }\n        if (item.types === item_1.ItemType.shield) {\n            this.shield = bag;\n            return;\n        }\n    }\n    removeEquip(bag) {\n        let item = bag.item;\n        this.equipATK = this.equipATK - item.ATK;\n        this.equipDEF = this.equipDEF - item.DEF;\n        this.equipHP = this.equipHP - item.HP;\n        if (item.types === item_1.ItemType.weapon) {\n            this.weapon = undefined;\n            return;\n        }\n        if (item.types === item_1.ItemType.shield) {\n            this.shield = undefined;\n            return;\n        }\n    }\n    moveLeft() {\n        if (this.x === 0) {\n            return this;\n        }\n        this.x = --this.x;\n        return this;\n    }\n    moveUp() {\n        if (this.y === 0) {\n            return this;\n        }\n        this.y = --this.y;\n        return this;\n    }\n    moveRight(floor) {\n        if (this.x === floor.size.width - 1) {\n            return this;\n        }\n        this.x = ++this.x;\n        return this;\n    }\n    moveDown(floor) {\n        if (this.y === floor.size.height - 1) {\n            return this;\n        }\n        this.y = ++this.y;\n        return this;\n    }\n    moveUpperLeft(floor) {\n        if (this.x === 0 || this.y === 0) {\n            return this;\n        }\n        this.x = --this.x;\n        this.y = --this.y;\n        return this;\n    }\n    moveUpperRight(floor) {\n        if (this.x === floor.size.width - 1 || this.y === 0) {\n            return this;\n        }\n        this.x = ++this.x;\n        this.y = --this.y;\n        return this;\n    }\n    moveDownnerLeft(floor) {\n        if (this.x === floor.size.width - 1 || this.y === floor.size.height - 1) {\n            return this;\n        }\n        this.x = --this.x;\n        this.y = ++this.y;\n        return this;\n    }\n    moveDownnerRight(floor) {\n        if (this.x === floor.size.width - 1 || this.y === floor.size.height - 1) {\n            return this;\n        }\n        this.x = ++this.x;\n        this.y = ++this.y;\n        return this;\n    }\n    stairDown(floor) {\n        // let floor = S.floors[this.depth];\n        const block = floor.blocks[this.x][this.y];\n        if (block.base === config_1.MapType.downstair) {\n            ++this.depth;\n        }\n    }\n}\nexports.default = Player;\n\n\n//# sourceURL=webpack:///./src/player/player.ts?");

/***/ }),

/***/ "./src/text/messages.ts":
/*!******************************!*\
  !*** ./src/text/messages.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config.ts\");\nclass MessageList {\n    constructor() {\n        this.list = [];\n    }\n    add(message) {\n        this.list.push(message);\n        while (this.list.length > config_1.MessageLength.limit) {\n            this.list.shift();\n        }\n    }\n}\nexports.MessageList = MessageList;\nclass Message {\n    constructor(text, type) {\n        this.text = text;\n        this.type = type;\n    }\n}\nexports.Message = Message;\n\n\n//# sourceURL=webpack:///./src/text/messages.ts?");

/***/ }),

/***/ "./src/text/text.ts":
/*!**************************!*\
  !*** ./src/text/text.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TEXT;\n(function (TEXT) {\n    TEXT[\"title\"] = \"Logue Like\";\n    TEXT[\"start\"] = \"Z\\u30AD\\u30FC\\u3067\\u59CB\\u3081\\u308B\";\n    TEXT[\"downstair\"] = \"\\u968E\\u6BB5\\u3092\\u964D\\u308A\\u307E\\u3057\\u305F\";\n    TEXT[\"wall\"] = \"\\u58C1\\u306B\\u3076\\u3064\\u304B\\u3063\\u305F\\uFF01\";\n    TEXT[\"init\"] = \"\\u30C0\\u30F3\\u30B8\\u30E7\\u30F3\\u6700\\u9AD8\\u301C\\u301C\\u301C!!\";\n    TEXT[\"depth\"] = \"\\u968E\";\n    TEXT[\"level\"] = \"LV\";\n    TEXT[\"hp\"] = \"HP\";\n    TEXT[\"ATK\"] = \"\\u653B\\u6483\\u529B\";\n    TEXT[\"DEF\"] = \"\\u9632\\u5FA1\\u529B\";\n    TEXT[\"EXP\"] = \"\\u7D4C\\u9A13\\u5024\";\n    TEXT[\"die\"] = \"\\u3042\\u306A\\u305F\\u306F\\u529B\\u5C3D\\u304D\\u305F\";\n    TEXT[\"bagFull\"] = \"\\u9053\\u5177\\u304C\\u3044\\u3063\\u3071\\u3044\\u3060\";\n})(TEXT = exports.TEXT || (exports.TEXT = {}));\nvar actionMsg;\n(function (actionMsg) {\n    actionMsg.attack = (name, damage) => {\n        return `${name}に${damage}のダメージを与えた`;\n    };\n    actionMsg.kill = (name, exp) => {\n        return `${name}を倒した。${exp}の経験値を得た`;\n    };\n    actionMsg.levelUp = (level) => {\n        return `レベルが${level}にあがった`;\n    };\n    actionMsg.beAttacked = (name, damage) => {\n        return `${name}から${damage}のダメージを受けた`;\n    };\n    actionMsg.usePotion = (name, amount) => {\n        return `${name}を使った。${amount}HP回復した。`;\n    };\n    actionMsg.equip = (name) => {\n        return `${name}を装備した`;\n    };\n    actionMsg.removeEquip = (name) => {\n        return `${name}を外した`;\n    };\n    actionMsg.pickFallItem = (name) => {\n        return `${name}を拾った`;\n    };\n    actionMsg.throwItem = (name) => {\n        return `${name}を捨てた`;\n    };\n})(actionMsg = exports.actionMsg || (exports.actionMsg = {}));\n\n\n//# sourceURL=webpack:///./src/text/text.ts?");

/***/ })

/******/ });