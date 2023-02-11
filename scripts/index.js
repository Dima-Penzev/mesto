const editorBtn = document.querySelector('.user__edit');
const userName = document.querySelector('.user__name');
const userActivity = document.querySelector('.user__activity');
const cardsContainer = document.querySelector('.cards-container');
const addCardBtn = document.querySelector('.user__add-card');
const popUpProfile = document.querySelector('.popup_type_profile');
const formProfile = popUpProfile.querySelector('#form-profile');
const inputName = popUpProfile.querySelector('#name-input');
const inputActivity = popUpProfile.querySelector('#activity-input');
const btnEditProfile = popUpProfile.querySelector('.popup__button');
const popUpCardEditor = document.querySelector('.popup_type_card-editor');
const formCardEditor = popUpCardEditor.querySelector('#form-card-editor');
const inputCardTitle = popUpCardEditor.querySelector('#card-title-input');
const inputCardLink = popUpCardEditor.querySelector('#card-link-input');
const btnAddCard = popUpCardEditor.querySelector('.popup__button');
const popUpImage = document.querySelector('.popup_type_image');
const popUpImageElem = popUpImage.querySelector('.module__image');
const popUpImageCaption = popUpImage.querySelector('.module__caption');
const cardTemplate = document.querySelector('#card').content;
const popUpOverlayList = document.querySelectorAll('.popup');

//Функция создания карточки с изображением и названием
const createCard = imageData => {
  const cardMarkup = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardMarkup.querySelector('.card__image');
  cardImage.src = imageData.link;
  cardImage.alt = imageData.name;
  cardMarkup.querySelector('.card__text').textContent = imageData.name;

  return cardMarkup;
}

//Функция для создания начального набора карточек
const makeInitialCardsSet = images => images.map(createCard);

const cardsList = makeInitialCardsSet(initialCards);
cardsContainer.append(...cardsList);

//Функция закрытия модального окна при нажатии на "Overlay", клавишу "Escape", крестик
const closecanceledPopUp = (evt) => {
  const { formSelector } = setValidation;
  const popUpList = Array.from(document.querySelectorAll('.popup'));

  popUpList.forEach(popUp => {
    const formElement = popUp.querySelector(formSelector);

    if(evt.target.classList.contains('popup') || 
      evt.target.classList.contains('popup__close') || 
      evt.code === "Escape") {
    
        if(formElement) {
          resetFormAndErrors(formElement, setValidation);
        }
          closePopUp(popUp);
      }
  })
}

// Функция открытия модального окна
const openPopUp = (popUp) => {
  popUp.classList.add('popup_opened');
  popUp.addEventListener('click', closecanceledPopUp);
  window.addEventListener('keydown', closecanceledPopUp);
}

// Функция закрытия модального окна
const closePopUp = (popUp) => {
    popUp.classList.remove('popup_opened');
    popUp.removeEventListener('click', closecanceledPopUp);
    window.removeEventListener('keydown', closecanceledPopUp);
  }

// Функция изменения данных о пользователе
const handleFormSubmitProfile = (evt) => {
  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  closePopUp(popUpProfile);
  formProfile.reset();
}

//Функция добавления карточки на страницу
const addCardImage = (evt) => {
  const newCard = createCard({name: inputCardTitle.value, link: inputCardLink.value});
  cardsContainer.prepend(newCard);
  closePopUp(popUpCardEditor);
  formCardEditor.reset();
}

//Функция создания картинки с подписью в модальном окне
const makeImageInPopUP = (name, link) => {
  popUpImageElem.src = link;
  popUpImageElem.alt = name;
  popUpImageCaption.textContent = name;
}

//Функция обрабатывания событий списка карточек
const handleCardsList = (evt) => {

  if(evt.target.classList.contains('card__image')) {
    makeImageInPopUP(evt.target.getAttribute('alt'), evt.target.getAttribute('src'));
    openPopUp(popUpImage);
    return; 
  }

  if(evt.target.classList.contains('card__like-btn')) {
    evt.target.classList.toggle('card__like-btn_active');
    return;
  }

  if(evt.target.classList.contains('card__delete')) {
    evt.target.closest('.card').remove();
  }
}

//Функция сбрасывания содержания форм и ошибок
const resetFormAndErrors = (form, config) => {
  const { inputSelector } = config;
  const inputList = createInputList(form, inputSelector);
  
  form.reset();
  inputList.forEach(input => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    hideInputError(errorElement, input, config);
  })
};

editorBtn.addEventListener('click', () => {
  openPopUp(popUpProfile);
  inputName.value = userName.textContent;
  inputActivity.value = userActivity.textContent;
  enableButton(btnEditProfile, setValidation.inactiveButtonClass);
  }
);
addCardBtn.addEventListener('click', () => {
  openPopUp(popUpCardEditor);
  disabledButton (btnAddCard, setValidation.inactiveButtonClass);
});
formProfile.addEventListener('submit', handleFormSubmitProfile);
formCardEditor.addEventListener('submit', addCardImage);
cardsContainer.addEventListener('click', handleCardsList);
