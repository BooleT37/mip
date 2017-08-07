import * as React from "react";

const styles = require("./Modal.less");

interface State {
    opened: boolean;
    backgroundLoaded: boolean;
    tileId?: number;
}

export default class Modal extends React.Component<undefined, State> {
    constructor() {
        super();

        this.close = this.close.bind(this);
    }
    state: State = {
        opened: false,
        backgroundLoaded: false,
        tileId: 1
    }
    componentDidMount() {
        (window as any)._modalState((newState: State) => { this.setState(newState); });
    }
    componentWillUpdate(_: any, nextState: State) {
        if (nextState.opened && !this.state.backgroundLoaded) {
            this.loadBackground();
        }
    }
    loadBackground() {
        const img = document.createElement("img");
        img.src = require("./images/background.png");
        img.onload = () => { this.setState({ backgroundLoaded: true })}
    }
    close() {
        this.setState({ opened: false });
    }
    render() {
        return this.state.opened && this.state.backgroundLoaded ? (
            <div className={styles.root}>
                <div className={styles.close} onClick={this.close}></div>
                <div className={styles.caption}>
                    МАТЕРИАЛ И СПОСОБ ИСПОЛЬЗОВАНИЯ САМОРАЗРУШАЮЩЕЙСЯ ОБОЛОЧКИ
                    ДЛЯ ГИДРОЭКСТРУЗИИ МАЛОПЛАСТИЧНЫХ СПЛАВОВ (НОУ-ХАУ)
                </div>
                <div className={styles.content}>
                    <div className={styles.photoPanel}>
                        <div className={styles.photo}>
                            <img src="/images/1.png" alt="photo"/>
                        </div>
                        <div className={styles.photoControls}>
                            <div className={styles.arrowLeft}></div>
                            <div className={styles.photoCaption}>30 мкм</div>
                            <div className={styles.arrowRight}></div>
                        </div>
                    </div>
                    <div className={styles.text}>{LOREM_IPSUM}</div>
                </div>
            </div>
        ) : null;
    }
}

const LOREM_IPSUM: (JSX.Element)[] = [
    <p key="1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Maecenas at neque quis nunc egestas eleifend ac sit amet
        enim. Nulla aliquam dapibus ipsum, non tristique turpis
        lobortis ut. Fusce mollis nisl a orci facilisis, quis porta
        magna auctor. Nunc molestie nunc dolor, ut consequat dolor
        condimentum vitae. Maecenas semper auctor diam, a placerat
        felis ultrices non. Morbi at dui nulla. Quisque ac nisl nisi.
        In id rutrum velit, sit amet ultrices turpis.
    </p>,
    <p key="2">
        Etiam accumsan semper diam, in venenatis diam. Nullam vitae
        suscipit dolor. Donec lacinia commodo lectus, id vestibulum
        lectus pharetra vel. Pellentesque placerat arcu ligula,
        hendrerit porttitor risus convallis sed. Vestibulum sit amet
        sem euismod, lacinia elit in, maximus dolor. Phasellus pharetra 
        placerat dictum. Duis ullamcorper ante urna, a vestibulum magna 
        vestibulum sit amet. Aenean purus lacus, auctor sed odio id,
        lacinia venenatis velit. Nullam sed velit mauris. Vivamus vel
        rutrum erat. Suspendisse bibendum, odio ut semper rutrum, dui
        ex placerat metus, nec volutpat ipsum risus in massa.
    </p>,
    <p key="3">
        Integer at tempor est. Suspendisse a molestie eros. Integer
        vel augue sed lacus auctor feugiat. Mauris posuere placerat
        augue, quis dictum mauris iaculis nec. Nam eleifend vehicula
        tincidunt. Vestibulum dictum convallis magna sed gravida. Sed
        in ultricies justo. Etiam malesuada consequat enim at vehicula. 
        Vivamus eu eros ipsum. Cras congue urna fermentum nisi pulvinar
        cursus. Vivamus interdum ornare nisl nec fringilla. Vestibulum non
        ipsum eu elit efficitur tempus. Praesent nisi lacus, rhoncus
        ultrices laoreet sit amet, ultrices hendrerit nibh. Sed ut
        dapibus urna, eget pretium leo.
    </p>,
    <p key="4">
        Mauris aliquet nisi ut nibh volutpat, a blandit urna vehicula.
        Nulla ullamcorper at ante eget porta. Sed vulputate est eget
        magna gravida suscipit. Sed molestie urna nec libero molestie,
        eget lacinia nisi cursus. Mauris dapibus ante in tincidunt
        gravida. Nullam nec turpis in nunc placerat feugiat at ut dui.
        Sed euismod felis at mauris ullamcorper rhoncus. Morbi ac aliquet
        lectus, quis ornare ex.
    </p>
];