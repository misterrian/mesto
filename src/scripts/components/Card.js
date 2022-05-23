export default class Card {
    constructor(
        ownId,
        {_id, name, link, owner, likes},
        cardSelector,
        handleCardClick,
        handleRemoveButtonClick,
        handleLikeButtonClick,
    ) {
        this._ownId = ownId;
        this._id = _id;
        this._name = name;
        this._link = link;
        this._ownerId = owner._id;
        this._likes = likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleRemoveButtonClick = handleRemoveButtonClick;
        this._handleLikeButtonClick = handleLikeButtonClick;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__title').textContent = this._name;

        const picture = this._element.querySelector('.element__picture');
        picture.alt = this._name;
        picture.src = this._link;

        if (this._ownId === this._ownerId) {
            const trashButton = this._element.querySelector('.element__remove');
            trashButton.classList.remove('element__remove_hidden');
        }

        this._renderLikes();

        return this._element;
    }

    getCardId() {
        return this._id;
    }

    removeCard() {
        this._element.remove();
    }

    isLiked() {
        return this._likes.find(like => like._id === this._ownId);
    }

    updateLikes({likes}) {
        this._likes = likes;
        this._renderLikes();
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
            .addEventListener('click', this._handleRemoveButtonClick);

        this._element.querySelector('.element__like')
            .addEventListener('click', this._handleLikeButtonClick);
    }

    _renderLikes() {
        const heart = this._element.querySelector('.element__like');
        if (this.isLiked()) {
            heart.classList.add('element__like_active');
        } else {
            heart.classList.remove('element__like_active');
        }

        this._element.querySelector('.element__like-counter').textContent = this._likes.length;
    }
}
