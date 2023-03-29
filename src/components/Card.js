export default class Card {
  constructor(
    data,
    templateSelector,
    userIdInBase,
    handleCardClick,
    handleIpLike,
    handleCardDelete
  ) {
    this._link = data.link;
    this._text = data.name;
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._userIdInBase = userIdInBase;
    this._handleCardClick = handleCardClick;
    this._handleIpLike = handleIpLike;
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
    this._buttonDeleteCard = this._element.querySelector(".card__delete");
    this._cardImage = this._element.querySelector(".card__image");
    this._elementLikesAmount =
      this._element.querySelector(".card__like-amount");
    this._buttonLike = this._element.querySelector(".card__like-btn");

    this._element.setAttribute("card_id", this._cardId);
    this._element.setAttribute("user_id", this._userId);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._elementLikesAmount.textContent = this._likes.length;
    this._element.querySelector(".card__text").textContent = this._text;

    this._likes.forEach((like) => {
      if (like._id === this._userIdInBase) {
        this._handleLikeBtn();
      }
    });

    if (this._userIdInBase === this._element.getAttribute("user_id")) {
      this._buttonDeleteCard.classList.add("card__delete_visible");
    }
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.classList.contains("card__like-btn_active")) {
        this._handleIpLike(this._cardId, this._elementLikesAmount, true);
      } else {
        this._handleIpLike(this._cardId, this._elementLikesAmount, false);
      }
      this._handleLikeBtn();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._text, this._link);
    });

    this._buttonDeleteCard.addEventListener("click", () => {
      if (this._userIdInBase === this._element.getAttribute("user_id")) {
        this._handleCardDelete(
          this._element.getAttribute("card_id"),
          this._deleteCard.bind(this)
        );
      }
    });
  }

  _handleLikeBtn() {
    this._buttonLike.classList.toggle("card__like-btn_active");
  }

  _deleteCard() {
    this._element.remove();
  }
}
