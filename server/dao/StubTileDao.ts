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
        6,
        "Blue",
        [TileIcon.Metallurgy, TileIcon.Mech],
        "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"
    ),
    new TileModel(
        5,
        "Red",
        [TileIcon.Medicine],
        "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"
    ),
    new TileModel(
        4,
        "Red",
        [TileIcon.Repair],
        "ПОКРЫТИЕ РЕЖУЩЕГО ИНСТРУМЕНТА"
    ),
    new TileModel(
        6,
        "Blue",
        [TileIcon.Metallurgy, TileIcon.Mech],
        "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"
    ),
    new TileModel(
        5,
        "Red",
        [TileIcon.Medicine],
        "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"
    ),
    new TileModel(
        2,
        "Blue",
        [TileIcon.Food],
        "ОБОРУДОВАНИЕ ДЛЯ ПИЩЕВОЙ ПРОМЫШЛЕННОСТИ"
    ),
    new TileModel(
        3,
        "Red",
        [TileIcon.Oil, TileIcon.Metallurgy, TileIcon.Repair],
        "НЕСТАНДАРТНОЕ ОБОРУДОВАНИЕ, СПЕЦИНСТРУМЕНТ И ОСНАСТКА",
        "small"
    ),
    new TileModel(
        1,
        "Green",
        [TileIcon.Metallurgy, TileIcon.Oil],
        "ИНТЕЛЛЕКТУАЛЬНАЯ СТАЛЬ С ЭФФЕКТОМ ПАМЯТИ"
    ),
    new TileModel(
        2,
        "Blue",
        [TileIcon.Food],
        "ОБОРУДОВАНИЕ ДЛЯ ПИЩЕВОЙ ПРОМЫШЛЕННОСТИ"
    ),
    new TileModel(
        3,
        "Red",
        [TileIcon.Oil, TileIcon.Metallurgy, TileIcon.Repair],
        "НЕСТАНДАРТНОЕ ОБОРУДОВАНИЕ, СПЕЦИНСТРУМЕНТ И ОСНАСТКА",
        "small"
    ),
    new TileModel(
        6,
        "Green",
        [TileIcon.Oil, TileIcon.Mech],
        "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"
    ),
    new TileModel(
        5,
        "Red",
        [TileIcon.Medicine],
        "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"
    ),
    new TileModel(
        4,
        "Green",
        [TileIcon.Repair],
        "ПОКРЫТИЕ РЕЖУЩЕГО ИНСТРУМЕНТА"
    ),
    new TileModel(
        6,
        "Green",
        [TileIcon.Oil, TileIcon.Mech],
        "ЛИГАТУРЫ ДЛЯ АЛЮМИНИЕВЫХ СПЛАВОВ"
    ),
    new TileModel(
        5,
        "Red",
        [TileIcon.Medicine],
        "ОСТЕОСИНТЕЗ ШЕЙКИ БЕДРА"
    )    
]