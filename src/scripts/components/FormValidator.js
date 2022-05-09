export default class FormValidator {
    constructor(validatorSettings, form) {
        this._validatorSettings = validatorSettings;
        this._form = form;
        this._inputFields = Array.from(this._form.querySelectorAll(this._validatorSettings.inputSelector));
        this._submitButton = this._form.querySelector(this._validatorSettings.submitButtonSelector);
    }

    enableValidation() {
        this._submitButton.addEventListener('submit', evt => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }

    initValidationState() {
        this._inputFields.forEach(field => this._hideInputError(field));
        this._toggleSubmitButtonState();
    }

    _setEventListeners() {
        this._toggleSubmitButtonState();

        this._inputFields.forEach(inputField => {
            inputField.addEventListener('input', () => {
                this._checkInputValidity(inputField);
                this._toggleSubmitButtonState();
            });
        });
    }

    _toggleSubmitButtonState() {
        if (this._areAllInputsValid()) {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove('popup__submit-button_disabled');
        } else {
            this._submitButton.setAttribute('disabled', '');
            this._submitButton.classList.add('popup__submit-button_disabled');
        }
    }

    _areAllInputsValid() {
        return this._inputFields.every(field => field.validity.valid);
    }

    _checkInputValidity(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validatorSettings.inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validatorSettings.inputErrorClass);
        errorElement.textContent = '';
    }
}
