import * as React from "react";
import * as CustomScroll from "react-custom-scroll";
import * as velocityAnimate from "velocity-animate";
import * as classnames from "classnames";
import "react-custom-scroll/src/main/customScroll.css";
import "./Modal.customScroll.css";

const styles = require("./Modal.less");

interface State {
    opened: boolean;
    backgroundLoaded: boolean;
    tileId?: number;
    imageIndex: number;
}

export default class Modal extends React.Component<undefined, State> {
    constructor() {
        super();

        this.close = this.close.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
        this.renderTrack = this.renderTrack.bind(this);
        this.shiftImageLeft = this.shiftImageLeft.bind(this);
        this.shiftImageRight = this.shiftImageRight.bind(this);
    }
    private rootNode: HTMLDivElement;
    private readonly IMAGE_NAMES: string[] = ["1.jpg", "2.jpg", "3.jpg"];
    state: State = {
        opened: false,
        backgroundLoaded: false,
        tileId: 1,
        imageIndex: 0
    }
    componentDidMount() {
        (window as any)._modalState((newState: State) => { this.setState(newState); });
    }
    componentWillUpdate(_: any, nextState: State) {
        if (nextState.opened && !this.state.backgroundLoaded) {
            this.loadBackground();
        }
    }
    componentDidUpdate(_: any, prevState: State) {
        if (this.state.opened && this.state.backgroundLoaded && (!prevState.opened || !prevState.backgroundLoaded)) {
            velocityAnimate(this.rootNode, "scroll", { duration: 200, offset: 130 });
        }
    }
    loadBackground() {
        const img = document.createElement("img");
        img.src = require("./images/background.png");
        img.onload = () => { this.setState({ backgroundLoaded: true })}
    }
    shiftImageLeft() {
        this.setState({ imageIndex: this.state.imageIndex - 1 });
    }
    shiftImageRight() {
        this.setState({ imageIndex: this.state.imageIndex + 1 });
    }
    close() {
        this.setState({ opened: false });
    }
    renderThumb(props) {
        const thumbStyle = {
            backgroundColor: "red"
        };
        const style = Object.assign({}, props.style, thumbStyle);
        return (
            <div
                style={style}
                {...props}/>
        );
    }
    renderTrack(props) {
        const trackStyle = {
            backgroundColor: "green"
        };
        const style = Object.assign({}, props.style, trackStyle);
        return (
            <div
                style={style}
                {...props}/>
        );
    }
    render() {
        return this.state.opened && this.state.backgroundLoaded ? (
            <div className={styles.root} ref={node => { this.rootNode = node }}>
                <div className={styles.close} onClick={this.close}></div>
                <div className={styles.caption}>
                    Винтовой имплантат для остеосинтеза шейки бедренной кости (патент РФ 2582980)
                </div>
                <div className={styles.content}>
                    <div className={styles.photoPanel}>
                        <div className={styles.photo}>
                            <img src={`/images/${this.IMAGE_NAMES[this.state.imageIndex]}`} alt="photo"/>
                        </div>
                        <div className={styles.photoControls}>
                            <div
                                className={classnames(styles.arrowLeft, { [styles.hidden]: this.state.imageIndex === 0 })}
                                onClick={this.shiftImageLeft}>
                            </div>
                            <div className={styles.photoCaption}>30 мкм</div>
                            <div
                                className={classnames(styles.arrowRight, { [styles.hidden]: this.state.imageIndex === this.IMAGE_NAMES.length - 1 })}
                                onClick={this.shiftImageRight}>
                            </div>
                        </div>
                    </div>
                    <div className={styles.textContainer + " modal_customScroll"}>
                        <CustomScroll>
                            <div className={styles.text}>
                                {TEXT}
                            </div>
                        </CustomScroll>
                    </div>
                </div>
            </div>
        ) : null;
    }
}

const TEXT: (JSX.Element)[] = [
    <p key="1">
        Изобретение относится к области медицинской техники, а именно
        к ортопедии и травматологии, в частности, к способам, используемым
        при хирургическом лечении переломов бедра, в том числе и в условиях остеопороза костей.
    </p>,
    <p key="2">
        Разработанный в ИФМ УрО РАН винтовой имплантат обеспечивает стабильную иммобилизацию
        костей в зоне перелома, при упрощении проводимого хирургического вмешательства, снижении
        его травматичности
        и ускорении заживления зоны перелома.
    </p>,
    <p key="3">
        Винтовой имплантат для остеосинтеза шейки бедренной кости, включает выполненные из титана
        интрамедуллярный стержень и фиксирующий шеечный винт. В проксимальной части интрамедуллярного
        стержня выполнено резьбовое, сквозное наклонное отверстие под фиксирующий шеечный винт. Шеечный
        винт выполнен в виде цилиндра с резьбой, по всей  длине его наружной поверхности,
        соответствующей резьбе сквозного наклонного отверстия интрамедуллярного стержня, с четырьмя
        симметричными продольными пазами на его поверхности, составляющими 60 – 80 % его длины с глубиной
        4 – 4,5 мм, в перемычках между пазами выполнен ряд сквозных отверстий диаметром 2,0 – 2,3 мм с шагом
        4 мм, при этом отверстия каждой перемычки смещены относительно отверстий соседних перемычек на 2 мм,
        остальная часть резьбы на проксимальном конце фиксирующего шейного винта, предназначена для его
        завинчивания в сквозное наклонное резьбовое отверстие интрамедуллярного стержня, и на проксимальном
        его конце выполнено четырехгранное отверстие для инструмента.
        В цилиндрическом торце интрамедуллярного стержня выполнено резьбовое отверстие под зажимной резьбовой винт
        с коническим концом, закрепляющий фиксирующий шеечный винт в интрамедуллярном стержне, в дистальной части
        интрамедуллярного стержня выполнено два отверстия, круглое и овальное
        под кортикальные винты. 
    </p>,
    <p key="4">
        Интрамедуллярный стержень и фиксирующий шейный винт имеют по всей поверхности алмазоподобное покрытие в виде
        слоя из алмазоподобного углерода (DLC) толщиной 0,5 мкм. Антибактериальные свойства алмазоподобного покрытия
        обеспечивают интенсификацию остеогенеза, снижение риска инфицирования и возникновения воспалительных реакций.
    </p>
];