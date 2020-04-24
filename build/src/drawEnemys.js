"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("./State");
var config_1 = require("./config");
var Enemy_1 = require("./Enemy");
exports.default = (function (con, drawStartPoint) {
    con.textBaseline = "middle";
    con.textAlign = "center";
    var enemys = State_1.S.fields[State_1.S.player.depth].enemys;
    for (var i = 0; i < enemys.length; i++) {
        if (enemys[i].point.x >= drawStartPoint.x &&
            enemys[i].point.x < drawStartPoint.x + config_1.DrawRange.x &&
            enemys[i].point.y >= drawStartPoint.y &&
            drawStartPoint.y + config_1.DrawRange.y) {
            drawEnemy(con, enemys[i], drawStartPoint);
        }
    }
});
function drawEnemy(con, enemy, drawStartPoint) {
    if (enemy.id === Enemy_1.EnemyId.slime) {
        con.fillStyel = "blue";
        con.font = "16px consolas";
        con.fillText("●", (enemy.point.x - drawStartPoint.x) * config_1.TyleSize.x + config_1.TyleSize.x / 2, (enemy.point.y - drawStartPoint.y) * config_1.TyleSize.y + config_1.TyleSize.y / 2);
    }
}
