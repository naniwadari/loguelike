"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (atk, def) {
    var damage = Math.ceil((atk * 1.1 - def * 0.4) * Math.random());
    if (damage <= 0) {
        damage = 1;
    }
    return damage;
});
//# sourceMappingURL=calcDamage.js.map