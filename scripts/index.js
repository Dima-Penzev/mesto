import { initialCards } from "./initial-cards.js";
const editorBtn = document.querySelector('.user__edit');
const userName = document.querySelector('.user__name');
const userActivity = document.querySelector('.user__activity');
const cardsContainer = document.querySelector('.cards-container');
const cardTemplate = document.querySelector('#card').content;
const addCardBtn = document.querySelector('.user__add-card');
const popUp = document.querySelector('.popup_type_profile');
const closePopUpBtn =popUp.querySelector('.popup__close');
const formProfile = popUp.querySelector('#form-profile');
const inputName = popUp.querySelector('#name');
const inputActivity = popUp.querySelector('#activity');

//Функция для создания начального набора карточек
const makeInitialCardsSet = (images) => {
  const cardsSet = [];
  
  images.map(image => {
    const cardMarkup = cardTemplate.querySelector('.card').cloneNode(true);
    cardMarkup.querySelector('.card__image').src=`${image.link}`;
    cardMarkup.querySelector('.card__image').alt=`${image.name}`;
    cardMarkup.querySelector('.card__text').textContent=`${image.name}`;

    cardsSet.push(cardMarkup);
  })

  return cardsSet;
}

cardsContainer.append(...makeInitialCardsSet(initialCards))

// Функция открытия окна редактирования
const openPopUp = () => {
  inputName.value = userName.textContent;
  inputActivity.value = userActivity.textContent;
  popUp.classList.add('popup_opened');
}

// Функция закрытия окна редактирования
const closePopUp = () => {
  popUp.classList.remove('popup_opened');
}

// Функция изменения данных о пользователе
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  closePopUp();
}

editorBtn.addEventListener('click', openPopUp);
closePopUpBtn.addEventListener('click', closePopUp);
formProfile.addEventListener('submit', handleFormSubmit);
addCardBtn.addEventListener('click', () => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src='https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
  newCard.querySelector('.card__image').alt='Архыз';
  newCard.querySelector('.card__text').textContent='Архыз';
  cardsContainer.prepend(newCard);
})