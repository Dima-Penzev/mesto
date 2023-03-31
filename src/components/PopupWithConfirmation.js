import Popup from "./PopUp.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }, buttonCloseKey) {
    super(popupSelector, buttonCloseKey);
    this._buttonConfirm = this._popup.querySelector(".popup__button");
  }

  setCallback(submitDeletedCard) {
    this._handleSubmit = submitDeletedCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
