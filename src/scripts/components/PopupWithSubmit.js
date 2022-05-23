import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    setEventListeners() {
        this._popup.querySelector('.popup__submit-button')
            .addEventListener('click', () => {
                this._submitCallback();
                this.close();
            });

        super.setEventListeners();
    }

    open(submitCallback) {
        this._submitCallback = submitCallback;
        super.open();
    }
}