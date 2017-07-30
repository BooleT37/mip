import * as React from "react";

const styles = require("./ModalController.less");

interface IModalControllerState {
    modalLoading: boolean;
    modalLoadError: boolean;
    modalShown: boolean;
    modalComponent: any;
}

export default class ModalController extends React.Component<undefined, IModalControllerState> {
    constructor() {
        super();
        this.state = {
            modalLoading: false,
            modalLoadError: false,
            modalShown: false,
            modalComponent: null
        }

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    showModal() {
        if (this.state.modalComponent === null) {
            import(/* webpackChunkName: "Modal" */ "src/components/Modal/Modal").then((modalComponent) => {
                this.setState({ modalLoading: false, modalShown: true, modalComponent: modalComponent.default });
            }).catch((error) => {
                console.error(error);
                this.setState({ modalLoading: false, modalShown: false, modalLoadError: true });
            });
            this.setState({ modalLoading: true });
        } else {
            this.setState({ modalShown: true });
        }
    }
    hideModal() {
        this.setState({ modalShown: false });
    }
    renderModalContent() {
        const Modal = this.state.modalComponent;

        if (this.state.modalLoadError) {
            return (<div className={styles.modalLoadError}>Ошибка при загрузке модального окна</div>);
        } if (this.state.modalLoading) {
            return (<div className={styles.modalLoading}>Загрузка...</div>);
        } if (this.state.modalShown) {
            return (<Modal/>);
        }
        return null;
    }
    render() {
        var modal = this.renderModalContent();

        return (
            <div className={styles.modalController}>
                <button onClick={this.showModal}>Открыть модальное окно</button>
                { modal }
            </div>
        );
    }
}