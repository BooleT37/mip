import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Observable from "observable";
import * as velocityAnimate from "velocity-animate";
import Design from "src/components/Design/Design";
import Modal from "src/components/Modal/Modal";

import "./BaseLayout.less";

import "src/fonts/PTSans-Web-Regular";
import "src/fonts/PTSans-Bold";
import "src/fonts/PTSans-BoldItalic";
import "src/fonts/PTSans-Caption";
import "src/fonts/FiraSans-Regular";
import "src/fonts/FiraSans-Bold";
import "src/fonts/Exo2-Regular";
// import "src/fonts/exo2-extralight";

interface ModalState {
    opened: boolean;
    pageId: number;
}

//Observable - херовая библиотека, но для этого маленького куска её хватит
const modalState: Observable = Observable({
    opened: false,
    tileId: 1
});
function openModal(tileId: number) {
    modalState({ opened: true, tileId });
}

var tiles = document.getElementsByClassName("stages_tile");
for (let tile of Array.from(tiles)) {
    let id = parseInt(tile.getAttribute("data-id"), 10);
    tile.addEventListener("click", openModal.bind(null, id));
}

(window as any)._modalState = modalState;
(window as any)._openModal = openModal;

if (process.env.DEVELOPEMENT && process.env.DEVELOPEMENT.toString() === (true).toString()) {
    ReactDOM.render(<Design/>, document.getElementById("design-react-root"));
}
ReactDOM.render(<Modal/>, document.getElementById("modal-react-root"));

setUpAutoscrollers();

function setUpAutoscrollers() {
    function scrollTo(idScrollTo) {
        var scrollToElement = document.getElementById(idScrollTo);
        velocityAnimate(scrollToElement, "scroll", { easing: "ease", offset: -50 });
    }

    var links = document.getElementsByClassName("nav_link");
    Array.from(links).forEach(function (el, i) {
        el.addEventListener("click", scrollTo.bind(null, el.getAttribute("data-scrollTo")));
    });
}