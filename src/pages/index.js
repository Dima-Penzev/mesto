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
import createCard from "../utils/utils.js";

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
      const cardElement = createCard(item, {
        currentUserId: user.getUserInfo().userId,
        handleCardClick: popupImage.open.bind(popupImage),
        handleCardLike: (cardId, updateLikes, toggleLike, isLiked) => {
          api
            .toggleLikeState(cardId, isLiked)
            .then(({ likes }) => {
              updateLikes(likes.length);
              toggleLike();
            })
            .catch((err) => {
              console.log(err);
            });
        },
        handleCardDelete: (cardId, deleteCardOfList) => {
          popupConfirm.open();
          popupConfirm.setEventListeners(() => {
            api
              .deleteCard(cardId)
              .then(() => {
                deleteCardOfList();
                popupConfirm.close();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        },
      });
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
      popUpCardEditor.renderLoader("Сохранение...");
      api
        .addNewCard(item)
        .then((res) => {
          const newCardElement = createCard(res, {
            currentUserId: user.getUserInfo().userId,
            handleCardClick: popupImage.open.bind(popupImage),
            handleCardLike: (cardId, updateLikes, toggleLike, isLiked) => {
              api
                .toggleLikeState(cardId, isLiked)
                .then(({ likes }) => {
                  updateLikes(likes.length);
                  toggleLike();
                })
                .catch((err) => {
                  console.log(err);
                });
            },
            handleCardDelete: (cardId, deleteCardOfList) => {
              popupConfirm.open();
              popupConfirm.setEventListeners(() => {
                api
                  .deleteCard(cardId)
                  .then(() => {
                    deleteCardOfList();
                    popupConfirm.close();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            },
          });
          cardsSection.addItem(newCardElement);
          popUpCardEditor.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popUpCardEditor.renderLoader("Создать");
        });
    },
  },
  BUTTON_ESC_KEY
);

const popUpProfile = new PopupWithForm(
  {
    popupSelector: popUpProfileSelector,
    handleFormSubmit: (item) => {
      popUpProfile.renderLoader("Сохранение...");
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
          popUpProfile.renderLoader("Сохранить");
        });
    },
  },
  BUTTON_ESC_KEY
);

const popUpPhotoEditor = new PopupWithForm(
  {
    popupSelector: popUpPhotoEditSelector,
    handleFormSubmit: ({ link }) => {
      popUpPhotoEditor.renderLoader("Сохранение...");
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
          popUpPhotoEditor.renderLoader("Сохранить");
        });
    },
  },
  BUTTON_ESC_KEY
);

api
  .getUserInfo()
  .then(({ name, about, _id, avatar }) => {
    user.setUserInfo({
      username: name,
      activity: about,
      userId: _id,
      avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getInitialCards()
  .then((data) => {
    cardsSection.renderItems(data);
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
