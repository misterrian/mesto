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

const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inputErrorClass: 'popup__input_type_error'
};

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;
initialCards.forEach(card => cardsContainer.append(createCard(card)));

const penButton = document.querySelector('.profile-info__edit-button');
penButton.addEventListener('click', openEditProfilePopup);

const profilePopup = document.querySelector('#profile-popup');
const profileForm = profilePopup.querySelector('.popup__form');
profileForm.addEventListener('submit', handleProfileFormSubmit);

const profileTitle = document.querySelector('.profile-info__title');
const profileSubtitle = document.querySelector('.profile-info__subtitle');
const profileName = profilePopup.querySelector('#name');
const profileJob = profilePopup.querySelector('#job');

const newPlaceButton = document.querySelector('.profile__add-button');
newPlaceButton.addEventListener('click', showNewPlacePopup);

const newPlacePopup = document.querySelector('#new-place-popup');
const placeForm = newPlacePopup.querySelector('.popup__form');
placeForm.addEventListener('submit', handlePlaceFormSubmit);

const newPlaceName = newPlacePopup.querySelector('#place');
const newPlaceLink = newPlacePopup.querySelector('#link');

const previewPopup = document.querySelector('#preview-popup');
const photoPreview = previewPopup.querySelector('.popup__photo');
const namePreview = previewPopup.querySelector('.popup__name-preview');

function openEditProfilePopup() {
    profileName.value = profileTitle.textContent;
    profileJob.value = profileSubtitle.textContent;

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

    showPopup(newPlacePopup);
}

function handlePlaceFormSubmit() {
    cardsContainer.prepend(createCard({
        name: newPlaceName.value,
        link: newPlaceLink.value
    }));

    hidePopup(newPlacePopup);
}

function openPicturePreview(card) {
    photoPreview.src = card.link;
    photoPreview.alt = card.name;
    namePreview.textContent = card.name;

    showPopup(previewPopup);
}

function toggleLikeButton(evt) {
    evt.target.classList.toggle('element__like_active');
}

function showPopup(popup) {
    popup.addEventListener('click', handlePopupClick);
    document.addEventListener('keydown', closeByEscape);
    popup.classList.add('popup_opened');

    initFormValidationState(formSelectors, popup);
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

function createCard(card) {
    const element = cardTemplate.querySelector('.element').cloneNode(true);

    const picture = element.querySelector('.element__picture');
    picture.alt = card.name;
    picture.src = card.link;
    picture.addEventListener('click', () => openPicturePreview(card));

    element.querySelector('.element__remove').addEventListener('click', () => element.remove());
    element.querySelector('.element__title').textContent = card.name;
    element.querySelector('.element__like').addEventListener('click', toggleLikeButton);

    return element;
}
