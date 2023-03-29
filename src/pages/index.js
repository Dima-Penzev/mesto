import "./index.css";
import {
  setValidation,
  containerSelector,
  popupImageSelector,
  userNameSelector,
  userActivitySelector,
  userPhotoSelector,
  popUpCardEditorSelector,
  popUpProfileSelector,
  popUpPhotoEditSelector,
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

//////////////////////////////////////////////////////////////////////

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "88b6c4df-c8b7-46eb-8aad-28c3cdb17e7a",
    "Content-Type": "application/json",
  },
});

const popupConfirm = new PopupWithConfirmation(
  { popupSelector: ".popup_type_confirm" },
  BUTTON_ESC_KEY
);

////////////////////////////////////////////////////////////////////////////

const initialCardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item, {
        userIdInBase: user.getUserInfo().user_id,
        handleCardClick: popupImage.open.bind(popupImage),
        handleIpLike: (cardId, elementLikesAmount, likesState) => {
          api
            .handleLikeCounter(cardId, likesState)
            .then((res) => {
              elementLikesAmount.textContent = res.likes.length;
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
              })
              .catch((err) => {
                console.log(err);
              });
          });
        },
      });
      initialCardsList.addItem(cardElement);
    },
  },
  containerSelector
);

const formProfileValidator = new FormValidator(setValidation, formProfile);
const formCardEditorValidator = new FormValidator(
  setValidation,
  formCardEditor
);
const formPhotoEditValidator = new FormValidator(
  setValidation,
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
      api
        .addNewCard(item)
        .then((res) => {
          const newCardElement = createCard(res, {
            userIdInBase: user.getUserInfo().user_id,
            handleCardClick: popupImage.open.bind(popupImage),
            handleIpLike: (cardId, elementLikesAmount, likesState) => {
              api
                .handleLikeCounter(cardId, likesState)
                .then((res) => {
                  elementLikesAmount.textContent = res.likes.length;
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
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            },
          });
          initialCardsList.addItem(newCardElement);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popUpCardEditor.close();
        });
    },
  },
  BUTTON_ESC_KEY
);

const popUpProfile = new PopupWithForm(
  {
    popupSelector: popUpProfileSelector,
    handleFormSubmit: (item) => {
      api
        .setUserInfo(item)
        .then(({ name, about, _id }) => {
          user.setUserInfo({ username: name, activity: about, userId: _id });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popUpProfile.close();
        });
    },
  },
  BUTTON_ESC_KEY
);

const popUpPhotoEditor = new PopupWithForm(
  {
    popupSelector: popUpPhotoEditSelector,
    handleFormSubmit: ({ link }) => {
      api
        .setUserPhoto(link)
        .then(({ avatar }) => {
          user.setUserPhoto(avatar);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popUpPhotoEditor.close();
        });
    },
  },
  BUTTON_ESC_KEY
);

//////////////////////////////////////////////

api
  .getInitialCards()
  .then((data) => {
    initialCardsList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserInfo()
  .then(({ name, about, _id, avatar }) => {
    user.setUserInfo({
      username: name,
      activity: about,
      userId: _id,
    });
    user.setUserPhoto(avatar);
  })
  .catch((err) => {
    console.log(err);
  });

//////////////////////////////////////////////
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
  formPhotoEditValidator.enableValidation();
  popUpPhotoEditor.open();
});
