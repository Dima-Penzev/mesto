import Popup from "./PopUp.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, buttonCloseKey) {
    super(popupSelector, buttonCloseKey);
    this._popUpImageElem = this._popup.querySelector(".module__image");
    this._popUpImageCaption = this._popup.querySelector(".module__caption");
  }

  open(name, link) {
    super.open();
    this._popUpImageElem.src = link;
    this._popUpImageElem.alt = name;
    this._popUpImageCaption.textContent = name;
  }
}
