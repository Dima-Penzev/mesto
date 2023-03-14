import Popup from "./PopUp.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    this._popUpImageElem = this._popup.querySelector(".module__image");
    this._popUpImageElem.src = link;
    this._popUpImageElem.alt = name;
    this._popup.querySelector(".module__caption").textContent = name;
  }
}
