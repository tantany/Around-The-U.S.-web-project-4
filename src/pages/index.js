import "./index.css"; // add import of the main stylesheets file
// import "../vendor/fonts/fonts.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  cardContainer,
  addButton,
  editButton,
  formSettings,
  imagePopupSelector,
  editPopupSelector,
  addPopupSelector,
  templateCardSelector
} from "../utils/constants.js";

const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();

function renderCard(cardItem) {
  const card = new Card({cardItem, handleCardClick: ({name, link}) => {
      popupWithImage.open(name, link);
    }
  }, templateCardSelector);

  const cardElement = card.generateCard();
  return cardElement;
}

// Creates initial cards
const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      cardList.addItem(renderCard(cardItem));
    }
  },
  cardContainer
);

cardList.renderItems();

// Creates add form
const addFormElement = new PopupWithForm({
  popupSelector: addPopupSelector,
  handleFormSubmit: (data) => {
    document.querySelector(cardContainer).prepend(renderCard(data));
  }
});

addFormElement.setEventListeners();

addButton.addEventListener('click', () => {
  addFormElement.open();
});

// Creates edit form
const editFormElement = new PopupWithForm({
  popupSelector: editPopupSelector,
  handleFormSubmit: (data) => {
    const info = new UserInfo(data);
    info.setUserInfo();
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
