import * as React from "react";

const styles = require("./Modal.less");

export default class Modal extends React.Component<undefined, undefined> {
    constructor() {
        super();
    }
    render() {
        return(
            <div className={styles.modal}></div>
        );
    }
}