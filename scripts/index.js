import {
  initialCards,
  setValidation,
  containerSelector,
  popupImageSelector,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
const editorBtn = document.querySelector(".user__edit");
const userName = document.querySelector(".user__name");
const userActivity = document.querySelector(".user__activity");
// const cardsContainer = document.querySelector(".cards-container");
const btnAddCard = document.querySelector(".user__add-card");
// const popUpProfile = document.querySelector(".popup_type_profile");
const formProfile = document.forms["profile-data"];

// const inputName = popUpProfile.querySelector("#name-input");
// const inputActivity = popUpProfile.querySelector("#activity-input");

// const popUpCardEditor = document.querySelector(".popup_type_card-editor");
const formCardEditor = document.forms["card-data"];
// const inputCardTitle = popUpCardEditor.querySelector("#card-title-input");
// const inputCardLink = popUpCardEditor.querySelector("#card-link-input");
// const popUpImage = document.querySelector(".popup_type_image");
// const popUpImageElem = popUpImage.querySelector(".module__image");
// const popUpImageCaption = popUpImage.querySelector(".module__caption");
// const popUpsList = Array.from(document.querySelectorAll(".popup"));
const formProfileValidator = new FormValidator(setValidation, formProfile);
const formCardEditorValidator = new FormValidator(
  setValidation,
  formCardEditor
);

formProfileValidator.enableValidation();
formCardEditorValidator.enableValidation();

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const popUpCardEditor = new PopupWithForm({
  popupSelector: ".popup_type_card-editor",
  handleFormSubmit: (item) => {
    const newCardElement = createCard(item);
    initialCardsList.addItem(newCardElement);
    popUpCardEditor.close();
  },
});
popUpCardEditor.setEventListeners();

const popUpProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (item) => {
    userName.textContent = Object.values(item)[0];
    userActivity.textContent = Object.values(item)[1];
    popUpProfile.close();
  },
});
popUpProfile.setEventListeners();
// Функция открытия модального окна
// const openPopUp = (popUp) => {
//   popUp.classList.add("popup_opened");
//   popUp.addEventListener("mousedown", closeUnsubmittedPopUp);
//   window.addEventListener("keydown", closeUnsubmittedPopUp);
// };

// Функция закрытия модального окна
// const closePopUp = (popUp) => {
//   popUp.classList.remove("popup_opened");
//   popUp.removeEventListener("mousedown", closeUnsubmittedPopUp);
//   window.removeEventListener("keydown", closeUnsubmittedPopUp);
// };

//Функция создания картинки с подписью в модальном окне
// const makeImageInPopUP = (name, link) => {
//   popUpImageElem.src = link;
//   popUpImageElem.alt = name;
//   popUpImageCaption.textContent = name;
// };

//Функция открытия увеличенной картинки в модальном окне
// const showBigImage = (name, link) => {
//   makeImageInPopUP(name, link);
//   openPopUp(popUpImage);
// };

//Функция создания элемента-карточки
const createCard = (item) => {
  const card = new Card(item, "#card", popupImage.open.bind(popupImage));
  const cardElement = card.generateCard();

  return cardElement;
};

const initialCardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      initialCardsList.addItem(cardElement);
    },
  },
  containerSelector
);

initialCardsList.renderItems();

//Функция добавления карточки в контейнер
// const putCardInContainer = (card) => {
//   cardsContainer.prepend(card);
// };

//Функция для создания начального набора карточек
// const makeInitialCardsSet = () =>
//   initialCards.map((item) => {
//     const card = createCard(item);
//     putCardInContainer(card);
//   });

// makeInitialCardsSet();

//Функция закрытия модального окна при нажатии на "Overlay", клавишу "Escape", крестик
// const closeUnsubmittedPopUp = (evt) => {
//   popUpsList.forEach((popUp) => {
//     if (
//       evt.target.classList.contains("popup") ||
//       evt.target.classList.contains("popup__close") ||
//       evt.code === BUTTON_ESC_KEY
//     ) {
//       closePopUp(popUp);
//     }
//   });
// };

// Функция изменения данных о пользователе
// const handleFormSubmitProfile = () => {
//   userName.textContent = inputName.value;
//   userActivity.textContent = inputActivity.value;
//   closePopUp(popUpProfile);
// };

//Функция добавления карточки на страницу
// const addCardImage = () => {
//   const newCardElement = createCard({
//     name: inputCardTitle.value,
//     link: inputCardLink.value,
//   });
//   initialCardsList.addItem(newCardElement);
//   closePopUp(popUpCardEditor);
//   // formCardEditor.reset();
// };

editorBtn.addEventListener("click", () => {
  formProfileValidator.resetErrors();
  popUpProfile.open();
  // openPopUp(popUpProfile);
  // inputName.value = userName.textContent;
  // inputActivity.value = userActivity.textContent;
});
btnAddCard.addEventListener("click", () => {
  popUpCardEditor.open();
  // openPopUp(popUpCardEditor);
});
// formProfile.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   handleFormSubmitProfile();
// });
// formCardEditor.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   addCardImage();
// });
