"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jssha_1 = __importDefault(require("jssha"));
function hash(seed) {
    var sha256 = new jssha_1.default("SHA-256", "TEXT");
    sha256.update(seed);
    return sha256.getHash("HEX");
}
console.log(hash("test"));
