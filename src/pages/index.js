import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const editButton = document.querySelector(".profile__edit-button");
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
  {
    name: "Бахман",
    link: "https://image.tmdb.org/t/p/original/wuzu1jHvdc3Tff7dO1Fl5okAkWI.jpg",
  },
];

const object = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// экземпляры класс валидации

const validatorProfile = new FormValidator(formElement, object);
const validatorAddCard = new FormValidator(popupFormAdd, object);

validatorProfile.enableValidation();
validatorAddCard.enableValidation();

// отрисовка карточек

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const openImagePopup = (name, link) => {
        popupImageClass.open(name, link);
      };
      const cardArray = new Card(item, templateCard, openImagePopup);
      const element = cardArray.generateCard();
      cardList.setItem(element);
    },
  },
  ".card"
);

cardList.renderItems();

// попап с картинкой

const popupImageClass = new PopupWithImage(".popup_type_img");

const openImagePopup = (name, link) => {
  popupImageClass.open(name, link);
};

closeGallery.addEventListener("click", () => popupImageClass.close());

// попап с формами

const addPopup = new PopupWithForm(".popup_type_add", () => {
  const place = new Card(
    { name: titleInput.value, link: placeInput.value },
    templateCard,
    openImagePopup
  );
  const element = place.generateCard();
  card.prepend(element);
  addPopup.close();
});

addPopup.setEventListeners();

openButtonAdd.addEventListener("click", () => addPopup.open());

popupImgClose.addEventListener("click", () => addPopup.close());

const user = {
  name: nameInput,
  job: jobInput,
};

const userProfileInfo = new UserInfo(user);

editButton.addEventListener("click", () => {
  const userProfile = userProfileInfo.getUserInfo();
  profileName.value = userProfile.name;
  profileJob.value = userProfile.job;
  popupFormProfile.open();
});

function submitForm(item) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  userProfileInfo.setUserInfo(item);
}

const popupFormProfile = new PopupWithForm(".popup_type_edit", submitForm);
popupFormProfile.setEventListeners();

closePopup.addEventListener("click", () => {
  popupFormProfile.close();
});
