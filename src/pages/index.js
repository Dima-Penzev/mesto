import "./index.css";
import {
  validationConfig,
  containerSelector,
  popupImageSelector,
  userNameSelector,
  userActivitySelector,
  userPhotoSelector,
  popUpCardEditorSelector,
  popUpProfileSelector,
  popUpPhotoEditSelector,
  popUpConfirmationSelector,
  BUTTON_ESC_KEY,
  editorBtn,
  btnAddCard,
  btnPhotoEditor,
  formProfile,
  formCardEditor,
  formPhotoEditor,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import Card from "../components/Card.js";

const createCard = (item) => {
  const card = new Card(item, "#card", {
    currentUserId: user.getUserInfo().userId,
    handleCardClick: popupImage.open.bind(popupImage),
    handleCardLike: (cardId, isLiked) => {
      api
        .toggleLikeState(cardId, isLiked)
        .then(({ likes }) => {
          card.updateLikes(likes.length);
          card.toggleLike();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCardDelete: (cardId) => {
      const submitDeletedCard = () => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
            popupConfirm.close();
          })
          .catch((err) => {
            console.log(err);
          });
      };
      popupConfirm.open();
      popupConfirm.setCallback(submitDeletedCard);
    },
  });
  const cardElement = card.generateCard();

  return cardElement;
};

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "88b6c4df-c8b7-46eb-8aad-28c3cdb17e7a",
    "Content-Type": "application/json",
  },
});

const popupConfirm = new PopupWithConfirmation(
  { popupSelector: popUpConfirmationSelector },
  BUTTON_ESC_KEY
);

const cardsSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsSection.addItem(cardElement);
    },
  },
  containerSelector
);

const formProfileValidator = new FormValidator(validationConfig, formProfile);
const formCardEditorValidator = new FormValidator(
  validationConfig,
  formCardEditor
);
const formPhotoEditValidator = new FormValidator(
  validationConfig,
  formPhotoEditor
);

const user = new UserInfo({
  userNameSelector,
  userActivitySelector,
  userPhotoSelector,
});

const popupImage = new PopupWithImage(popupImageSelector, BUTTON_ESC_KEY);

const popUpCardEditor = new PopupWithForm(
  {
    popupSelector: popUpCardEditorSelector,
    handleFormSubmit: (item) => {
      popUpCardEditor.submitButtonText("Сохранение...");
      api
        .addNewCard(item)
        .then((res) => {
          const newCardElement = createCard(res);
          cardsSection.addItem(newCardElement);
          popUpCardEditor.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popUpCardEditor.submitButtonText("Создать");
        });
    },
  },
  BUTTON_ESC_KEY
);

const popUpProfile = new PopupWithForm(
  {
    popupSelector: popUpProfileSelector,
    handleFormSubmit: (item) => {
      popUpProfile.submitButtonText("Сохранение...");
      api
        .setUserInfo(item)
        .then(({ name, about, _id, avatar }) => {
          user.setUserInfo({
            username: name,
            activity: about,
            userId: _id,
            avatar,
          });
          popUpProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popUpProfile.submitButtonText("Сохранить");
        });
    },
  },
  BUTTON_ESC_KEY
);

const popUpPhotoEditor = new PopupWithForm(
  {
    popupSelector: popUpPhotoEditSelector,
    handleFormSubmit: ({ link }) => {
      popUpPhotoEditor.submitButtonText("Сохранение...");
      api
        .setUserPhoto(link)
        .then(({ avatar }) => {
          user.setUserPhoto(avatar);
          popUpPhotoEditor.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popUpPhotoEditor.submitButtonText("Сохранить");
        });
    },
  },
  BUTTON_ESC_KEY
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([{ name, about, _id, avatar }, cards]) => {
    user.setUserInfo({
      username: name,
      activity: about,
      userId: _id,
      avatar,
    });
    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

formProfileValidator.enableValidation();
formCardEditorValidator.enableValidation();
formPhotoEditValidator.enableValidation();
popupImage.setEventListeners();
popUpCardEditor.setEventListeners();
popUpProfile.setEventListeners();
popUpPhotoEditor.setEventListeners();
popupConfirm.setEventListeners();

editorBtn.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  formProfileValidator.resetErrors();
  popUpProfile.open();
  popUpProfile.setInputValues(userInfo);
});
btnAddCard.addEventListener("click", () => {
  formCardEditorValidator.resetErrors();
  popUpCardEditor.open();
});
btnPhotoEditor.addEventListener("click", () => {
  formPhotoEditValidator.resetErrors();
  popUpPhotoEditor.open();
});
