//Функция показывающая ошибку поля ввода формы
const showInputError = (errorElement, inputElement, config) => {
  const { inputErrorClass, errorClass } = config;

  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

//Функция скрывающая ошибку поля ввода формы
const hideInputError = (errorElement, inputElement, config) => {
  const { inputErrorClass, errorClass } = config;

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Функция добавления или удаления ошибки по результатам проверки поля вводя формы
const checkInputValidity = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement, config);
  } else {
    hideInputError(errorElement, inputElement, config);
  }
};

//Функция поиска невалидного поля ввода формы
const hasInvalidInput = (inputs) => {
  return inputs.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

//Функция привадящая кнопку в неактивное состояние
const disabledButton = (buttonElement, disabledClass) => {
    buttonElement.classList.add(disabledClass);
    buttonElement.disabled = true;
}

//Функция привадящая кнопку в активное состояние
const enableButton = (buttonElement, disabledClass) => {
    buttonElement.classList.remove(disabledClass);
    buttonElement.disabled = false;
}

//Функция переключения состояния кнопки "submit" в форме
const toggleButtonState = (inputsList, buttonElement, config) => {
  const { inactiveButtonClass } = config;
  
  if (hasInvalidInput(inputsList)) {
    disabledButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton (buttonElement, inactiveButtonClass);
  }
};

//Функция создающая массив полей ввода формы
const createInputsList = (form, inputClass) => {
  return Array.from(form.querySelectorAll(inputClass));
}

//Функция добавляющая слушатели событий для полей ввода формы
const setInputEventListener = (formElement, buttonElement, config) => {
  const { inputSelector } = config;
  const inputsList = createInputsList(formElement, inputSelector);
  toggleButtonState(inputsList, buttonElement, config);

  formElement.addEventListener('reset', () => {
    setTimeout(() => {toggleButtonState(inputsList, buttonElement, config)}, 0)
  });
  
  inputsList.forEach(inputElement => { 
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputsList, buttonElement, config);
    })
  })
};

//Функция запускающая валидацию форм
const enableValidation = (config) => {
  const { formSelector, submitButtonSelector, disabledClass } = config;
  const formsList = Array.from(document.querySelectorAll(formSelector));
  
  formsList.forEach(formElement => {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      disabledButton(buttonElement, disabledClass);
    })
    setInputEventListener(formElement, buttonElement, config);
  })
};

enableValidation(setValidation);