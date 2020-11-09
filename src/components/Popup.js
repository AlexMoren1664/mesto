export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._element.classList.add("popup_open");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleOverlayClose);
  }

  close() {
    this._element.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleOverlayClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
      console.log("esc");
    }
  }

  _handleOverlayClose(event) {
    if (event.target.classList.contains("popup")) {
      this.close();
      console.log("overl");
    }
  }

  setEventListeners() {
    this._element
      .querySelector(".popup__close")
      .addEventListener("click", this.close.bind(this));
  }
}
