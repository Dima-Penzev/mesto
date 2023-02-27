const editorBtn = document.querySelector('.user__edit');
const userName = document.querySelector('.user__name');
const userActivity = document.querySelector('.user__activity');
const cardsContainer = document.querySelector('.cards-container');
const addCardBtn = document.querySelector('.user__add-card');
const popUpProfile = document.querySelector('.popup_type_profile');
const formProfile = document.forms['profile-data'];
const inputName = popUpProfile.querySelector('#name-input');
const inputActivity = popUpProfile.querySelector('#activity-input');
const btnEditProfile = popUpProfile.querySelector('.popup__button');
const popUpCardEditor = document.querySelector('.popup_type_card-editor');
const formCardEditor = document.forms['card-data'];
const inputCardTitle = popUpCardEditor.querySelector('#card-title-input');
const inputCardLink = popUpCardEditor.querySelector('#card-link-input');
const btnAddCard = popUpCardEditor.querySelector('.popup__button');
const popUpImage = document.querySelector('.popup_type_image');
const popUpImageElem = popUpImage.querySelector('.module__image');
const popUpImageCaption = popUpImage.querySelector('.module__caption');
const cardTemplate = document.querySelector('#card').content;
const popUpsList = Array.from(document.querySelectorAll('.popup'));

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

///////////////////////////////////////////////////////////////////////////////////

class Card {

  constructor(data, templateSelector) {
    this._link = data.link;
    this._text = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._text;
    this._element.querySelector('.card__text').textContent = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup();
      this._makeImageInPopup();
    });
    this._element.querySelector('.card__like-btn').addEventListener('click', this._handleLikeBtn);
    this._element.querySelector('.card__delete').addEventListener('click', this._deleteCard);
  }

  _handleOpenPopup() {
    document.querySelector('.popup_type_image').classList.add('popup_opened');
    document.querySelector('.popup_type_image').addEventListener('mousedown', this._handleClosePopup);
    window.addEventListener('keydown', this._handleClosePopup);
  }

  _handleClosePopup(evt) {
    if(evt.target.classList.contains('popup') || 
      evt.target.classList.contains('popup__close') || 
      evt.code === CLOSE_BTN) {

      document.querySelector('.popup_type_image').classList.remove('popup_opened');
      document.querySelector('.popup_type_image').removeEventListener('mousedown', this._handleClosePopup);
      window.removeEventListener('keydown', this._handleClosePopup);
    }
  }

  _handleLikeBtn(evt) {
    evt.target.classList.toggle('card__like-btn_active');
  }

  _deleteCard(evt) {
    evt.target.closest('.card').remove();
  }

  _makeImageInPopup() {
    document.querySelector('.module__image').src = this._link;
    document.querySelector('.module__image').alt = this._text;
    document.querySelector('.module__caption').textContent = this._text;
  }
}

/////////////////////////////////////////////////////////////////////////

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
  const { inputSelector } = config;
  const inputsList = createInputsList(form, inputSelector);
  
  form.reset();
  inputsList.forEach(input => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    hideInputError(errorElement, input, config);
  })
};

//Функция закрытия модального окна при нажатии на "Overlay", клавишу "Escape", крестик
// const closeUnsubmittedPopUp = (evt) => {
//   popUpsList.forEach(popUp => {

//     if(evt.target.classList.contains('popup') || 
//       evt.target.classList.contains('popup__close') || 
//       evt.code === CLOSE_BTN) {

//         closePopUp(popUp);
//       }
//   })
// }

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
