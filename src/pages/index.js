import "./index.css";
import { initialCards, object } from "../components/data.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithDelete } from "../components/PopupWithDelete.js";
import UserInfo from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const editButton = document.querySelector(".profile__edit-button");
const avatarButton = document.querySelector(".profile__button");
const popupProfileCloseBtn = document.querySelector(
  ".popup__close_type_profile"
);
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profileAvatar = document.querySelector(".profile__img");
const popupFormEdit = document.querySelector(".popup__form_type_edit");
const popupFormAdd = document.querySelector(".popup__form_type_add");
const popupFormAvatar = document.querySelector(".popup__form_type_avatar");
const openButtonAdd = document.querySelector(".profile__add-button");
const popupGalleryCloseBtn = document.querySelector(".popup__close_type_img");
const popupCardCloseBtn = document.querySelector(".popup__close_type_card");
const templateCard = document
  .querySelector(".template-card")
  .content.querySelector(".card__grid");

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "7bd94261-5a21-4877-bf79-305be7d353ce",
    "Content-Type": "application/json",
  },
});

// console.log(api.getUserInfo())
// console.log(api.getInitialCards())
export const userId = {};
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    userId._id = userInfo._id;
    console.log(userId);
    userProfileInfo.setUserInfo(userInfo);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

// экземпляры класс валидации

const validatorProfile = new FormValidator(popupFormEdit, object);
const validatorAddCard = new FormValidator(popupFormAdd, object);
const validatorAvatar = new FormValidator(popupFormAvatar, object);

validatorProfile.enableValidation();
validatorAddCard.enableValidation();
validatorAvatar.enableValidation();

// отрисовка карточек

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item);
    },
  },
  ".card"
);

//удаление

const popupDelete = new PopupWithDelete(".popup_type_deleting");
popupDelete.setEventListeners();

// попап с картинкой

const popupImageClass = new PopupWithImage(".popup_type_img");
popupGalleryCloseBtn.addEventListener("click", () => popupImageClass.close());

// функция создания карточки

const createCard = (data) => {
  const card = new Card(
    data,
    templateCard,
    userId,
    addLike,
    deleteLike,
    openImagePopup,
    deleteCardHandle
  );
  const element = card.generateCard();
  cardList.setItem(element);

  function openImagePopup(name, link) {
    popupImageClass.open(name, link);
  }

  function deleteCardHandle() {
    popupDelete.open();
    popupDelete.setConfirmDelete(() => {
      api
        .deleteCard(data._id)
        .then(() => {
          console.log(data._id);
          card.cardDeleteButton(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function addLike() {
    api
      .putLike(data._id)
      .then(() => {
        console.log("addlike");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteLike() {
    api
      .deleteLike(data._id)
      .then(() => {
        console.log("deletelike");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const addPopup = new PopupWithForm(".popup_type_add", (res) => {
  renderAddLoading(true, buttonAddCard);
  api
    .getNewCard(res)
    .then((res) => {
      createCard(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderAddLoading(false, buttonAddCard);
    });
});

addPopup.setEventListeners();

openButtonAdd.addEventListener("click", () => {
  addPopup.open();
  validatorAddCard.buttonDisable();
});

popupCardCloseBtn.addEventListener("click", () => addPopup.close());

const user = {
  name: profileName,
  about: profileJob,
  avatar: profileAvatar,
};

const userProfileInfo = new UserInfo(user);
const userProfile = userProfileInfo.getUserInfo();
editButton.addEventListener("click", () => {
  profileName.value = userProfile.name;
  profileJob.value = userProfile.about;
  popupFormProfile.open();
});

const submitForm = (res) => {
  renderLoading(true, buttonProfile);
  api
    .editUserInfo(res)
    .then((res) => {
      console.log(res);
      userProfileInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, buttonProfile);
    });
};

const popupFormProfile = new PopupWithForm(".popup_type_edit", submitForm);
popupFormProfile.setEventListeners();

popupProfileCloseBtn.addEventListener("click", () => {
  popupFormProfile.close();
});

// аватар

const submitFormAvatar = (res) => {
  renderLoading(true, buttonAvatar);
  api
    .updateAvatar(res)
    .then((res) => {
      userProfileInfo.setUserInfo(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, buttonAvatar);
    });
};

const popupFormWithAvatar = new PopupWithForm(
  ".popup_type_avatar",
  submitFormAvatar
);
popupFormWithAvatar.setEventListeners();

avatarButton.addEventListener("click", () => {
  popupFormWithAvatar.open();
});

const buttonAvatar = document.querySelector(".popup__button_type_avatar");
const buttonProfile = document.querySelector(".popup__button_type_profile");
const buttonAddCard = document.querySelector(".popup__button_type_card");

const renderLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранинить";
  }
};
const renderAddLoading = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Создать";
  }
};
