export default class FormValidator {
    constructor(validatorSettings, form) {
        this._validatorSettings = validatorSettings;
        this._form = form;
        this._setEventListeners();
    }

    enableValidation() {
        const inputFields = Array.from(this._form.querySelectorAll(this._validatorSettings.inputSelector));
        inputFields.forEach(field => this._hideInputError(this._validatorSettings.inputErrorClass, this._form, field));

        const submitButton = this._form.querySelector(this._validatorSettings.submitButtonSelector);
        this._toggleSubmitButtonState(inputFields, submitButton);
    }

    _setEventListeners() {
        const inputFields = Array.from(this._form.querySelectorAll(this._validatorSettings.inputSelector));
        const submitButton = this._form.querySelector(this._validatorSettings.submitButtonSelector);

        this._toggleSubmitButtonState(inputFields, submitButton);

        inputFields.forEach(inputField => {
            inputField.addEventListener('input', () => {
                this._checkInputValidity(this._validatorSettings.inputErrorClass, this._form, inputField);
                this._toggleSubmitButtonState(inputFields, submitButton);
            });
        });
    }

    _toggleSubmitButtonState(inputFields, buttonElement) {
        if (this._areAllInputsValid(inputFields)) {
            buttonElement.removeAttribute('disabled');
        } else {
            buttonElement.setAttribute('disabled', '');
        }
    }

    _areAllInputsValid(inputFields) {
        return inputFields.every(field => field.validity.valid);
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
