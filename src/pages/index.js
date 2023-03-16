import "./index.css";
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
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import createCard from "../utils/utils.js";

const initialCardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, popupImage.open.bind(popupImage));
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
    const newCardElement = createCard(item, popupImage.open.bind(popupImage));
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

initialCardsList.renderItems();
formProfileValidator.enableValidation();
formCardEditorValidator.enableValidation();
popupImage.setEventListeners();
popUpCardEditor.setEventListeners();
popUpProfile.setEventListeners();

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
