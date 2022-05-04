import {
    cardsContainer,
    initialCards,
    newPlaceButton,
    newPlaceLink,
    newPlaceName,
    newPlacePopup,
    penButton,
    placeForm,
    placeFormValidator,
    profileForm,
    profileFormValidator,
    profileJob,
    profileName,
    profilePopup,
    profileSubtitle,
    profileTitle
} from "./constants.js";

import Card from "./Card.js";
import {hidePopup, showPopup} from "./utils.js";

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
    placeForm.reset();
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

function makeCard(cardData) {
    const card = new Card(cardData, '#element-template');
    return card.generateCard();
}

penButton.addEventListener('click', openEditProfilePopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
newPlaceButton.addEventListener('click', showNewPlacePopup);
placeForm.addEventListener('submit', handlePlaceFormSubmit);

initialCards.forEach(cardData => cardsContainer.append(makeCard(cardData)));
