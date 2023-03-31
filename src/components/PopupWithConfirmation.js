import Popup from "./PopUp.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }, buttonCloseKey) {
    super(popupSelector, buttonCloseKey);
    this._buttonConfirm = this._popup.querySelector(".popup__button");
  }

  setCallback(submitCb) {
    this._handleSubmit = submitCb;
  }

  setEventListeners(deleteCard) {
    super.setEventListeners();
    this._buttonConfirm.addEventListener("click", (evt) => {
      evt.preventDefault();
      deleteCard();
      // this._handleSubmit();
    });
  }
}
