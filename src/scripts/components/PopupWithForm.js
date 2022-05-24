import {formSelectors} from "../utils/сonstants.js";
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);

        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector(formSelectors.formSelector);
        this._inputFields = Array.from(this._form.querySelectorAll(formSelectors.inputSelector));
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        });

        super.setEventListeners();
    }

    setInputValues(values) {
        this._inputFields.forEach(inputFiled => {
            const value = values[inputFiled.name];
            if (value) {
                inputFiled.value = value;
            }
        });
    }

    getForm() {
        return this._form;
    }

    _getInputValues() {
        const values = {};
        this._inputFields.forEach(inputField => values[inputField.name] = inputField.value);
        return values;
    }
}