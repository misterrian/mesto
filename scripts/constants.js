import FormValidator from "./FormValidator.js";

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inputErrorClass: 'popup__input_type_error'
};

export const cardsContainer = document.querySelector('.elements');
export const penButton = document.querySelector('.profile-info__edit-button');

export const profilePopup = document.querySelector('#profile-popup');
export const profileForm = profilePopup.querySelector('.popup__form');
export const profileFormValidator = new FormValidator(formSelectors, profileForm);

export const profileTitle = document.querySelector('.profile-info__title');
export const profileSubtitle = document.querySelector('.profile-info__subtitle');
export const profileName = profilePopup.querySelector('#name');
export const profileJob = profilePopup.querySelector('#job');

export const newPlaceButton = document.querySelector('.profile__add-button');

export const newPlacePopup = document.querySelector('#new-place-popup');
export const placeForm = newPlacePopup.querySelector('.popup__form');
export const placeFormValidator = new FormValidator(formSelectors, placeForm);

export const newPlaceName = newPlacePopup.querySelector('#place');
export const newPlaceLink = newPlacePopup.querySelector('#link');

export const previewPopup = document.querySelector('#preview-popup');
export const photoPreview = previewPopup.querySelector('.popup__photo');
export const namePreview = previewPopup.querySelector('.popup__name-preview');