import { initialCards, setValidation, CLOSE_BTN} from './constants.js';
import  { Card }  from './Card.js';
import { FormValidator } from './FormValidator.js';
const editorBtn = document.querySelector('.user__edit');
const userName = document.querySelector('.user__name');
const userActivity = document.querySelector('.user__activity');
const cardsContainer = document.querySelector('.cards-container');
const addCardBtn = document.querySelector('.user__add-card');
const popUpProfile = document.querySelector('.popup_type_profile');
const formProfile = document.forms['profile-data'];
const inputName = popUpProfile.querySelector('#name-input');
const inputActivity = popUpProfile.querySelector('#activity-input');
// const btnEditProfile = popUpProfile.querySelector('.popup__button');
const popUpCardEditor = document.querySelector('.popup_type_card-editor');
const formCardEditor = document.forms['card-data'];
const inputCardTitle = popUpCardEditor.querySelector('#card-title-input');
const inputCardLink = popUpCardEditor.querySelector('#card-link-input');
// const btnAddCard = popUpCardEditor.querySelector('.popup__button');
// const popUpImage = document.querySelector('.popup_type_image');
// const popUpImageElem = popUpImage.querySelector('.module__image');
// const popUpImageCaption = popUpImage.querySelector('.module__caption');
// const cardTemplate = document.querySelector('#card').content;
const popUpsList = Array.from(document.querySelectorAll('.popup'));

const launchFormValidator = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
  })
}

launchFormValidator(setValidation);

//Функция открытия увеличенной картинки в модальном окне
// const showBigImage = (evt) => {
//   makeImageInPopUP(evt.target.getAttribute('alt'), evt.target.getAttribute('src'));
//   openPopUp(popUpImage);
// }

//Функция удаления карточки из коллекции
// const deleteCard = (targetClass, evt) => {
//   evt.target.closest(targetClass).remove();
// }

//Функция переключения состояния кнопки "like"
// const handleBtnState = (stateClass, evt) => {
//   evt.target.classList.toggle(stateClass);
// }

//Функция создания карточки с изображением и названием
// const createCard = imageData => {
//   const cardMarkup = cardTemplate.querySelector('.card').cloneNode(true);
//   const cardImage = cardMarkup.querySelector('.card__image');
//   const btnDeleteCard = cardMarkup.querySelector('.card__delete');
//   const btnLikeCard = cardMarkup.querySelector('.card__like-btn');

//   cardImage.src = imageData.link;
//   cardImage.alt = imageData.name;
//   cardMarkup.querySelector('.card__text').textContent = imageData.name;

//   cardImage.addEventListener('click', showBigImage);
//   btnDeleteCard.addEventListener('click', (evt) => {
//     deleteCard('.card', evt);
//   });
//   btnLikeCard.addEventListener('click', (evt) =>{
//     handleBtnState('card__like-btn_active', evt);
//   });

//   return cardMarkup;
// }

//Функция для создания начального набора карточек
const makeInitialCardsSet = images => images.map((item) => {
  const card = new Card(item, '#card');
  const cardElement = card.generateCard();

  return cardElement;
});

const cardsList = makeInitialCardsSet(initialCards);
cardsContainer.append(...cardsList);

//Функция очистки содержания форм и ошибок
const resetFormAndErrors = (form, config) => {
  const inputsList = Array.from(form.querySelectorAll(config.inputSelector));
  
  form.reset();
  inputsList.forEach(inputElement => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  })
};

//Функция закрытия модального окна при нажатии на "Overlay", клавишу "Escape", крестик
const closeUnsubmittedPopUp = (evt) => {
  popUpsList.forEach(popUp => {

    if(evt.target.classList.contains('popup') || 
      evt.target.classList.contains('popup__close') || 
      evt.code === CLOSE_BTN) {

        closePopUp(popUp);
      }
  })
}

// Функция открытия модального окна
const openPopUp = (popUp) => {
  popUp.classList.add('popup_opened');
  popUp.addEventListener('mousedown', closeUnsubmittedPopUp);
  window.addEventListener('keydown', closeUnsubmittedPopUp);
}

// Функция закрытия модального окна
const closePopUp = (popUp) => {
    popUp.classList.remove('popup_opened');
    popUp.removeEventListener('mousedown', closeUnsubmittedPopUp);
    window.removeEventListener('keydown', closeUnsubmittedPopUp);
  }

// Функция изменения данных о пользователе
const handleFormSubmitProfile = () => {
  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  closePopUp(popUpProfile);
}

//Функция добавления карточки на страницу
const addCardImage = () => {
  const newCard = new Card({name: inputCardTitle.value, link: inputCardLink.value}, '#card');
  const newCardElement = newCard.generateCard();
  cardsContainer.prepend(newCardElement);
  closePopUp(popUpCardEditor);
  formCardEditor.reset();
}

editorBtn.addEventListener('click', () => {
  resetFormAndErrors(formProfile, setValidation);
  openPopUp(popUpProfile);
  inputName.value = userName.textContent;
  inputActivity.value = userActivity.textContent;
  }
);
addCardBtn.addEventListener('click', () => {openPopUp(popUpCardEditor)});
formProfile.addEventListener('submit', handleFormSubmitProfile);
formCardEditor.addEventListener('submit', addCardImage);
