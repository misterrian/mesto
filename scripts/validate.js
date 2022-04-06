enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error'
});

function enableValidation(validationSettings) {
    const forms = Array.from(document.querySelectorAll(validationSettings.formSelector));
    forms.forEach(form => {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(validationSettings, form);
    });
}

function setEventListeners(validationSettings, form) {
    const inputFields = Array.from(form.querySelectorAll(validationSettings.inputSelector));
    const submitButton = form.querySelector(validationSettings.submitButtonSelector);

    toggleButtonState(validationSettings.inactiveButtonClass, inputFields, submitButton);

    inputFields.forEach((inputField) => {
        inputField.addEventListener('input', () => {
            checkInputValidity(validationSettings.inputErrorClass, form, inputField);
            toggleButtonState(validationSettings.inactiveButtonClass, inputFields, submitButton);
        });
    });
}

function toggleButtonState(inactiveButtonClass, inputFields, buttonElement) {
    if (areAllInputsValid(inputFields)) {
        buttonElement.classList.remove(inactiveButtonClass);
    } else {
        buttonElement.classList.add(inactiveButtonClass);
    }
}

function areAllInputsValid(inputFields) {
    return inputFields.every(field => field.validity.valid);
}

function checkInputValidity(inputErrorClass, formElement, inputElement) {
    if (inputElement.validity.valid) {
        hideInputError(inputErrorClass, formElement, inputElement);
    } else {
        showInputError(inputErrorClass, formElement, inputElement, inputElement.validationMessage);
    }
}

function showInputError(inputErrorClass, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(inputErrorClass, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
}
