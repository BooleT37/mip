"use strict";
exports.__esModule = true;
var TileModel_1 = require("../models/TileModel");
var Enums_1 = require("../models/Enums");
var StubTileDao = (function () {
    function StubTileDao() {
    }
    StubTileDao.prototype.getAll = function () {
        return STUB_TILES;
    };
    return StubTileDao;
}());
exports["default"] = StubTileDao;
var STUB_TILES = [
    new TileModel_1["default"](6, "Blue", [Enums_1.TileIcon.Metallurgy, Enums_1.TileIcon.Mech], "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"),
    new TileModel_1["default"](5, "Red", [Enums_1.TileIcon.Medicine], "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"),
    new TileModel_1["default"](4, "Red", [Enums_1.TileIcon.Repair], "ПОКРЫТИЕ РЕЖУЩЕГО ИНСТРУМЕНТА"),
    new TileModel_1["default"](6, "Blue", [Enums_1.TileIcon.Metallurgy, Enums_1.TileIcon.Mech], "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"),
    new TileModel_1["default"](5, "Red", [Enums_1.TileIcon.Medicine], "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"),
    new TileModel_1["default"](2, "Blue", [Enums_1.TileIcon.Food], "ОБОРУДОВАНИЕ ДЛЯ ПИЩЕВОЙ ПРОМЫШЛЕННОСТИ"),
    new TileModel_1["default"](3, "Red", [Enums_1.TileIcon.Oil, Enums_1.TileIcon.Metallurgy, Enums_1.TileIcon.Repair], "НЕСТАНДАРТНОЕ ОБОРУДОВАНИЕ, СПЕЦИНСТРУМЕНТ И ОСНАСТКА", "small"),
    new TileModel_1["default"](1, "Green", [Enums_1.TileIcon.Metallurgy, Enums_1.TileIcon.Oil], "ИНТЕЛЛЕКТУАЛЬНАЯ СТАЛЬ С ЭФФЕКТОМ ПАМЯТИ"),
    new TileModel_1["default"](2, "Blue", [Enums_1.TileIcon.Food], "ОБОРУДОВАНИЕ ДЛЯ ПИЩЕВОЙ ПРОМЫШЛЕННОСТИ"),
    new TileModel_1["default"](3, "Red", [Enums_1.TileIcon.Oil, Enums_1.TileIcon.Metallurgy, Enums_1.TileIcon.Repair], "НЕСТАНДАРТНОЕ ОБОРУДОВАНИЕ, СПЕЦИНСТРУМЕНТ И ОСНАСТКА", "small"),
    new TileModel_1["default"](6, "Green", [Enums_1.TileIcon.Oil, Enums_1.TileIcon.Mech], "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"),
    new TileModel_1["default"](5, "Red", [Enums_1.TileIcon.Medicine], "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"),
    new TileModel_1["default"](4, "Green", [Enums_1.TileIcon.Repair], "ПОКРЫТИЕ РЕЖУЩЕГО ИНСТРУМЕНТА"),
    new TileModel_1["default"](6, "Green", [Enums_1.TileIcon.Oil, Enums_1.TileIcon.Mech], "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"),
    new TileModel_1["default"](5, "Red", [Enums_1.TileIcon.Medicine], "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА")
];
