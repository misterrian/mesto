import {
    initialCards,
    cardsContainer,
    namePreview,
    newPlaceButton,
    newPlaceLink,
    newPlaceName,
    newPlacePopup,
    penButton,
    photoPreview,
    placeForm,
    placeFormValidator,
    previewPopup,
    profileForm,
    profileFormValidator,
    profileJob,
    profileName,
    profilePopup,
    profileSubtitle,
    profileTitle
} from "./constants.js";

import Card from "./Card.js";

function openEditProfilePopup() {
    profileName.value = profileTitle.textContent;
    profileJob.value = profileSubtitle.textContent;

    profileFormValidator.enableValidation();
    showPopup(profilePopup);
}

function handleProfileFormSubmit() {
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileJob.value;

    hidePopup(profilePopup);
}

function showNewPlacePopup() {
    newPlaceName.value = '';
    newPlaceLink.value = '';

    placeFormValidator.enableValidation();
    showPopup(newPlacePopup);
}

function handlePlaceFormSubmit() {
    cardsContainer.prepend(makeCard({
        name: newPlaceName.value,
        link: newPlaceLink.value
    }));

    hidePopup(newPlacePopup);
}

function showPopup(popup) {
    popup.addEventListener('click', handlePopupClick);
    document.addEventListener('keydown', closeByEscape);
    popup.classList.add('popup_opened');
}

function hidePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', handlePopupClick);
    document.removeEventListener('keydown', closeByEscape);
}

const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        hidePopup(openedPopup);
    }
}

const handlePopupClick = (evt) => {
    const classList = evt.target.classList;
    if (classList.contains('popup') || classList.contains('popup__close-icon')) {
        const popup = document.querySelector('.popup_opened');
        hidePopup(popup);
    }
}

function makeCard(cardData) {
    const card = new Card(cardData, '#element-template');
    const cardElement = card.generateCard();

    cardElement.querySelector('.element__picture')
        .addEventListener('click', () => {
            photoPreview.src = cardData.link;
            photoPreview.alt = cardData.name;
            namePreview.textContent = cardData.name;

            showPopup(previewPopup);
        });

    return cardElement;
}

penButton.addEventListener('click', openEditProfilePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceButton.addEventListener('click', showNewPlacePopup);
placeForm.addEventListener('submit', handlePlaceFormSubmit);

initialCards.forEach(cardData => cardsContainer.append(makeCard(cardData)));
