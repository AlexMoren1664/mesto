import {
    modalOpen,
    popupGallery,
    popupGalleryImg,
    popupGalleryTitle,
  } from "./index.js";
  
  export class Card {
    constructor(data, template) {
      this._name = data.name;
      this._link = data.link;
      this._template = template;
    }
  
    _getTemplate() {
      const cardElement = this._template.cloneNode(true);
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      const cardImage = this._element.querySelector(".card__img");
      const cardTitle = this._element.querySelector(".card__heading");
  
      this._setEventListeners();
  
      cardTitle.textContent = this._name;
      cardImage.src = this._link;
      cardImage.alt = this._name;
  
      return this._element;
    }
  
    //лайк
    _likeActive() {
      this._element
        .querySelector(".card__like")
        .classList.toggle("card__like_active");
    }
  
    //удаление карточки
    _cardDeleteButton() {
      this._element
        .querySelector(".card__delete")
        .closest(".card__grid")
        .remove();
    }
  
    //Попап с картинкой
  
    _showClickGallery() {
      popupGalleryImg.src = this._link;
      popupGalleryTitle.textContent = this._name;
      popupGalleryTitle.alt = this._name;
      modalOpen(popupGallery);
    }
  
    _setEventListeners() {
      this._element
        .querySelector(".card__delete")
        .addEventListener("click", () => {
          this._cardDeleteButton();
        });
  
      this._element.querySelector(".card__like").addEventListener("click", () => {
        this._likeActive();
      });
  
      this._element.querySelector(".card__img").addEventListener("click", () => {
        this._showClickGallery();
      });
    }
  }
  