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
const popUpCardEditor = document.querySelector('.popup_type_card-editor');
const formCardEditor = document.forms['card-data'];
const inputCardTitle = popUpCardEditor.querySelector('#card-title-input');
const inputCardLink = popUpCardEditor.querySelector('#card-link-input');
const popUpImage = document.querySelector('.popup_type_image');
const popUpImageElem = popUpImage.querySelector('.module__image');
const popUpImageCaption = popUpImage.querySelector('.module__caption');
const popUpsList = Array.from(document.querySelectorAll('.popup'));

//Функция переключения состояния кнопки "like"
const handleBtnState = (evt) => {
  evt.target.classList.toggle('card__like-btn_active');
}

//Функция удаления карточки из коллекции
const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
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

//Функция открытия увеличенной картинки в модальном окне
const showBigImage = (evt) => {
  makeImageInPopUP(evt.target.getAttribute('alt'), evt.target.getAttribute('src'));
  openPopUp(popUpImage);
}

//Функция создания картинки с подписью в модальном окне
const makeImageInPopUP = (name, link) => {
  popUpImageElem.src = link;
  popUpImageElem.alt = name;
  popUpImageCaption.textContent = name;
}

//Функция для создания начального набора карточек
const makeInitialCardsSet = images => images.map((item) => {
  const card = new Card(item, '#card', handleBtnState, deleteCard, openPopUp, closePopUp, showBigImage, popUpImage);
  const cardElement = card.generateCard();

  return cardElement;
});

const cardsList = makeInitialCardsSet(initialCards);
cardsContainer.append(...cardsList);

//Функция создающая массив полей ввода формы
const createInputsList = (form, inputClass) => {
  return Array.from(form.querySelectorAll(inputClass));
}

//Функция для запуска валидации форм
const launchFormValidator = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    const formValidator = new FormValidator(config, formElement, createInputsList);
    formValidator.enableValidation();
  })
}

launchFormValidator(setValidation);

//Функция очистки содержания форм и ошибок
const resetFormAndErrors = (form, config) => {
  const { inputSelector, inputErrorClass, errorClass } = config;
  const inputsList = createInputsList(form, inputSelector);
  
  form.reset();
  inputsList.forEach(inputElement => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
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

// Функция изменения данных о пользователе
const handleFormSubmitProfile = () => {
  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  closePopUp(popUpProfile);
}

//Функция добавления карточки на страницу
const addCardImage = () => {
  const newCard = new Card({name: inputCardTitle.value, link: inputCardLink.value}, '#card', handleBtnState, deleteCard, openPopUp, closePopUp, showBigImage, popUpImage);
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
