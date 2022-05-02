import ProfilePopup from "./ProfilePopup.js";
import PreviewPopup from "./PreviewPopup.js";
import NewPlacePopup from "./NewPlacePopup.js";
import Card from "./Card.js";

const initialCards = [
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

const validatorSelectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inputErrorClass: 'popup__input_type_error'
};

const profilePopup = new ProfilePopup(validatorSelectors);

const cardsContainer = document.querySelector('.elements');
const previewPopup = new PreviewPopup();
const newPlacePopup = new NewPlacePopup(
    '#element-template',
    validatorSelectors,
    previewPopup,
    card => {
        cardsContainer.prepend(card.generateCard());
    }
);

initialCards.forEach(cardData => {
    const card = new Card(cardData, '#element-template', previewPopup);
    cardsContainer.append(card.generateCard());
});
