const editorBtn = document.querySelector('.user__edit');
const userName = document.querySelector('.user__name');
const userActivity = document.querySelector('.user__activity');
const cardsContainer = document.querySelector('.cards-container');
const addCardBtn = document.querySelector('.user__add-card');
const popUpProfile = document.querySelector('.popup_type_profile');
const btnClosePopUpProfile =popUpProfile.querySelector('.popup__close');
const formProfile = popUpProfile.querySelector('#form-profile');
const inputName = popUpProfile.querySelector('#name');
const inputActivity = popUpProfile.querySelector('#activity');
const popUpCardEditor = document.querySelector('.popup_type_card-editor');
const btnClosePopUpCardEditor =popUpCardEditor.querySelector('.popup__close');
const formCardEditor = popUpCardEditor.querySelector('#form-card-editor');
const inputCardTitle = popUpCardEditor.querySelector('#card-title');
const inputCardLink = popUpCardEditor.querySelector('#card-link');
const popUpImage = document.querySelector('.popup_type_image');
const btnClosePopUpImage = popUpImage.querySelector('.popup__close');
const cardTemplate = document.querySelector('#card').content;

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

const cardsList = makeInitialCardsSet(initialCards);
cardsContainer.append(...cardsList);

// Функция открытия модального окна
const openPopUp = (block) => {
  block.classList.add('popup_opened');
  
  if(block.classList.contains('popup_type_profile')) {
    inputName.value = userName.textContent;
    inputActivity.value = userActivity.textContent;
  }
}

// Функция закрытия модального окна
const closePopUp = (block) => {
  block.classList.remove('popup_opened');
}

// Функция изменения данных о пользователе
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  closePopUp(popUpProfile);
  formProfile.reset();
}

//Функция добавления карточки на страницу
const addCardImage = (evt) => {
  evt.preventDefault();
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src=`${inputCardLink.value}`;
  newCard.querySelector('.card__image').alt=`${inputCardTitle.value}`;
  newCard.querySelector('.card__text').textContent=`${inputCardTitle.value}`;
  cardsContainer.prepend(newCard);
  closePopUp(popUpCardEditor);
  formCardEditor.reset();
}

//Функция создания картинки с подписью в модальном окне
const makeImageInPopUP = (evt) => {
    popUpImage.querySelector('.module__image').src = `${evt.target.getAttribute('src')}`;
    popUpImage.querySelector('.module__image').alt = `${evt.target.getAttribute('alt')}`;
    popUpImage.querySelector('.module__caption').textContent = `${evt.target.getAttribute('alt')}`;
}

//Функция обрабатывания событий списка карточек
const handleCardsList =(evt) => {

  if(evt.target.classList.contains('card__image')) {
    makeImageInPopUP(evt);
    openPopUp(popUpImage); 
  }

  if(evt.target.classList.contains('card__like-btn')) {
    if(!evt.target.classList.contains('card__like-btn_active')) {
      evt.target.classList.add('card__like-btn_active')
    } else {
      evt.target.classList.remove('card__like-btn_active')
    }
  }

  if(evt.target.classList.contains('card__delete')) {
    evt.target.parentNode.remove();
  }
}

editorBtn.addEventListener('click', () => {openPopUp(popUpProfile)});
btnClosePopUpProfile.addEventListener('click', () => {closePopUp(popUpProfile)});
addCardBtn.addEventListener('click', () => {openPopUp(popUpCardEditor)})
btnClosePopUpCardEditor.addEventListener('click', () => {closePopUp(popUpCardEditor)});
btnClosePopUpImage.addEventListener('click', () => {closePopUp(popUpImage)});
formProfile.addEventListener('submit', handleFormSubmit);
formCardEditor.addEventListener('submit', addCardImage)
cardsContainer.addEventListener('click', handleCardsList);
