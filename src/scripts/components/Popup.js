export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._escCloseHandler = (evt) => this._handleEscClose(evt);
    }

    open() {
        document.addEventListener('keydown', this._escCloseHandler);
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escCloseHandler);
    }

    _setEventListeners() {
        this._popup.addEventListener('click', evt => this._handlePopupClick(evt));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handlePopupClick(evt) {
        const classList = evt.target.classList;
        if (classList.contains('popup') || classList.contains('popup__close-icon')) {
            this.close();
        }
    }
}