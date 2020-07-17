const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const profilePicture = document.querySelector('.profile__picture');
const profilePictureContainer = document.querySelector('.profile__overlay-container');

const cardContainer = ".elements__container";
const imagePopupSelector = '.popup_type_image';
const editPopupSelector = '.popup_type_edit';
const addPopupSelector = '.popup_type_add';
const deletePopupSelector = '.popup_type_delete';
const picturePopupSelector = '.popup_type_picture';
const templateCardSelector = '.template-card';
const EscKeyEvt = 27;
const EnterKeyEvt = 13;

const formSettings = {
  formSelector: ".form", //popup__form
  inputSelector: ".form__input",  //popup__input
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive", //popup__button_disabled
  inputErrorClass: "form__input_type_error", //popup__input_type_error
  errorClass: "form__input-error_active" //popup__error_visible
};

export { editButton,
         addButton,
         cardContainer,
         formSettings,
         imagePopupSelector,
         editPopupSelector,
         addPopupSelector,
         deletePopupSelector,
         picturePopupSelector,
         templateCardSelector,
         EscKeyEvt,
         EnterKeyEvt,
         profileTitle,
         profileSubtitle,
         profilePicture,
         profilePictureContainer
}
