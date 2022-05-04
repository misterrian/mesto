export function showPopup(popup) {
    popup.addEventListener('click', handlePopupClick);
    document.addEventListener('keydown', closeByEscape);
    popup.classList.add('popup_opened');
}

export function hidePopup(popup) {
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
