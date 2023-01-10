const editBtn = document.querySelector('.user__edit');
const userName = document.querySelector('.user__name');
const userActivity = document.querySelector('.user__activity');
const popUp = document.querySelector('.popup');
const closePopUpBtn =popUp.querySelector('.popup__close');
const formProfile = popUp.querySelector('#form-profile');
const inputName = popUp.querySelector('#name');
const inputActivity = popUp.querySelector('#activity');

inputName.value = userName.textContent;
inputActivity.value = userActivity.textContent;

const togglePopUp = () => {
  popUp.classList.toggle('popup_opened');
}

editBtn.addEventListener('click', togglePopUp);
closePopUpBtn.addEventListener('click', togglePopUp);

formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  togglePopUp();
})
