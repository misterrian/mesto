export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(this._renderer);
    }

    addItem(element, addFirst) {
        if (addFirst) {
            this._container.prepend(element);
        } else {
            this._container.append(element);
        }
    }
}
