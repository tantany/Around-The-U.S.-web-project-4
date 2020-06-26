import yosemiteValley from "../images/yosemite-valley.jpg";
import lakeLouise from "../images/lake-louise.jpg";
import baldMountains from "../images/bald-mountains.jpg";
import latemar from "../images/latemar.jpg";
import vanoisNationalPark from "../images/vanois-national-park.jpg";
import lagoDiBraies from "../images/lago-di-braies.jpg";

const initialCards = [
  {
      name: "Yosemite Valley",
      link: yosemiteValley
  },
  {
      name: "Lake Louise",
      link: lakeLouise
  },
  {
      name: "Bald Mountains",
      link: baldMountains
  },
  {
      name: "Latemar",
      link: latemar
  },
  {
      name: "Vanois National Park",
      link: vanoisNationalPark
  },
  {
      name: "Lago di Braies",
      link: lagoDiBraies
  }
];

const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardContainer = ".elements__container";
const imagePopupSelector = '.popup_type_image';
const editPopupSelector = '.popup_type_edit';
const addPopupSelector = '.popup_type_add';
const templateCardSelector = '.template-card';
const EscKeyEvt = 27;

const formSettings = {
  formSelector: ".form", //popup__form
  inputSelector: ".form__input",  //popup__input
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive", //popup__button_disabled
  inputErrorClass: "form__input_type_error", //popup__input_type_error
  errorClass: "form__input-error_active" //popup__error_visible
};

export { initialCards,
         editButton,
         addButton,
         cardContainer,
         formSettings,
         imagePopupSelector,
         editPopupSelector,
         addPopupSelector,
         templateCardSelector,
         EscKeyEvt,
         profileTitle,
         profileSubtitle
}
