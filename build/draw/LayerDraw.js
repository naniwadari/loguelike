"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var drawEyecatch_1 = __importDefault(require("./drawEyecatch"));
var State_1 = require("../State");
exports.canvas = document.getElementById("layer");
exports.layer = exports.canvas.getContext("2d");
function layerDraw(layer, env) {
    if (State_1.S.Frag.eyecatch) {
        a().then(layerDraw(layer, 0));
        State_1.S.Frag.eyecatch = false;
        return;
    }
}
exports.layerDraw = layerDraw;
function a() {
    return new Promise(function (resolve) {
        var start = Date.now();
        var timer = setInterval(function () {
            var timePassed = Date.now() - start;
            if (timePassed >= 2000) {
                clearInterval(timer);
                return;
            }
            var alpha = timePassed / 2000;
            drawEyecatch_1.default(exports.layer, alpha);
        }, 20);
        resolve();
    });
}
function fadeIn(layer) {
    var start = Date.now();
    var timer = setInterval(function () {
        var timePassed = Date.now() - start;
        if (timePassed >= 2000) {
            clearInterval(timer);
            return;
        }
        var alpha = timePassed / 2000;
        drawEyecatch_1.default(layer, alpha);
    }, 20);
}
//# sourceMappingURL=LayerDraw.js.map