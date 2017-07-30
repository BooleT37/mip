import * as React from "react";
import * as classnames from "classnames";

import "./design.less";

interface IDesignState {
    isShown: boolean;
    left: number;
    top: number;
    opacity: number;
    isPanelShown: boolean;
}

const LETTER_D_KEY_CODE = 68;

export default class Design extends React.Component<undefined, IDesignState> {
    constructor() {
        super();

        this.state = {
            isShown: false,
            left: 0,
            top: 0,
            opacity: 0.5,
            isPanelShown: true
        };

        this.onToggleButtonClick = this.onToggleButtonClick.bind(this);
        this.onInputLeftChange = this.onInputLeftChange.bind(this);
        this.onInputTopChange = this.onInputTopChange.bind(this);
        this.onOpacityInputChange = this.onOpacityInputChange.bind(this);
    }

    componentDidMount(): void {
        document.body.addEventListener("keydown", event => {
            if (event.altKey && event.shiftKey && event.keyCode === LETTER_D_KEY_CODE) {
                this.setState({ isPanelShown: !this.state.isPanelShown });
            }
        });
    }

    onToggleButtonClick(): void {
        this.setState({ isShown: !this.state.isShown });
    }
    onInputLeftChange(e): void {
        this.setState({ left: e.target.value });
    }
    onInputTopChange(e): void {
        this.setState({ top: e.target.value });
    }
    onOpacityInputChange(e): void {
        this.setState({ opacity: e.target.value });
    }
    render(): JSX.Element {
        return (
            <div>
                <div className={classnames("design_image", { design_image_hidden: !this.state.isShown || !this.state.isPanelShown })} style={{ left: this.state.left + "px", top: this.state.top + "px", opacity: this.state.opacity }}></div>
                <div className={classnames("design_panel", { design_panel_hidden: !this.state.isPanelShown, design_panel_compact: !this.state.isShown })}>
                    <button className="design_togleButton" type="button" onClick={this.onToggleButtonClick}>
                        {this.state.isShown ? "Выкл." : "Вкл."}
                    </button>
                    <div className="design_controls">
                        <div className="design_control">left: <input type="number" className="design_positionInput" value={this.state.left} onChange={this.onInputLeftChange} />px</div>
                        <div className="design_control">top: <input type="number" className="design_positionInput" value={this.state.top} onChange={this.onInputTopChange} />px</div>
                        <div className="design_control">opacity: <input type="number" step="0.1" className="design_opacityInput" value={this.state.opacity} onChange={this.onOpacityInputChange} /></div>
                    </div>
                </div>
            </div>
        );
    }
}