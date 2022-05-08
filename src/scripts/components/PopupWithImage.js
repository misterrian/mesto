import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._photo = this._popup.querySelector('.popup__photo');
        this._name = this._popup.querySelector('.popup__name-preview');
    }

    open({name, link}) {
        this._photo.src = link;
        this._photo.alt = name;
        this._name.textContent = name;

        super.open();
    }
}