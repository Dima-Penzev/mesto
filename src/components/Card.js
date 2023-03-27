export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete) {
    this._link = data.link;
    this._text = data.name;
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
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

    this._element.setAttribute("card_id", this._cardId);
    this._element.setAttribute("user_id", this._userId);
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
      .addEventListener("click", (evt) => {
        this._handleCardDelete(evt)
          .then((res) => {
            this._deleteCard();
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  _handleLikeBtn() {
    this._buttonLike.classList.toggle("card__like-btn_active");
  }

  _deleteCard() {
    this._element.remove();
  }
}
