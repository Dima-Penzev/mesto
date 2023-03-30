const setValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const containerSelector = ".cards-container";
const popupImageSelector = ".popup_type_image";
const userNameSelector = ".user__name";
const userActivitySelector = ".user__activity";
const userPhotoSelector = ".user__photo";
const popUpCardEditorSelector = ".popup_type_card-editor";
const popUpProfileSelector = ".popup_type_profile";
const popUpPhotoEditSelector = ".popup_type_photo-editor";
const popUpConfirmationSelector = ".popup_type_confirm";
const BUTTON_ESC_KEY = "Escape";
const editorBtn = document.querySelector(".user__edit");
const btnAddCard = document.querySelector(".user__add-card");
const btnPhotoEditor = document.querySelector(".user__photo-edit");
const formProfile = document.forms["profile-data"];
const formCardEditor = document.forms["card-data"];
const formPhotoEditor = document.forms["photo-data"];

export {
  setValidation,
  containerSelector,
  popupImageSelector,
  userNameSelector,
  userActivitySelector,
  userPhotoSelector,
  popUpCardEditorSelector,
  popUpProfileSelector,
  popUpPhotoEditSelector,
  popUpConfirmationSelector,
  BUTTON_ESC_KEY,
  editorBtn,
  btnAddCard,
  btnPhotoEditor,
  formProfile,
  formCardEditor,
  formPhotoEditor,
};
