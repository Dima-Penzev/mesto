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
  BUTTON_ESC_KEY,
  editorBtn,
  btnAddCard,
  formProfile,
  formCardEditor,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import createCard from "../utils/utils.js";

//////////////////////////////////////////////////////////////////////

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "88b6c4df-c8b7-46eb-8aad-28c3cdb17e7a",
    "Content-Type": "application/json",
  },
});

////////////////////////////////////////////////////////////////////////////

const initialCardsList = new Section(
  {
    // items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, popupImage.open.bind(popupImage));
      initialCardsList.addItem(cardElement);
    },
  },
  containerSelector
);

api
  .getInitialCards()
  .then((data) => {
    initialCardsList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserInfo()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

const formProfileValidator = new FormValidator(setValidation, formProfile);
const formCardEditorValidator = new FormValidator(
  setValidation,
  formCardEditor
);

const user = new UserInfo({
  userNameSelector,
  userActivitySelector,
});

const popupImage = new PopupWithImage(popupImageSelector, BUTTON_ESC_KEY);

const popUpCardEditor = new PopupWithForm(
  {
    popupSelector: popUpCardEditorSelector,
    handleFormSubmit: (item) => {
      const newCardElement = createCard(item, popupImage.open.bind(popupImage));
      initialCardsList.addItem(newCardElement);
      popUpCardEditor.close();
    },
  },
  BUTTON_ESC_KEY
);

const popUpProfile = new PopupWithForm(
  {
    popupSelector: popUpProfileSelector,
    handleFormSubmit: (item) => {
      user.setUserInfo(item);
      popUpProfile.close();
    },
  },
  BUTTON_ESC_KEY
);

// initialCardsList.renderItems();
formProfileValidator.enableValidation();
formCardEditorValidator.enableValidation();
popupImage.setEventListeners();
popUpCardEditor.setEventListeners();
popUpProfile.setEventListeners();

editorBtn.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  formProfileValidator.resetErrors();
  popUpProfile.open();
  popUpProfile.setInputValues(userInfo);
});
btnAddCard.addEventListener("click", () => {
  formCardEditorValidator.resetErrors();
  popUpCardEditor.open();
});
