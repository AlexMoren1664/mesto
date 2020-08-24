import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

const openPopup = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup__close");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const formElement = document.querySelector(".popup__form");
export const popupGallery = document.querySelector(".popup_type_img");
export const popupGalleryImg = document.querySelector(".popup__img");
export const popupGalleryTitle = document.querySelector(".popup__img-title");
const openButtonAdd = document.querySelector(".profile__add-button");
const popupPlace = document.querySelector(".popup_type_add");
const popupFormAdd = document.querySelector(".popup__form_type_add");
const titleInput = document.querySelector(".popup__input_type_title");
const placeInput = document.querySelector(".popup__input_type_link");
const closeGallery = document.querySelector(".popup__close_type_img");
const popupImgClose = document.querySelector(".popup__close_type_card");
const templateCard = document
  .querySelector(".template-card")
  .content.querySelector(".card__grid");
const card = document.querySelector(".card");

// open popup

export function modalOpen(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", escapePopupClose);
  document.addEventListener("mousedown", popupOverlayClose);
}

// close popup

function modalClose(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", escapePopupClose);
  document.removeEventListener("mousedown", popupOverlayClose);
}

// close esc

const escapePopupClose = (event) => {
  if (event.key === "Escape") {
    const modalOpen = document.querySelector(".popup_open");
    modalClose(modalOpen);
  }
};

//  close overlay

const popupOverlayClose = (event) => {
  if (event.target.classList.contains("popup")) {
    modalClose(event.target);
  }
};

// popup edit

function showClick() {
  modalOpen(popup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
openPopup.addEventListener("click", showClick);

function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  modalClose(popup);
}

formElement.addEventListener("submit", formSubmitHandler);

// popup add

openButtonAdd.addEventListener("click", () => {
  modalOpen(popupPlace);
});

closePopup.addEventListener("click", () => {
  modalClose(popup);
});

popupImgClose.addEventListener("click", () => {
  modalClose(popupPlace);
});

closeGallery.addEventListener("click", () => {
  modalClose(popupGallery);
});

function formSubmitAddHandler(event) {
  event.preventDefault();

  const place = new Card(
    { name: titleInput.value, link: placeInput.value },
    templateCard
  );
  const element = place.generateCard();
  card.prepend(element);
  //renderCard({ name: titleInput.value, link: placeInput.value });
  modalClose(popupPlace);
}

popupFormAdd.addEventListener("submit", formSubmitAddHandler);

// Темплейт

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//вставил массив в DOM

initialCards.forEach((item) => {
  const cardArray = new Card(item, templateCard);
  const element = cardArray.generateCard();
  card.prepend(element);
});

const object = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// новые класс валидации
const validatorProfile = new FormValidator(formElement, object);

const validatorAddCard = new FormValidator(popupFormAdd, object);

validatorProfile.enableValidation();
validatorAddCard.enableValidation();
