"use strict";
exports.__esModule = true;
var TileModel = (function () {
    function TileModel(backgroundType, backgroundColor, icons, caption, fontSize) {
        if (fontSize === void 0) { fontSize = "big"; }
        var _this = this;
        this.ICON_CAPTIONS = {
            metallurgy: "Металлургия",
            mech: "Машиностроение",
            food: "Пищевое производство",
            oil: "Нефтедобыча",
            medicine: "Медицина",
            repair: "Ремонт"
        };
        this.backgroundType = backgroundType;
        this.backgroundColor = backgroundColor;
        this.icons = icons.map(function (icon) { return { name: icon.toString(), caption: _this.ICON_CAPTIONS[icon.toString()] }; });
        this.caption = caption;
        this.fontSize = fontSize;
    }
    return TileModel;
}());
exports["default"] = TileModel;
