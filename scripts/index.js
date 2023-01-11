const editorBtn = document.querySelector('.user__edit');
const userName = document.querySelector('.user__name');
const userActivity = document.querySelector('.user__activity');
const popUp = document.querySelector('.popup');
const closePopUpBtn =popUp.querySelector('.popup__close');
const formProfile = popUp.querySelector('#form-profile');
const inputName = popUp.querySelector('#name');
const inputActivity = popUp.querySelector('#activity');

// Функция открытия окна редактирования
const openPopUp = () => {
  inputName.value = userName.textContent;
  inputActivity.value = userActivity.textContent;
  popUp.classList.add('popup_opened');
}

// Функция закрытия окна редактирования
const closePopUp = () => {
  popUp.classList.remove('popup_opened');
}

// Функция изменения данных о пользователе
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  closePopUp();
}

editorBtn.addEventListener('click', openPopUp);
closePopUpBtn.addEventListener('click', closePopUp);
formProfile.addEventListener('submit', handleFormSubmit);
