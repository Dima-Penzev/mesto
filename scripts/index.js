const editorBtn = document.querySelector('.user__edit');
const userName = document.querySelector('.user__name');
const userActivity = document.querySelector('.user__activity');
const cardsContainer = document.querySelector('.cards-container');
const addCardBtn = document.querySelector('.user__add-card');
const popUpProfile = document.querySelector('.popup_type_profile');
const btnClosePopUpProfile =popUpProfile.querySelector('.popup__close');
const formProfile = popUpProfile.querySelector('#form-profile');
const inputName = popUpProfile.querySelector('#name-input');
const inputActivity = popUpProfile.querySelector('#activity-input');
const popUpCardEditor = document.querySelector('.popup_type_card-editor');
const btnClosePopUpCardEditor =popUpCardEditor.querySelector('.popup__close');
const formCardEditor = popUpCardEditor.querySelector('#form-card-editor');
const inputCardTitle = popUpCardEditor.querySelector('#card-title-input');
const inputCardLink = popUpCardEditor.querySelector('#card-link-input');
const btnAddCard = popUpCardEditor.querySelector('.popup__button');
const popUpImage = document.querySelector('.popup_type_image');
const popUpImageElem = popUpImage.querySelector('.module__image');
const popUpImageCaption = popUpImage.querySelector('.module__caption');
const btnClosePopUpImage = popUpImage.querySelector('.popup__close');
const cardTemplate = document.querySelector('#card').content;

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

// Функция открытия модального окна
const openPopUp = (popUp) => {
  popUp.classList.add('popup_opened');
}

// Функция закрытия модального окна
const closePopUp = (popUp) => {
  popUp.classList.remove('popup_opened');
}

// Функция изменения данных о пользователе
const handleFormSubmitProfile = (evt) => {
  // evt.preventDefault();
  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  closePopUp(popUpProfile);
  formProfile.reset();
}

//Функция добавления карточки на страницу
const addCardImage = (evt) => {
  // evt.preventDefault();
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

const resetForm = (form, config) => {
  form.reset();
  const inputList = createInputList(form, config.inputSelector);
  inputList.forEach(input => {
    input.classList.remove(config.inputErrorClass);
    input.nextElementSibling.textContent = '';
  });
}

editorBtn.addEventListener('click', () => {
  openPopUp(popUpProfile)
  inputName.value = userName.textContent;
  inputActivity.value = userActivity.textContent;
  }
);
btnClosePopUpProfile.addEventListener('click', () => {
  closePopUp(popUpProfile);
  resetForm(formProfile, setValidation);
});
addCardBtn.addEventListener('click', () => {
  openPopUp(popUpCardEditor);
  disabledButton (btnAddCard, 'popup__button_disabled');
});
btnClosePopUpCardEditor.addEventListener('click', (e) => {
  closePopUp(popUpCardEditor);
  resetForm(formCardEditor, setValidation);
});
btnClosePopUpImage.addEventListener('click', () => {closePopUp(popUpImage)});
formProfile.addEventListener('submit', handleFormSubmitProfile);
formCardEditor.addEventListener('submit', addCardImage);
cardsContainer.addEventListener('click', handleCardsList);

////////////////////////////////////////////

const showInputError = (errorElement, inputElement, config) => {
  inputElement.classList.add(config.inputErrorClass);
  // errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (errorElement, inputElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  // errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement, config);
  } else {
    hideInputError(errorElement, inputElement, config);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

const disabledButton = (buttonElement, disabledClass) => {
    buttonElement.classList.add(disabledClass);
    buttonElement.disabled = true;
}

function enableButton (buttonElement, disabledClass) {
    buttonElement.classList.remove(disabledClass);
    buttonElement.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, config) => {
  
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, config.inactiveButtonClass)
  } else {
    enableButton (buttonElement, config.inactiveButtonClass)
  }
};

const createInputList = (form, inputClass) => {
  return Array.from(form.querySelectorAll(inputClass));
}

const setEventListener = (formElement, config) => {
  const inputList = createInputList(formElement, config.inputSelector);
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
  inputList.forEach(inputElement => { 
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListener(formElement, config);
  })
};

enableValidation(setValidation); 