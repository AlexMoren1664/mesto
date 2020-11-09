export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._array = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._array.forEach((item) => this._renderer(item));
  }

  setItem(element) {
    this._container.prepend(element);
  }
}
