import * as React from "react";
import * as ReactDOM from "react-dom";
import Design from "src/components/Design/Design";
import ModalController from "src/components/ModalController/ModalController";

import "./BaseLayout.less";

// import "src/fonts/PTSans-Caption-Web-Regular";
import "src/fonts/PTSans-Web-Regular";
import "src/fonts/FiraSans-Regular";
import "src/fonts/FiraSans-Bold";

ReactDOM.render(<Design/>, document.getElementById("design-react-root"));
ReactDOM.render(<ModalController/>, document.getElementById("modal-controller-react-root"));