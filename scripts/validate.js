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
        const inputFields = Array.from(form.querySelectorAll(validationSettings.inputSelector));
        const submitButton = form.querySelector(validationSettings.submitButtonSelector);

        const formValidator = () => {
            if (inputFields.every(field => field.validity.valid)) {
                submitButton.classList.remove(validationSettings.inactiveButtonClass);
            } else {
                inputFields.forEach(filed => console.log(filed.validity));
                submitButton.classList.add(validationSettings.inactiveButtonClass);
            }
        };

        inputFields.forEach(field => injectFieldValidation(validationSettings, form, field, formValidator));
    });
}

function injectFieldValidation(validationSettings, form, field, formValidator) {
    const fieldError = form.querySelector(`.${field.id}-error`);

    const showInputError = (errorMessage) => {
        field.classList.add(validationSettings.inputErrorClass);
        fieldError.textContent = errorMessage;
    };

    const hideInputError = () => {
        field.classList.remove(validationSettings.inputErrorClass);
        fieldError.textContent = '';
    };

    const isValid = () => {
        if (field.validity.valid) {
            hideInputError();
        } else {
            showInputError(field.validationMessage);
        }
    };

    field.addEventListener('input', () => {
        isValid();
        formValidator();
    });
}
