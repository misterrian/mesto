import FormValidator from "./FormValidator.js";

export class Popup {
    constructor(popupSelector) {
        this._element = document.querySelector(popupSelector);
        this._closeByEscapeFn = this._closeByEscape.bind(this);
        this._handlePopupClickFn = this._handlePopupClick.bind(this);
    }

    showPopup() {
        document.addEventListener('keydown', this._closeByEscapeFn);
        this._element.addEventListener('click', this._handlePopupClickFn);
        this._element.classList.add('popup_opened');
    }

    _hidePopup() {
        this._element.classList.remove('popup_opened');
        this._element.removeEventListener('click', this._handlePopupClickFn);
        document.removeEventListener('keydown', this._closeByEscapeFn);
    }

    _handlePopupClick(evt) {
        const classList = evt.target.classList;
        if (classList.contains('popup') || classList.contains('popup__close-icon')) {
            this._hidePopup();
        }
    }

    _closeByEscape(evt) {
        if (evt.key === 'Escape') {
            this._hidePopup();
        }
    }
}

export class SubmittablePopup extends Popup {
    constructor(popupSelector, validatorSelectors) {
        super(popupSelector);

        this._form = this._element.querySelector('.popup__form');
        this._formValidator = new FormValidator(validatorSelectors, this._form);

        this._setEventListeners();
    }

    _setEventListeners() {
        this._form.addEventListener('submit', () => this._handleFormSubmit());
    }

    showPopup() {
        this._formValidator.enableValidation();
        super.showPopup();
    }

    _handleFormSubmit() {
        this._hidePopup();
    }
}
