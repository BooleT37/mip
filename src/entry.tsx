import * as React from "react";
import * as ReactDOM from "react-dom";
import Design from "src/components/Design/Design";
import ModalController from "src/components/ModalController/ModalController";

import "./BaseLayout.less";

ReactDOM.render(<Design/>, document.getElementById("design-react-root"));
ReactDOM.render(<ModalController/>, document.getElementById("modal-controller-react-root"));