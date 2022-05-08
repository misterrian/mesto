import './index.css';

import {initialCards, formSelectors} from "../scripts/utils/сonstants.js";

import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";

const userInfo = new UserInfo('.profile-info__title', '.profile-info__subtitle');
const profilePopup = new PopupWithForm('#profile-popup', profileData => userInfo.setUserInfo(profileData));
profilePopup.setEventListeners();

const profileFormValidator = new FormValidator(formSelectors, profilePopup.getForm());
profileFormValidator.enableValidation();

const penButton = document.querySelector('.profile-info__edit-button');
penButton.addEventListener('click', () => {
    profilePopup.setInputValues(userInfo.getUserInfo());
    profileFormValidator.initValidationState();
    profilePopup.open();
});

function makeCard(cardData) {
    const card = new Card(
        cardData,
        '#element-template',
        () => previewPopup.open(cardData)
    );
    return card.generateCard();
}

const newPlacePopup = new PopupWithForm(
    '#new-place-popup',
    cardData => section.addItem(makeCard(cardData), true)
);

newPlacePopup.setEventListeners();

const newPlaceFormValidator = new FormValidator(formSelectors, newPlacePopup.getForm());
newPlaceFormValidator.enableValidation();

const newPlaceButton = document.querySelector('.profile__add-button');
newPlaceButton.addEventListener('click', () => {
    newPlaceFormValidator.initValidationState();
    newPlacePopup.open();
});

const previewPopup = new PopupWithImage('#preview-popup');
previewPopup.setEventListeners();

const section = new Section({
    items: initialCards,
    renderer: cardData => section.addItem(makeCard(cardData), false)
}, '.elements');

section.renderItems();
