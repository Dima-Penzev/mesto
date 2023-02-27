class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._text = data.name;
    this._templateSelector = templateSelector;
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

    return this._element;
  }

  _setEventListeners() {
    
  }
}