const openPopup = document.querySelector ('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput =  document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector ('.popup__form');
const popupGallery = document.querySelector('.popup_type_img');
const popupGalleryImg = document.querySelector('.popup__img');
const popupGalleryTitle = document.querySelector('.popup__img-title');
const openButtonAdd = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup_type_add');
const popupFormAdd = document.querySelector('.popup__form_type_add');
const titleInput = document.querySelector('.popup__input_type_title');
const placeInput = document.querySelector('.popup__input_type_link');
const closeGallery = document.querySelector('.popup__close_type_img');
const popupImgClose = document.querySelector('.popup__close_type_card');
const templateCard = document.querySelector('.template-card').content.querySelector('.card__grid');
let cardElements = {};
const card = document.querySelector('.card');

// popup edit
function showClick() {
    popup.classList.add('popup_open'); 
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

openPopup.addEventListener('click', showClick);

function popupClose() {
    popup.classList.remove('popup_open');
}

closePopup.addEventListener('click', popupClose);

//close overlay

  const popupOverlayClose = (event) =>  {
    if (event.target.classList.contains('popup')) {
      popupClose();
      closePopupPlace();
      closePopupGallery();
    }
  }

  popup.addEventListener('mousedown', popupOverlayClose);
  popupPlace.addEventListener('mousedown', popupOverlayClose);
  popupGallery.addEventListener('click', popupOverlayClose);

// close esc

  const escapePopupClose = (evt) => {
    if (evt.key ==='Escape') {
      popupClose();
      closePopupPlace();
      closePopupGallery();
    }
  };

  document.addEventListener('keydown', escapePopupClose);
  

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value; 
    profileJob.textContent = jobInput.value;
    popup.classList.remove('popup_open');
}

formElement.addEventListener('submit', formSubmitHandler );

// popup add

function showClickPlace() {
    popupPlace.classList.add('popup_open'); 
}

openButtonAdd.addEventListener('click', showClickPlace);


function closePopupPlace() {
    popupPlace.classList.remove('popup_open'); 
}

popupImgClose.addEventListener('click', closePopupPlace);

function formSubmitAddHandler(event) {
  event.preventDefault();

renderCard({name: titleInput.value, link: placeInput.value});
popupPlace.classList.remove('popup_open')
}

popupFormAdd.addEventListener('submit', formSubmitAddHandler );

// Темплейт
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((data) => {
  renderCard(data);
})

function renderCard(data) {
  cardElements = templateCard.cloneNode(true);
  const cardImage = cardElements.querySelector('.card__img');
  const cardTitle = cardElements.querySelector('.card__heading');
  const cardLike = cardElements.querySelector('.card__like');
  const cardDelete = cardElements.querySelector('.card__delete');

  // like
function likeActive() {
  cardLike.classList.toggle('card__like_active')
} 

  cardLike.addEventListener('click', () => {
    likeActive();
  })

// delete card

function cardDeleteButton() {
  cardDelete.closest('.card__grid').remove();
}

cardDelete.addEventListener('click', () => {
  cardDeleteButton();
});

// open popup gallery

function showClickGallery() {
  popupGallery.classList.add('popup_open'); 
  popupGalleryImg.src = data.link;
  popupGalleryTitle.textContent = data.name;
  popupGalleryTitle.alt = data.name;
}

cardImage.addEventListener('click', showClickGallery);

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  card.prepend(cardElements);
  return cardElements;
}

// closed popup Gallery

function closePopupGallery() {
  popupGallery.classList.remove('popup_open'); 
}

closeGallery.addEventListener('click', closePopupGallery);