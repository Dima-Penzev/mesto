const editBtn = document.querySelector('.user__edit');
const closeModalBtn =document.querySelector('.modal__close');
const popUp = document.querySelector('.modal');

editBtn.addEventListener('click', () => {
  popUp.classList.add('modal_open_true');
})

closeModalBtn.addEventListener('click', () => {
  popUp.classList.remove('modal_open_true');
})