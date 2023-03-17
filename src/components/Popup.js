export default class Popup {
  constructor(popupSelector, buttonCloseKey) {
    this._popup = document.querySelector(popupSelector);
    this._buttonCloseKey = buttonCloseKey;
  }

  open() {
    this._popup.classList.add("popup_opened");
    window.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.code === this._buttonCloseKey) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
