import './index.css';

import {formSelectors} from "../scripts/utils/сonstants.js";

import Card from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Api from "../scripts/components/Api.js";
import {logError} from "../scripts/utils/PromiseUtils.js";
import PopupWithSubmit from "../scripts/components/PopupWithSubmit";

const userInfo = new UserInfo(
    '.profile-info__title',
    '.profile-info__subtitle',
    '.profile__avatar-photo',
);

const avatarPopup = new PopupWithForm(
    '#avatar-popup',
    avatarData => {
        const cleanup = initializeSavingProgress(avatarPopup.getForm());
        api.saveAvatar(avatarData)
            .then(res => {
                userInfo.setAvatar(res.avatar);
                avatarPopup.close();
            })
            .catch(logError)
            .finally(cleanup);
    },
);

avatarPopup.setEventListeners();

const avatarFormValidator = new FormValidator(formSelectors, avatarPopup.getForm());
avatarFormValidator.enableValidation();

const avatarButton = document.querySelector('.profile__avatar-button');
avatarButton.addEventListener('click', () => {
    avatarPopup.setInputValues({
        avatar: userInfo.getAvatar(),
    });
    avatarFormValidator.initValidationState();
    avatarPopup.open();
});

const profilePopup = new PopupWithForm(
    '#profile-popup',
    profileData => {
        const cleanup = initializeSavingProgress(profilePopup.getForm());
        api.saveProfile(profileData)
            .then(res => {
                userInfo.setUserInfo(res);
                profilePopup.close();
            })
            .catch(logError)
            .finally(cleanup);
    },
);

profilePopup.setEventListeners();

const profileFormValidator = new FormValidator(formSelectors, profilePopup.getForm());
profileFormValidator.enableValidation();

const penButton = document.querySelector('.profile-info__edit-button');
penButton.addEventListener('click', () => {
    profilePopup.setInputValues(userInfo.getUserInfo());
    profileFormValidator.initValidationState();
    profilePopup.open();
});

const newPlacePopup = new PopupWithForm(
    '#new-place-popup',
    cardData => {
        const cleanup = initializeSavingProgress(newPlacePopup.getForm());
        api.addCard(cardData)
            .then(res => {
                section.addItem(makeCard(res), true);
                newPlacePopup.close();
            })
            .catch(logError)
            .finally(cleanup);
    },
);

newPlacePopup.setEventListeners();

const newPlaceFormValidator = new FormValidator(formSelectors, newPlacePopup.getForm());
newPlaceFormValidator.enableValidation();

const newPlaceButton = document.querySelector('.profile__add-button');
newPlaceButton.addEventListener('click', () => {
    newPlaceFormValidator.initValidationState();
    newPlacePopup.open();
});

const submitPopup = new PopupWithSubmit('#remove-card-popup');
submitPopup.setEventListeners();

const previewPopup = new PopupWithImage('#preview-popup');
previewPopup.setEventListeners();

const section = new Section(
    cardData => section.addItem(makeCard(cardData), false),
    '.elements',
);

const api = new Api({
    userUrl: 'https://nomoreparties.co/v1/cohort-41/users/me',
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: '9d97c63b-334e-41b1-ad1d-f8e460dd9ec6',
        'Content-Type': 'application/json',
    }
});

Promise
    .all([
        api.getUserInfo(),
        api.getInitialCards(),
    ])
    .then(results => {
        userInfo.setAvatar(results[0].avatar);
        userInfo.setUserInfo(results[0]);
        section.renderItems(results[1]);
    })
    .catch(logError);

function makeCard(cardData) {
    const card = new Card(
        userInfo.getOwnId(),
        cardData,
        '#element-template',
        () => previewPopup.open(cardData),
        () => submitPopup.open(() => {
            api.removeCard(card.getCardId())
                .then(() => {
                    card.removeCard();
                    submitPopup.close();
                })
                .catch(logError);
        }),
        () => {
            const likePromise = card.isLiked()
                ? api.removeLike(card.getCardId())
                : api.addLike(card.getCardId());

            likePromise
                .then(res => card.updateLikes(res))
                .catch(logError);
        },
    );
    return card.generateCard();
}

function initializeSavingProgress(form) {
    const submitButton = form.querySelector('.popup__submit-button');
    const previousContent = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';
    return () => submitButton.textContent = previousContent;
}