import { CLOSE_BTN } from './constants.js';

export class Card {
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
    this._setEventListeners();

    const cardImage = this._element.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._text;
    this._element.querySelector('.card__text').textContent = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup();
      this._makeImageInPopup();
    });
    this._element.querySelector('.card__like-btn').addEventListener('click', this._handleLikeBtn);
    this._element.querySelector('.card__delete').addEventListener('click', this._deleteCard);
  }

  _handleOpenPopup() {
    const popUpImage = document.querySelector('.popup_type_image');
    
    popUpImage.classList.add('popup_opened');
    popUpImage.addEventListener('mousedown', this._handleClosePopup);
    window.addEventListener('keydown', this._handleClosePopup);
  }

  _handleClosePopup(evt) {
    const popUpImage = document.querySelector('.popup_type_image');

    if(evt.target.classList.contains('popup') || 
      evt.target.classList.contains('popup__close') || 
      evt.code === CLOSE_BTN) {

    popUpImage.classList.remove('popup_opened');
    popUpImage.removeEventListener('mousedown', this._handleClosePopup);
    window.removeEventListener('keydown', this._handleClosePopup);
    }
  }

  _handleLikeBtn(evt) {
    evt.target.classList.toggle('card__like-btn_active');
  }

  _deleteCard(evt) {
    evt.target.closest('.card').remove();
  }

  _makeImageInPopup() {
    const popUpImageElem = document.querySelector('.module__image');
    popUpImageElem.src = this._link;
    popUpImageElem.alt = this._text;
    document.querySelector('.module__caption').textContent = this._text;
  }
}
