import {SubmittablePopup} from "./Popup.js";

export default class ProfilePopup extends SubmittablePopup {
    constructor(validatorSelectors) {
        super('#profile-popup', validatorSelectors);

        this._profileTitle = document.querySelector('.profile-info__title');
        this._profileSubtitle = document.querySelector('.profile-info__subtitle');

        this._profileName = this._element.querySelector('#name');
        this._profileJob = this._element.querySelector('#job');
    }

    showPopup() {
        this._profileName.value = this._profileTitle.textContent;
        this._profileJob.value = this._profileSubtitle.textContent;

        super.showPopup();
    }

    _setEventListeners() {
        super._setEventListeners()
        document.querySelector('.profile-info__edit-button')
            .addEventListener('click', () => this.showPopup());
    }

    _handleFormSubmit() {
        this._profileTitle.textContent = this._profileName.value;
        this._profileSubtitle.textContent = this._profileJob.value;

        super._handleFormSubmit();
    }
}
