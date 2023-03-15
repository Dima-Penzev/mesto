import {
  initialCards,
  setValidation,
  containerSelector,
  popupImageSelector,
  userNameSelector,
  userActivitySelector,
  popUpCardEditorSelector,
  popUpProfileSelector,
  editorBtn,
  btnAddCard,
  formProfile,
  formCardEditor,
  inputName,
  inputActivity,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

const formProfileValidator = new FormValidator(setValidation, formProfile);
const formCardEditorValidator = new FormValidator(
  setValidation,
  formCardEditor
);

const user = new UserInfo({
  userNameSelector,
  userActivitySelector,
});

const popupImage = new PopupWithImage(popupImageSelector);

const popUpCardEditor = new PopupWithForm({
  popupSelector: popUpCardEditorSelector,
  handleFormSubmit: (item) => {
    const newCardElement = createCard(item);
    initialCardsList.addItem(newCardElement);
    popUpCardEditor.close();
  },
});

const popUpProfile = new PopupWithForm({
  popupSelector: popUpProfileSelector,
  handleFormSubmit: (item) => {
    user.setUserInfo(item);
    popUpProfile.close();
  },
});

formProfileValidator.enableValidation();
formCardEditorValidator.enableValidation();
popupImage.setEventListeners();
popUpCardEditor.setEventListeners();
popUpProfile.setEventListeners();
initialCardsList.renderItems();

editorBtn.addEventListener("click", () => {
  formProfileValidator.resetErrors();
  popUpProfile.open();
  const userInfo = user.getUserInfo();
  inputName.value = userInfo.username;
  inputActivity.value = userInfo.activity;
});
btnAddCard.addEventListener("click", () => {
  formCardEditorValidator.resetErrors();
  popUpCardEditor.open();
});
