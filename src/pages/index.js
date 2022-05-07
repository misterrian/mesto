import './index.css';

import {initialCards} from "../scripts/utils/сonstants.js";

import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

const penButton = document.querySelector('.profile-info__edit-button');
const userInfo = new UserInfo('.profile-info__title', '.profile-info__subtitle');
const profilePopup = new PopupWithForm('#profile-popup', ({name, job}) => userInfo.setUserInfo(name, job));
penButton.addEventListener('click', () => profilePopup.open(userInfo.getUserInfo()));

const newPlacePopup = new PopupWithForm('#new-place-popup', ({place, link}) => {
    const cardData = {name: place, link: link};
    const card = new Card(
        cardData,
        '#element-template',
        () => previewPopup.open(cardData)
    );
    section.addItem(card.generateCard(), true);
});

const newPlaceButton = document.querySelector('.profile__add-button');
newPlaceButton.addEventListener('click', () => newPlacePopup.open());

const previewPopup = new PopupWithImage('#preview-popup');

const section = new Section({
    items: initialCards,
    renderer: cardData => {
        const card = new Card(
            cardData,
            '#element-template',
            () => previewPopup.open(cardData)
        );
        section.addItem(card.generateCard(), false);
    }
}, '.elements');

section.renderItems();
