import "./index.css";
import { initialCards, object } from "../components/data.js"
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const editButton = document.querySelector(".profile__edit-button");
const popupProfileCloseBtn = document.querySelector(".popup__close_type_profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupFormEdit = document.querySelector(".popup__form_type_edit");
const popupFormAdd = document.querySelector(".popup__form_type_add");
const openButtonAdd = document.querySelector(".profile__add-button");
const titleInput = document.querySelector(".popup__input_type_title");
const placeInput = document.querySelector(".popup__input_type_link");
const popupGalleryCloseBtn = document.querySelector(".popup__close_type_img");
const popupCardCloseBtn = document.querySelector(".popup__close_type_card");
const templateCard = document
  .querySelector(".template-card")
  .content.querySelector(".card__grid");

// экземпляры класс валидации

const validatorProfile = new FormValidator(popupFormEdit, object);
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
      createCard(item, templateCard, openImagePopup)
    },
  },
  ".card"
);

cardList.renderItems();

// функция создания карточки

function createCard(data, template, handleCardClick) {
  const card = new Card (data, template, handleCardClick)
  const element = card.generateCard();
  cardList.setItem(element);
}
// попап с картинкой

const popupImageClass = new PopupWithImage(".popup_type_img");

const openImagePopup = (name, link) => {
  popupImageClass.open(name, link);
};

popupGalleryCloseBtn.addEventListener("click", () => popupImageClass.close());

// попап с формами

const addPopup = new PopupWithForm(".popup_type_add", () => {
  createCard({ name: titleInput.value, link: placeInput.value },
    templateCard,
    openImagePopup);
  addPopup.close();
});

addPopup.setEventListeners();

openButtonAdd.addEventListener("click", () => {
  addPopup.open();
  validatorAddCard.buttonDisable();
});

popupCardCloseBtn.addEventListener("click", () => addPopup.close());

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

popupProfileCloseBtn.addEventListener("click", () => {
  popupFormProfile.close();
});
