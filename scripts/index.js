const editBtn = document.querySelector('.user__edit');
const closeModalBtn =document.querySelector('.modal__close');
const popUp = document.querySelector('.modal');
const inputName = document.querySelector('#name');
const inputActivity = document.querySelector('#activity');
const formProfile = document.querySelector('#form-profile');
const userName = document.querySelector('.user__name');
const userActivity = document.querySelector('.user__activity');

inputName.value = userName.textContent;
inputActivity.value = userActivity.textContent;

const toggleModal = () => {
  popUp.classList.toggle('modal_open_true');
}

editBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);

formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();

  userName.textContent = inputName.value;
  userActivity.textContent = inputActivity.value;
  toggleModal();
})
