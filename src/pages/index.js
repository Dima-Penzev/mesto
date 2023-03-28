import "./index.css";
import {
  initialCards,
  setValidation,
  containerSelector,
  popupImageSelector,
  userNameSelector,
  userActivitySelector,
  popUpCardEditorSelector,
  popUpProfileSelector,
  BUTTON_ESC_KEY,
  editorBtn,
  btnAddCard,
  formProfile,
  formCardEditor,
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
    // items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item, {
        userIdInBase: user.getUserInfo().user_id,
        handleCardClick: popupImage.open.bind(popupImage),
        handleAddLike: (cardId, elementLikesAmount) => {
          api
            .addLike(cardId)
            .then((res) => {
              console.log(res);
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
              .then((res) => {
                deleteCardOfList();
                console.log(res);
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

const user = new UserInfo({
  userNameSelector,
  userActivitySelector,
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
            handleAddLike: (cardId) => {
              api.addLike(cardId);
            },
            handleCardDelete: (cardId, deleteCardOfList) => {
              popupConfirm.open();
              popupConfirm.setEventListeners(() => {
                api
                  .deleteCard(cardId)
                  .then((res) => {
                    deleteCardOfList();
                    console.log(res);
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
        .then(({ name, about }) => {
          user.setUserInfo({ username: name, activity: about });
        })
        .catch((err) => {
          console.log(err);
        });
      popUpProfile.close();
    },
  },
  BUTTON_ESC_KEY
);

//////////////////////////////////////////////

api
  .getInitialCards()
  .then((data) => {
    console.log(data);
    initialCardsList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUserInfo()
  .then((data) => {
    console.log(data);
    user.setUserInfo({
      username: data.name,
      activity: data.about,
      userId: data._id,
    });
  })
  .catch((err) => {
    console.log(err);
  });

//////////////////////////////////////////////
formProfileValidator.enableValidation();
formCardEditorValidator.enableValidation();
popupImage.setEventListeners();
popUpCardEditor.setEventListeners();
popUpProfile.setEventListeners();

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
