export default class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(this._renderer);
    }

    addItem(element, addFirst) {
        if (addFirst) {
            this._container.prepend(element);
        } else {
            this._container.append(element);
        }
    }
}
