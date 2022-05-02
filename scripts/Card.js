export default class Card {
    constructor(data, cardSelector, previewPopup) {
        this._name = data.name;
        this._link = data.link;
        this._liked = false;
        this._cardSelector = cardSelector;
        this._previewPopup = previewPopup;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__title').textContent = this._name;

        const picture = this._element.querySelector('.element__picture');
        picture.alt = this._name;
        picture.src = this._link;

        return this._element;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _setEventListeners() {
        this._element.querySelector('.element__picture')
            .addEventListener('click', () => this._previewPopup.showPopup(this._name, this._link));

        this._element.querySelector('.element__remove')
            .addEventListener('click', () => this._removeCard());

        this._element.querySelector('.element__like')
            .addEventListener('click', () => this._toggleLikeButton());
    }

    _removeCard() {
        this._element.remove();
    }

    _toggleLikeButton() {
        this._setLikeButton(!this._liked)
    }

    _setLikeButton(liked) {
        this._liked = liked;

        const classList = this._element.querySelector('.element__like').classList;
        if (this._liked) {
            classList.add('element__like_active');
        } else {
            classList.remove('element__like_active');
        }
    }
}
