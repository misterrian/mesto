import {SubmittablePopup} from "./Popup.js";
import Card from "./Card.js";

export default class NewPlacePopup extends SubmittablePopup {
    constructor(cardTemplate, validatorSettings, previewPopup, newCardReceiver) {
        super('#new-place-popup', validatorSettings);

        this._cardTemplate = cardTemplate;
        this._previewPopup = previewPopup;
        this._newCardReceiver = newCardReceiver;

        this._newPlaceName = this._element.querySelector('#place');
        this._newPlaceLink = this._element.querySelector('#link');
    }

    showPopup() {
        this._newPlaceName.value = '';
        this._newPlaceLink.value = '';

        super.showPopup();
    }

    _setEventListeners() {
        super._setEventListeners()
        document.querySelector('.profile__add-button')
            .addEventListener('click', () => this.showPopup());
    }

    _handleFormSubmit() {
        const cardData = {
            name: this._newPlaceName.value,
            link: this._newPlaceLink.value
        };

        const card = new Card(cardData, this._cardTemplate, this._previewPopup);
        this._newCardReceiver(card);

        super._handleFormSubmit();
    }
}
