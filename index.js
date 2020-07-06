let openPopup = document.querySelector ('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput =  document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let formElement = document.querySelector ('.popup__form');

openPopup.addEventListener('click', () => {
    popup.classList.add('popup_open');
})

closePopup.addEventListener('click', () => {
    popup.classList.remove('popup_open');
})

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    
    profileName.textContent = nameInput.value; 
    profileJob.textContent = jobInput.value;

    popup.classList.remove('popup_open');
})
