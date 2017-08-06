import { TileIcon } from "./Enums";

type BackgroundType = 1 | 2 | 3 | 4 | 5 | 6;
type BackgroundColor = "Blue" | "Red" | "Green";

interface Icon {
    name: string;
    caption: string;
}

interface IconCaptions {
    [key: string]: string;
}

type FontSize = "big" | "medium" | "small"

export default class TileModel {
    backgroundType: BackgroundType;
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
        backgroundType: BackgroundType,
        backgroundColor: BackgroundColor,
        icons: TileIcon[],
        caption: string,
        fontSize: FontSize = "big"
    ) {
        this.backgroundType = backgroundType;
        this.backgroundColor = backgroundColor;
        this.icons = icons.map(icon => { return { name: icon.toString(), caption: this.ICON_CAPTIONS[icon.toString()]} });
        this.caption = caption;
        this.fontSize = fontSize;
    }
}