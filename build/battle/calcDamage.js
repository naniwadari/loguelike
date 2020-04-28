"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (atk, def) => {
    let damage = Math.ceil((atk * 1.1 - def * 0.4) * Math.random());
    if (damage <= 0) {
        damage = 1;
    }
    return damage;
};
