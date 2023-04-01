import Popup from "./PopUp.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }, buttonCloseKey) {
    super(popupSelector, buttonCloseKey);
    this._hadleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._popupButton = this._popup.querySelector(".popup__button");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._hadleFormSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  submitButtonText(buttonText) {
    this._popupButton.textContent = buttonText;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
