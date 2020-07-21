import "./index.css";

import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  cardContainer,
  addButton,
  editButton,
  formSettings,
  imagePopupSelector,
  editPopupSelector,
  addPopupSelector,
  deletePopupSelector,
  picturePopupSelector,
  templateCardSelector,
  profilePictureContainer
} from "../utils/constants.js";

let userInfo;

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-1",
  headers: {
    authorization: "ba7e8983-1c58-4c25-a942-eec3a1c30fce",
    "Content-Type": "application/json"
  }
});

//create image popup
const popupWithImage = new PopupWithImage(imagePopupSelector);

popupWithImage.setEventListeners();

// Create delete form
const deleteFormElement = new PopupWithForm({
  popupSelector: deletePopupSelector,
  handleFormSubmit: ({} , listItem, cardId) => {
    listItem.remove();
    //delete card data from the server
    api.deleteCard(cardId)
    .then(() => deleteFormElement.close())
    .finally(() => deleteFormElement.renderLoading(false));
  }
});

deleteFormElement.setEventListeners();

//render a card
function renderCard(cardItem) {
  const card = new Card({cardItem,
    handleCardClick: ({name, link}) => {
      popupWithImage.open(name, link);
    },
    handleDeleteClick: (listItem, cardId) => {
      deleteFormElement.setSubmitAction(listItem, cardId);
      deleteFormElement.open();
    },
    handleLikeClick: (LikeButtonIsActive, cardId, likeCounter) => {
      api.changeLikeStatus(LikeButtonIsActive, cardId)
      .then((result) => {
        likeCounter.textContent = result.likes.length;
      });
    }
  }, templateCardSelector, userInfo.getUserInfo().userId);

  return card.generateCard();
}

// Load user information from the server and then get initial cards from server
api.getUserInfo()
.then((result) => {
  userInfo = new UserInfo({userName: result.name, userJob: result.about, userAvatar: result.avatar, userId: result._id});
  userInfo.setUserInfo();
})
.then(() => {
  api.getInitialCards().then((result) => {
    const cardList = new Section({
        items: result,
        renderer: (cardItem) => {
          cardList.addItem(renderCard(cardItem));
        }
      },
      cardContainer
    );
    cardList.renderItems();
  });
});

// Creates add new card form
const addFormElement = new PopupWithForm({ //I checked and the form validation works. For example it doesn't allow you to put anything but link.
  popupSelector: addPopupSelector,
  handleFormSubmit: (data) => {
    //send card data to the server
    api.sendCardData(data)
    .then((result) => {
      document.querySelector(cardContainer).append(renderCard(result)); //I don't see how I can avoid calling the same DOM element... I need it for initial cards and also for new cards the user adds.
      addFormElement.close();
    })
    .finally(() => addFormElement.renderLoading(false));
  }
});

addFormElement.setEventListeners();

addButton.addEventListener('click', () => {
  addFormElement.open();
});

// Create changing picture form
const pictureFormElement = new PopupWithForm({
  popupSelector: picturePopupSelector,
  handleFormSubmit: (avatar) => {
    //send the server the new profile picture link
    api.sendUserAvatar(avatar)
    .then((result) => {
      userInfo.updateUserAvatar(result.avatar);
      userInfo.setUserInfo();
      pictureFormElement.close();
    })
    .finally(() => pictureFormElement.renderLoading(false));
  }
});

pictureFormElement.setEventListeners();

profilePictureContainer.addEventListener('click', () => {
  pictureFormElement.open();
});

// Creates edit form
const editFormElement = new PopupWithForm({
  popupSelector: editPopupSelector,
  handleFormSubmit: (data) => {
    userInfo.updateUserInfo(data);
    userInfo.setUserInfo();
    //update user info into the server
    api.sendUserInfo(data)
    .then(() => editFormElement.close())
    .finally(() => editFormElement.renderLoading(false));
  }
});
editFormElement.setEventListeners();

editButton.addEventListener('click', () => {
  editFormElement.open();
});

// Gives validation capabilities to all forms
const formList = Array.from(document.querySelectorAll(formSettings.formSelector));
formList.forEach((formElement) => {
  const form = new FormValidator(formSettings, formElement);
  form.enableValidation();
});
