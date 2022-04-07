enableValidation(formSelectors);

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

    toggleSubmitButtonState(inputFields, submitButton);

    inputFields.forEach(inputField => {
        inputField.addEventListener('input', () => {
            checkInputValidity(validationSettings.inputErrorClass, form, inputField);
            toggleSubmitButtonState(inputFields, submitButton);
        });
    });
}

function initFormValidationState(validationSettings, popup) {
    const form = popup.querySelector(validationSettings.formSelector);

    const inputFields = Array.from(form.querySelectorAll(validationSettings.inputSelector));
    inputFields.forEach(inputField => hideInputError(validationSettings.inputErrorClass, form, inputField));

    const submitButton = form.querySelector(validationSettings.submitButtonSelector);
    toggleSubmitButtonState(inputFields, submitButton);
}

function toggleSubmitButtonState(inputFields, buttonElement) {
    if (areAllInputsValid(inputFields)) {
        buttonElement.removeAttribute('disabled');
    } else {
        buttonElement.setAttribute('disabled', '');
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
