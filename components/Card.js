export default class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._link = Object.values(item)[1];
    this._text = Object.values(item)[0];
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._text, this._link);
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
