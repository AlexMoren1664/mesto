export class Card {
  constructor(
    data,
    template,
    userId,
    addLike,
    deleteLike,
    handleCardClick,
    handleCardDelete
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._userId = userId._id;
    this._ownerId = data.owner._id;
    this._deleteLike = deleteLike;
    this._addLike = addLike;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = this._template.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const buttonDelete = this._element.querySelector(".card__delete");
    if (this._ownerId === this._userId) {
      buttonDelete.classList.add("card__delete_type_hidden");
    }
    if (this._likes.some((item) => item._id === this._userId)) {
      this._element
        .querySelector(".card__like")
        .classList.add("card__like_active");
    }

    this._counter = this._element.querySelector(".card__counter");
    this._counter.textContent = this._likes.length;
    const cardImage = this._element.querySelector(".card__img"); 
    const cardTitle = this._element.querySelector(".card__heading");
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }

  toggleLike() {
    this._element
    .querySelector(".card__like")
    .classList.toggle("card__like_active");
  }

  counterLike(data) {
    const counter = this._element.querySelector('.card__counter')
    counter.textContent = data.length;
  }
  
  _likeActive() {
    const like = this._element.querySelector(".card__like")
    if (like.classList.contains("card__like_active")) {
      this._deleteLike(this._cardId)
    } else {
      this._addLike(this._cardId)
    }
  }

  cardDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    if (this._ownerId === this._userId) {
      this._element
        .querySelector(".card__delete")
        .addEventListener("click", () => {
          this._handleCardDelete(this._element);
        });
    }
    this._element.querySelector(".card__like").addEventListener("click", () => {
      this._likeActive();
    });
    this._element.querySelector(".card__img").addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
