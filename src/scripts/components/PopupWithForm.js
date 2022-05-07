import {formSelectors} from "../utils/сonstants.js";
import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);

        this._submitCallback = submitCallback;
        this._form = this._popup.querySelector(formSelectors.formSelector);
        this._validator = new FormValidator(formSelectors, this._form);
        this._inputFields = Array.from(this._form.querySelectorAll(formSelectors.inputSelector));

        this._setEventListeners();
    }

    open(defaultValues= {}) {
        this._inputFields.forEach(inputFiled => {
            const value = defaultValues[inputFiled.name];
            if (value) {
                inputFiled.value = value;
            }
        });

        this._validator.enableValidation();
        super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }

    _setEventListeners() {
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });

        super._setEventListeners();
    }

    _getInputValues() {
        const values = {};
        this._inputFields.forEach(inputField => values[inputField.name] = inputField.value);
        return values;
    }
}