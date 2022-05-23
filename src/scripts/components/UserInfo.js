export default class UserInfo {
    constructor(nameSelector, aboutSelector, avatarSelector) {
        this._id = 0;
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getOwnId() {
        return this._id;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }

    setUserInfo({_id, name, about}) {
        this._id = _id;
        this._name.textContent = name;
        this._about.textContent = about;
    }

    getAvatar() {
        return this._avatar.src;
    }

    setAvatar(avatar) {
        this._avatar.src = avatar;
    }
}