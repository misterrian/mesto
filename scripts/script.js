const formElement = document.querySelector('.popup');
formElement.addEventListener('submit', formSubmitHandler);

const penButton = document.querySelector('.profile-info__edit-button');
penButton.addEventListener('click', showPopup);

const profileTitle = document.querySelector('.profile-info__title');
const profileSubtitle = document.querySelector('.profile-info__subtitle');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

const closeButton = formElement.querySelector('.popup__close-icon');
closeButton.addEventListener('click', hidePopup);

function showPopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    formElement.classList.add('popup_opened');
}

function hidePopup() {
    formElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    hidePopup();
}
