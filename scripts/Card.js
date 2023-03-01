export class Card {
  constructor(data, templateSelector, handleLikeBtn, deleteCard, openPopUp, closePopUp, showBigImage, popUpImage) {
    this._link = data.link;
    this._text = data.name;
    this._templateSelector = templateSelector;
    this._handleLikeBtn = handleLikeBtn;
    this._deleteCard = deleteCard;
    this._openPopUp = openPopUp;
    this._closePopUp = closePopUp;
    this._showBigImage = showBigImage;
    this._popUpImage = popUpImage;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    
    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._text;
    this._element.querySelector('.card__text').textContent = this._text;
    this._setEventListeners(cardImage);
    
    return this._element;
  }

  _setEventListeners(cardImage) {
    cardImage.addEventListener('click', (evt) => {
      this._openPopUp(this._popUpImage);
      this._showBigImage(evt);
    });
    this._element.querySelector('.card__like-btn').addEventListener('click', this._handleLikeBtn);
    this._element.querySelector('.card__delete').addEventListener('click', this._deleteCard);
  }
}
