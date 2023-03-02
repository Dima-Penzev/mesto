export class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError(errorElement, inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(errorElement, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    if (!inputElement.validity.valid) {
      this._showInputError(errorElement, inputElement);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setInputEventListener() {
    this._toggleButtonState();

    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });

    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setInputEventListener();
  }

  resetErrors() {
    this._inputsList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(
        `.${inputElement.id}-error`
      );
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    });
  }
}
