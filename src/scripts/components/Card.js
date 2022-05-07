export default class Card {
    constructor({name, link}, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
            .addEventListener('click', this._handleCardClick);

        this._element.querySelector('.element__remove')
            .addEventListener('click', () => this._removeCard());

        this._element.querySelector('.element__like')
            .addEventListener('click', () => this._toggleLikeButton());
    }

    _removeCard() {
        this._element.remove();
    }

    _toggleLikeButton() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }
}
