export class Card {
  constructor(data, templateSelector, showBigImage) {
    this._link = data.link;
    this._text = data.name;
    this._templateSelector = templateSelector;
    this._showBigImage = showBigImage;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._element.querySelector(".card__text").textContent = this._text;
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(".card__like-btn");

    this._buttonLike.addEventListener("click", () => {
      this._handleLikeBtn();
    });
    this._cardImage.addEventListener("click", () => {
      this._showBigImage(this._text, this._link);
    });
    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });
  }

  _handleLikeBtn() {
    this._buttonLike.classList.toggle("card__like-btn_active");
  }

  _deleteCard() {
    this._element.remove();
  }
}
