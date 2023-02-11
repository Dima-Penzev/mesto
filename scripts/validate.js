const showInputError = (errorElement, inputElement, config) => {
  const { inputErrorClass, errorClass } = config;

  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (errorElement, inputElement, config) => {
  const { inputErrorClass, errorClass } = config;

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement, config);
  } else {
    hideInputError(errorElement, inputElement, config);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

const disabledButton = (buttonElement, disabledClass) => {
    buttonElement.classList.add(disabledClass);
    buttonElement.disabled = true;
}

const enableButton = (buttonElement, disabledClass) => {
    buttonElement.classList.remove(disabledClass);
    buttonElement.disabled = false;
}

const toggleButtonState = (inputList, buttonElement, config) => {
  const { inactiveButtonClass } = config;
  
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton (buttonElement, inactiveButtonClass);
  }
};

const createInputList = (form, inputClass) => {
  return Array.from(form.querySelectorAll(inputClass));
}

const setInputEventListener = (formElement, config) => {
  const { inputSelector, submitButtonSelector } = config;
  const inputList = createInputList(formElement, inputSelector);
  const buttonElement = formElement.querySelector(submitButtonSelector);
  
  inputList.forEach(inputElement => { 
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
};

const enableValidation = (config) => {
  const { formSelector } = config;
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setInputEventListener(formElement, config);
  })
};

enableValidation(setValidation);