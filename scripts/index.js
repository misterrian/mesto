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
initialCards.forEach(card => elements.append(createCard(card)));

function createCard(card) {
    const elementContainer = document.createElement('div');
    elementContainer.classList.add('element');

    const picture = document.createElement('img');
    picture.classList.add('element__picture');
    picture.alt = card.name;
    picture.src = card.link;

    const remove = document.createElement('div');
    remove.classList.add('element__remove');
    remove.addEventListener('click', onRemoveClick)

    const descriptionContainer = document.createElement('div');
    descriptionContainer.classList.add('element__description');

    const title = document.createElement('h2');
    title.classList.add('element__title');
    title.textContent = card.name;

    const like = document.createElement('div');
    like.classList.add('element__like');
    like.addEventListener('click', onLikeClick);

    descriptionContainer.append(title, like);
    elementContainer.append(picture, remove, descriptionContainer);

    return elementContainer;
}

function onRemoveClick(evt) {
    evt.target.parentElement.remove();
}

function onLikeClick(evt) {
    const classList = evt.target.classList;
    if (classList.contains('element__like_active')) {
        classList.remove('element__like_active');
    } else {
        classList.add('element__like_active');
    }
}

const penButton = document.querySelector('.profile-info__edit-button');
penButton.addEventListener('click', showProfilePopup);

const profilePopup = document.querySelector('#profile-popup');
const profileForm = profilePopup.querySelector('#profile-form');
profileForm.addEventListener('submit', profileFormSubmitHandler);

const profileTitle = document.querySelector('.profile-info__title');
const profileSubtitle = document.querySelector('.profile-info__subtitle');
const profileName = profilePopup.querySelector('#name');
const profileJob = profilePopup.querySelector('#job');

const profileCloseButton = profilePopup.querySelector('.popup__close-icon');
profileCloseButton.addEventListener('click', hideProfilePopup);

function showProfilePopup() {
    profileName.value = profileTitle.textContent;
    profileJob.value = profileSubtitle.textContent;
    profilePopup.classList.add('popup_opened');
}

function hideProfilePopup() {
    profilePopup.classList.remove('popup_opened');
}

function profileFormSubmitHandler(evt) {
    evt.preventDefault();

    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileJob.value;

    hideProfilePopup();
}

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', showPlacePopup);
const newPlacePopup = document.querySelector('#new-place-popup');
const placeCloseButton = newPlacePopup.querySelector('.popup__close-icon');
placeCloseButton.addEventListener('click', hidePlacePopup);
const placeForm = newPlacePopup.querySelector('#place-form');
placeForm.addEventListener('submit', placeFormSubmitHandler);

const newPlaceName = newPlacePopup.querySelector('#place');
const newPlaceLink = newPlacePopup.querySelector('#link');

function placeFormSubmitHandler(evt) {
    evt.preventDefault();

    elements.prepend(createCard({
        name: newPlaceName.value,
        link: newPlaceLink.value
    }));

    hidePlacePopup();
}

function showPlacePopup() {
    newPlacePopup.classList.add('popup_opened');
}

function hidePlacePopup() {
    newPlacePopup.classList.remove('popup_opened');
}
