import Popup from "./Popup.js";

export class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._element = document.querySelector(popupSelector);
  }
  setConfirmDelete(fn) {
    this._confirmDelete = fn;
    console.log(this);
  }

  setEventListeners() {
    this._form = this._element.querySelector(".popup__form");
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._confirmDelete();
    });
    super.setEventListeners();
  }
}
