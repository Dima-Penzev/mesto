export class FormValidator {
  constructor(config, formElement, createInputsList) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._createInputsList = createInputsList;
  }

  _showInputError(errorElement, inputElement) {
  
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError (errorElement, inputElement) {
  
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    if (!inputElement.validity.valid) {
      this._showInputError(errorElement, inputElement);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  _disabledButton(buttonElement, disabledClass) {
    buttonElement.classList.add(disabledClass);
    buttonElement.disabled = true;
  }

  _enableButton = (buttonElement, disabledClass) => {
    buttonElement.classList.remove(disabledClass);
    buttonElement.disabled = false;
  }

  _toggleButtonState(inputsList, buttonElement) {
    
    if (this._hasInvalidInput(inputsList)) {
      this._disabledButton(buttonElement, this._inactiveButtonClass);
    } else {
      this._enableButton (buttonElement, this._inactiveButtonClass);
    }
  }

  _setInputEventListener(formElement, buttonElement) {
    const inputsList = this._createInputsList(formElement, this._inputSelector);
    this._toggleButtonState(inputsList, buttonElement);
  
    formElement.addEventListener('reset', () => {
      setTimeout(() => {this._toggleButtonState(inputsList, buttonElement)}, 0)
    });
    
    inputsList.forEach(inputElement => { 
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputsList, buttonElement);
      })
    })
  }

  enableValidation() {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disabledButton(buttonElement, this._inactiveButtonClass);
    })
    this._setInputEventListener(this._formElement, buttonElement); 
  }
}