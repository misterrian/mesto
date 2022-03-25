const popupElement = document.querySelector('.popup');
const popupContainer = popupElement.querySelector('.popup__container');
popupContainer.addEventListener('submit', formSubmitHandler);

const penButton = document.querySelector('.profile-info__edit-button');
penButton.addEventListener('click', showPopup);

const profileTitle = document.querySelector('.profile-info__title');
const profileSubtitle = document.querySelector('.profile-info__subtitle');
const nameInput = popupElement.querySelector('#name');
const jobInput = popupElement.querySelector('#job');

const closeButton = popupElement.querySelector('.popup__close-icon');
closeButton.addEventListener('click', hidePopup);

function showPopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    popupElement.classList.add('popup_opened');
}

function hidePopup() {
    popupElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    hidePopup();
}
