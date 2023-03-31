export default class Card {
  constructor(
    data,
    templateSelector,
    { currentUserId, handleCardClick, handleCardLike, handleCardDelete }
  ) {
    this._link = data.link;
    this._text = data.name;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._currentUserId = currentUserId;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
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

    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._elementLikesAmount.textContent = this._likes.length;
    this._element.querySelector(".card__text").textContent = this._text;

    this._likes.forEach((like) => {
      if (like._id === this._currentUserId) {
        this.toggleLike();
      }
    });

    if (this._currentUserId === this._ownerId) {
      this._buttonDeleteCard.classList.add("card__delete_visible");
    }

    this._setBtnLikeEventListener();
    this._setcardImageEventListener();
    this._setBtnDeleteCardEventListener();

    return this._element;
  }

  _setBtnLikeEventListener() {
    this._buttonLike.addEventListener("click", () => {
      this._isLiked = this._buttonLike.classList.contains(
        "card__like-btn_active"
      );

      if (this._isLiked) {
        this._handleCardLike(
          this._cardId,
          this.updateLikes.bind(this),
          this.toggleLike.bind(this),
          this._isLiked
        );
      } else {
        this._handleCardLike(
          this._cardId,
          this.updateLikes.bind(this),
          this.toggleLike.bind(this),
          this._isLiked
        );
      }
    });
  }

  _setcardImageEventListener() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._text, this._link);
    });
  }

  _setBtnDeleteCardEventListener() {
    this._buttonDeleteCard.addEventListener("click", () => {
      if (this._currentUserId === this._ownerId) {
        this._handleCardDelete(this._cardId, this._deleteCard.bind(this));
      }
    });
  }

  toggleLike() {
    this._buttonLike.classList.toggle("card__like-btn_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  updateLikes(likesAmount) {
    this._elementLikesAmount.textContent = likesAmount;
  }
}
