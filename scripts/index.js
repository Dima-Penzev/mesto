import { initialCards, setValidation, BUTTONESC_KEY } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
const editorBtn = document.querySelector(".user__edit");
const userName = document.querySelector(".user__name");
const userActivity = document.querySelector(".user__activity");
const cardsContainer = document.querySelector(".cards-container");
const btnAddCard = document.querySelector(".user__add-card");
const popUpProfile = document.querySelector(".popup_type_profile");
const formProfile = document.forms["profile-data"];
const inputName = popUpProfile.querySelector("#name-input");
const inputActivity = popUpProfile.querySelector("#activity-input");
const popUpCardEditor = document.querySelector(".popup_type_card-editor");
const formCardEditor = document.forms["card-data"];
const inputCardTitle = popUpCardEditor.querySelector("#card-title-input");
const inputCardLink = popUpCardEditor.querySelector("#card-link-input");
const popUpImage = document.querySelector(".popup_type_image");
const popUpImageElem = popUpImage.querySelector(".module__image");
const popUpImageCaption = popUpImage.querySelector(".module__caption");
const popUpsList = Array.from(document.querySelectorAll(".popup"));
const formList = Array.from(
  document.querySelectorAll(setValidation.formSelector)
);

// Функция открытия модального окна
const openPopUp = (popUp) => {
  popUp.classList.add("popup_opened");
  popUp.addEventListener("mousedown", closeUnsubmittedPopUp);
  window.addEventListener("keydown", closeUnsubmittedPopUp);
};

// Функция закрытия модального окна
const closePopUp = (popUp) => {
  popUp.classList.remove("popup_opened");
  popUp.removeEventListener("mousedown", closeUnsubmittedPopUp);
  window.removeEventListener("keydown", closeUnsubmittedPopUp);
};

//Функция создания картинки с подписью в модальном окне
const makeImageInPopUP = (name, link) => {
  popUpImageElem.src = link;
  popUpImageElem.alt = name;
  popUpImageCaption.textContent = name;
};

//Функция открытия увеличенной картинки в модальном окне
const showBigImage = (evt) => {
  makeImageInPopUP(
    evt.target.getAttribute("alt"),
    evt.target.getAttribute("src")
  );
  openPopUp(popUpImage);
};

//Функция создания элемента-карточки
const createCard = (item) => {
  const card = new Card(item, "#card", showBigImage);
  const cardElement = card.generateCard();

  return cardElement;
};

//Функция добавления карточки в контейнер
const putCardInContainer = (card) => {
  cardsContainer.prepend(card);
};

//Функция для создания начального набора карточек
const makeInitialCardsSet = () =>
  initialCards.map((item) => {
    const card = createCard(item);
    putCardInContainer(card);
  });

makeInitialCardsSet();

//Функция создания валидарора форм
const createFormValidator = (formElement) => {
  return new FormValidator(setValidation, formElement);
};

//Функция для запуска валидации форм
const launchFormValidator = () => {
  formList.forEach((formElement) => {
    const formValidator = createFormValidator(formElement);
    formValidator.enableValidation();
  });
};

launchFormValidator();

//Функция закрытия модального окна при нажатии на "Overlay", клавишу "Escape", крестик
const closeUnsubmittedPopUp = (evt) => {
  popUpsList.forEach((popUp) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close") ||
      evt.code === BUTTONESC_KEY
    ) {
      closePopUp(popUp);
    }
  });
};

// Функция изменения данных о пользователе
const handleFormSubmitProfile = () => {
  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  closePopUp(popUpProfile);
};

//Функция добавления карточки на страницу
const addCardImage = () => {
  const newCardElement = createCard({
    name: inputCardTitle.value,
    link: inputCardLink.value,
  });
  putCardInContainer(newCardElement);
  closePopUp(popUpCardEditor);
  formCardEditor.reset();
};

editorBtn.addEventListener("click", () => {
  const formValidator = createFormValidator(formProfile);
  formValidator.resetErrors();
  openPopUp(popUpProfile);
  inputName.value = userName.textContent;
  inputActivity.value = userActivity.textContent;
});
btnAddCard.addEventListener("click", () => {
  openPopUp(popUpCardEditor);
});
formProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleFormSubmitProfile();
});
formCardEditor.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addCardImage();
});
