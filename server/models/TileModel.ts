import { TileIcon } from "./Enums";

export type BackgroundColor = "Blue" | "Red" | "Green";

interface Icon {
    name: string;
    caption: string;
}

interface IconCaptions {
    [key: string]: string;
}

type FontSize = "big" | "medium" | "small"

export default class TileModel {
    id: string;
    backgroundFilename: string;
    backgroundColor: BackgroundColor;
    icons: Icon[];
    caption: string;
    fontSize?: FontSize;

    private readonly ICON_CAPTIONS: IconCaptions = {
        metallurgy: "Металлургия",
        mech: "Машиностроение",
        food: "Пищевое производство",
        oil: "Нефтедобыча",
        medicine: "Медицина",
        repair: "Ремонт"
    }

    constructor(
        id: string,
        backgroundFilename: string,
        backgroundColor: BackgroundColor,
        icons: TileIcon[],
        caption: string,
        fontSize: string = "big"
    ) {
        this.id = id;
        this.backgroundFilename = backgroundFilename;
        this.backgroundColor = backgroundColor;
        this.icons = icons.map(icon => { return { name: icon.toString(), caption: this.ICON_CAPTIONS[icon.toString()]} });
        this.caption = caption;
        this.fontSize = fontSize as FontSize;
    }
}