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
        this._inputFields.forEach(
            field => this._hideInputError(this._validatorSettings.inputErrorClass, this._form, field)
        );
        this._toggleSubmitButtonState();
    }

    _setEventListeners() {
        this._toggleSubmitButtonState();

        this._inputFields.forEach(inputField => {
            inputField.addEventListener('input', () => {
                this._checkInputValidity(this._validatorSettings.inputErrorClass, this._form, inputField);
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

    _checkInputValidity(inputErrorClass, formElement, inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputErrorClass, formElement, inputElement);
        } else {
            this._showInputError(inputErrorClass, formElement, inputElement, inputElement.validationMessage);
        }
    }

    _showInputError(inputErrorClass, formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputErrorClass, formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = '';
    }
}
