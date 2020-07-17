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
  profilePicture,
  profilePictureContainer
} from "../utils/constants.js";

let listItemDelete;
let cardIdDelete;

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
  handleFormSubmit: () => {
    listItemDelete.remove();
    //delete card data from the server
    api.deleteCard(cardIdDelete)
    .then((result) => deleteFormElement.close())
    .finally(() => deleteFormElement.renderLoading(false));
  }
});

deleteFormElement.setEventListeners();

//render a card
function renderCard(cardItem) {
  const card = new Card({cardItem, handleCardClick: ({name, link}) => {
      popupWithImage.open(name, link);
    },
    handleDeleteClick: (listItem) => {
      listItemDelete = listItem;
      cardIdDelete = card._cardItem._id;
      deleteFormElement.open();
    },
    handleLikeClick: (LikeButtonIsActive) => {
      if(LikeButtonIsActive){
        api.cardUnliked(card._cardItem._id)
        .then((result) => {
          card._element.querySelector('.element__counter').textContent = result.likes.length;
        });
      } else {
        api.cardLiked(card._cardItem._id)
        .then((result) => {
          card._element.querySelector('.element__counter').textContent = result.likes.length;
        });
      }
    }
  }, templateCardSelector);

  //get info from server to show icons on the card
  api.setCardIcons()
  .then((result) => {
    card.showCardIcons(result);
  });

  const cardElement = card.generateCard();
  return cardElement;
}

//Get initial cards from server
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


// Creates add new card form
const addFormElement = new PopupWithForm({
  popupSelector: addPopupSelector,
  handleFormSubmit: (data) => {
    //send card data to the server
    api.sendCardData(data)
    .then((result) => {
      document.querySelector(cardContainer).append(renderCard(result));
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
      profilePicture.src = result.avatar;
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
    const info = new UserInfo(data);
    info.setUserInfo();
    //update user info into the server
    api.sendUserInfo(data)
    .then((result) => editFormElement.close())
    .finally(() => editFormElement.renderLoading(false));
  }
});
editFormElement.setEventListeners();

editButton.addEventListener('click', () => {
  editFormElement.open();
});

// Loading user information from the server
api.getUserInfo()
.then((result) => {
  const userInfo = new UserInfo({userName: result.name, userJob: result.about, userAvatar: result.avatar});
  userInfo.setUserInfo();
  profilePicture.src = result.avatar;
});

// Gives validation capabilities to all forms
const formList = Array.from(document.querySelectorAll(formSettings.formSelector));
formList.forEach((formElement) => {
  const form = new FormValidator(formSettings, formElement);
  form.enableValidation();
});
