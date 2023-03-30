import Popup from "./PopUp.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }, buttonCloseKey) {
    super(popupSelector, buttonCloseKey);
    this._hadleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._btnLabelText = this._popup.querySelector(".popup__button-label");
    this._btnProcessText = this._popup.querySelector(".popup__button-process");
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

  renderLoader(isLoading) {
    if (isLoading) {
      this._btnLabelText.classList.add("popup__button-text-ishidden");
      this._btnProcessText.classList.remove("popup__button-text-ishidden");
    } else {
      this._btnLabelText.classList.remove("popup__button-text-ishidden");
      this._btnProcessText.classList.add("popup__button-text-ishidden");
    }
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
