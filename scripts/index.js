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

const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;
initialCards.forEach(card => elements.append(createCard(card)));

const penButton = document.querySelector('.profile-info__edit-button');
penButton.addEventListener('click', onEditProfilePopup);

const profilePopup = document.querySelector('#profile-popup');
const profileForm = profilePopup.querySelector('#profile-form');
profileForm.addEventListener('submit', profileFormSubmitHandler);

const profileTitle = document.querySelector('.profile-info__title');
const profileSubtitle = document.querySelector('.profile-info__subtitle');
const profileName = profilePopup.querySelector('#name');
const profileJob = profilePopup.querySelector('#job');

const profileCloseButton = profilePopup.querySelector('.popup__close-icon');
profileCloseButton.addEventListener('click', () => hidePopup(profilePopup));

const newPlaceButton = document.querySelector('.profile__add-button');
newPlaceButton.addEventListener('click', showNewPlacePopup);

const newPlacePopup = document.querySelector('#new-place-popup');
const placeCloseButton = newPlacePopup.querySelector('.popup__close-icon');
placeCloseButton.addEventListener('click', () => hidePopup(newPlacePopup));
const placeForm = newPlacePopup.querySelector('#place-form');
placeForm.addEventListener('submit', placeFormSubmitHandler);

const newPlaceName = newPlacePopup.querySelector('#place');
const newPlaceLink = newPlacePopup.querySelector('#link');

const previewPopup = document.querySelector('#preview-popup');
const photoPreview = previewPopup.querySelector('.popup__photo');
const namePreview = previewPopup.querySelector('.popup__name-preview');
const previewCloseButton = previewPopup.querySelector('.popup__close-icon');
previewCloseButton.addEventListener('click', () => hidePopup(previewPopup));

function onEditProfilePopup() {
    profileName.value = profileTitle.textContent;
    profileJob.value = profileSubtitle.textContent;

    showPopup(profilePopup);
}

function profileFormSubmitHandler(evt) {
    evt.preventDefault();

    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileJob.value;

    hidePopup(profilePopup);
}

function showNewPlacePopup() {
    newPlaceName.value = '';
    newPlaceLink.value = '';
    showPopup(newPlacePopup);
}

function placeFormSubmitHandler(evt) {
    evt.preventDefault();

    elements.prepend(createCard({
        name: newPlaceName.value,
        link: newPlaceLink.value
    }));

    hidePopup(newPlacePopup);
}

function onPictureClick(card) {
    photoPreview.src = card.link;
    photoPreview.alt = card.name;
    namePreview.textContent = card.name;

    showPopup(previewPopup);
}

function onLikeClick(evt) {
    evt.target.classList.toggle('element__like_active');
}

function showPopup(popup) {
    popup.classList.add('popup_opened');
}

function hidePopup(popup) {
    popup.classList.remove('popup_opened');
}

function createCard(card) {
    const element = cardTemplate.querySelector('.element').cloneNode(true);

    const picture = element.querySelector('.element__picture');
    picture.alt = card.name;
    picture.src = card.link;
    picture.addEventListener('click', () => onPictureClick(card));

    element.querySelector('.element__remove').addEventListener('click', () => element.remove());
    element.querySelector('.element__title').textContent = card.name;
    element.querySelector('.element__like').addEventListener('click', onLikeClick);

    return element;
}
