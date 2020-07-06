const openPopup = document.querySelector ('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput =  document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector ('.popup__form');

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
