import ITileDao from "./ITileDao";
import TileModel from "../models/TileModel";
import { TileIcon } from "../models/Enums";

export default class StubTileDao implements ITileDao {
    getAll(): TileModel[] {
        return STUB_TILES;
    }
}

const STUB_TILES: TileModel[] = [
    new TileModel(
        "6.png",
        "Blue",
        [TileIcon.Metallurgy, TileIcon.Mech],
        "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"
    ),
    new TileModel(
        "5.png",
        "Red",
        [TileIcon.Medicine],
        "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"
    ),
    new TileModel(
        "4.png",
        "Red",
        [TileIcon.Repair],
        "ПОКРЫТИЕ РЕЖУЩЕГО ИНСТРУМЕНТА"
    ),
    new TileModel(
        "6.png",
        "Blue",
        [TileIcon.Metallurgy, TileIcon.Mech],
        "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"
    ),
    new TileModel(
        "5.png",
        "Red",
        [TileIcon.Medicine],
        "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"
    ),
    new TileModel(
        "2.png",
        "Blue",
        [TileIcon.Food],
        "ОБОРУДОВАНИЕ ДЛЯ ПИЩЕВОЙ ПРОМЫШЛЕННОСТИ"
    ),
    new TileModel(
        "3.png",
        "Red",
        [TileIcon.Oil, TileIcon.Metallurgy, TileIcon.Repair],
        "НЕСТАНДАРТНОЕ ОБОРУДОВАНИЕ, СПЕЦИНСТРУМЕНТ И ОСНАСТКА",
        "small"
    ),
    new TileModel(
        "1.png",
        "Green",
        [TileIcon.Metallurgy, TileIcon.Oil],
        "ИНТЕЛЛЕКТУАЛЬНАЯ СТАЛЬ С ЭФФЕКТОМ ПАМЯТИ"
    ),
    new TileModel(
        "2.png",
        "Blue",
        [TileIcon.Food],
        "ОБОРУДОВАНИЕ ДЛЯ ПИЩЕВОЙ ПРОМЫШЛЕННОСТИ"
    ),
    new TileModel(
        "3.png",
        "Red",
        [TileIcon.Oil, TileIcon.Metallurgy, TileIcon.Repair],
        "НЕСТАНДАРТНОЕ ОБОРУДОВАНИЕ, СПЕЦИНСТРУМЕНТ И ОСНАСТКА",
        "small"
    ),
    new TileModel(
        "6.png",
        "Green",
        [TileIcon.Oil, TileIcon.Mech],
        "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"
    ),
    new TileModel(
        "5.png",
        "Red",
        [TileIcon.Medicine],
        "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"
    ),
    new TileModel(
        "4.png",
        "Green",
        [TileIcon.Repair],
        "ПОКРЫТИЕ РЕЖУЩЕГО ИНСТРУМЕНТА"
    ),
    new TileModel(
        "6.png",
        "Green",
        [TileIcon.Oil, TileIcon.Mech],
        "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"
    ),
    new TileModel(
        "5.png",
        "Red",
        [TileIcon.Medicine],
        "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"
    )    
]