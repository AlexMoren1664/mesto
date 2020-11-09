import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const popupImage = this._element.querySelector(".popup__img");
    const popupImageTitle = this._element.querySelector(".popup__img-title");
    popupImage.src = link;
    popupImageTitle.textContent = name;
    popupImageTitle.alt = name;
    super.open();
  }
}