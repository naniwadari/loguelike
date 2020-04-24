"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Key = /** @class */ (function () {
    function Key() {
        this.leftKeyCode = 65;
        this.rightKeyCode = 68;
        this.upKeyCode = 87;
        this.downKeyCode = 83;
        this.actionKeyCode = 90;
        this.keyLisDown = false;
        this.keyUisDown = false;
        this.keyRisDown = false;
        this.keyDisDown = false;
    }
    Key.prototype.watchArrowKeysDown = function () {
        var _this = this;
        window.addEventListener("keydown", function (e) {
            if (e.keyCode === _this.leftKeyCode) {
                _this.keyLisDown = true;
            }
            else if (e.keyCode === _this.upKeyCode) {
                _this.keyUisDown = true;
            }
            else if (e.keyCode === _this.rightKeyCode) {
                _this.keyRisDown = true;
            }
            else if (e.keyCode === _this.downKeyCode) {
                _this.keyDisDown = true;
            }
            else {
                _this.keyLisDown = false;
                _this.keyUisDown = false;
                _this.keyRisDown = false;
                _this.keyDisDown = false;
            }
        });
    };
    Key.prototype.watchArrowKeysUp = function () {
        var _this = this;
        window.addEventListener("keyup", function (e) {
            if (e.keyCode === _this.leftKeyCode) {
                _this.keyLisDown = false;
            }
            else if (e.keyCode === _this.upKeyCode) {
                _this.keyUisDown = false;
            }
            else if (e.keyCode === _this.rightKeyCode) {
                _this.keyRisDown = false;
            }
            else if (e.keyCode === _this.downKeyCode) {
                _this.keyDisDown = false;
            }
        });
    };
    return Key;
}());
exports.default = Key;
