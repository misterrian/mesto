import {Popup} from "./Popup.js";

export default class PreviewPopup extends Popup {
    constructor() {
        super('#preview-popup');

        this._photoPreview = this._element.querySelector('.popup__photo');
        this._previewName = this._element.querySelector('.popup__name-preview');
    }

    showPopup(name, link) {
        this._photoPreview.src = link;
        this._photoPreview.alt = name;
        this._previewName.textContent = name;

        super.showPopup();
    }
}
