export default class Api {
    constructor({userUrl, baseUrl, headers}) {
        this._userUrl = userUrl;
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo() {
        return fetch(`${this._userUrl}`, {
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    saveAvatar(avatarData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatarData),
        })
            .then(res => this._checkResponse(res));
    }

    saveProfile(profileData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(profileData),
        })
            .then(res => this._checkResponse(res));
    }

    addCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(cardData),
        })
            .then(res => this._checkResponse(res));
    }

    removeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    _checkResponse(response) {
        return response.ok
            ? response.json()
            : Promise.reject(`Ошибка: ${response.status}, ${response.statusText}`);
    }
}