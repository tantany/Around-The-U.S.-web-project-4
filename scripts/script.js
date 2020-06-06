import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

//declarations
const initialCards = [
  {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
      name: "Vanois National Park",
      link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const editFormElement = document.querySelector('.popup_type_edit');
const addFormElement = document.querySelector('.popup_type_add');
// popup image
const openImageFormElement = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

//buttons
const editButton = document.querySelector('.profile__edit-button');
const editCloseIcon = editFormElement.querySelector('.popup__close-icon');
const addCloseIcon = addFormElement.querySelector('.popup__close-icon');
const addButton = document.querySelector('.profile__add-button');
const imageCloseIcon = openImageFormElement.querySelector('.popup__close-icon');

// editFormSubmitHandler variables
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__about');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

// addFormSubmitHandler variables
const titleInput = document.querySelector('.popup__place-title');
const linkInput = document.querySelector('.popup__image-link');

//Functions

function popupDisplay (element) {
  element.classList.toggle('popup_opened');
  element.querySelectorAll('.popup__item').forEach((item) =>{
    item.value = "";
  });
}

function keyHandler(evt) {
  if(evt.which === 27){
    [editFormElement, addFormElement, openImageFormElement]
    .forEach((formElement) => {
        if (formElement.classList.contains('popup_opened')) {
            popupDisplay(formElement);
        }
    });
  }
}

// The edit form submit handler
function editFormSubmitHandler (evt) {
  evt.preventDefault();
  evt.stopPropagation();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupDisplay(editFormElement);
}

function renderCard(card) {
  const newCard = new Card(card,".template-card");
  const newCardElement = newCard.generateCard();
  document.querySelector(".elements__container").prepend(newCardElement);
}

// The add-card form submit handler
function addFormSubmitHandler (evt) {
evt.preventDefault();
evt.stopPropagation();
const newCard =
  {
      name: titleInput.value,
      link: linkInput.value
  };
renderCard(newCard);
popupDisplay(addFormElement);
}

//create popup event listeners
function imagePopup(element) {
  popupImage.src = element.querySelector(".element__image").style.backgroundImage.slice(5, -2);
  popupImage.alt = `${element.querySelector(".element__title").textContent.replace(/\s+/g, '-').toLowerCase()}`;
  popupImageTitle.textContent = element.querySelector(".element__title").textContent;
  popupDisplay(openImageFormElement);
}

//Event Listeners
addButton.addEventListener('click', () => {
  popupDisplay(addFormElement);
});
addCloseIcon.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupDisplay(addFormElement);
  evt.stopPropagation();
});

editButton.addEventListener('click', () => {
  popupDisplay(editFormElement);
});
editCloseIcon.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupDisplay(editFormElement);
  evt.stopPropagation();
});

imageCloseIcon.addEventListener('click', (evt) => {
  evt.preventDefault();
  popupDisplay(openImageFormElement);
  evt.stopPropagation();
});


editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

//Enables closing the form when clicking outside the form area
[editFormElement, addFormElement, openImageFormElement]
.forEach((formElement) => {
  formElement.addEventListener('click', (evt) => {
    if(evt.target.classList.contains("popup")){
      popupDisplay(formElement);
    }
  });
});

//Enables closing the form when pressing Esc key
document.addEventListener("keydown", keyHandler);

initialCards.forEach((card) => {
  renderCard(card);
});


//Generate form validation
const formSettings = {
  formSelector: ".form", //popup__form
  inputSelector: ".form__input",  //popup__input
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive", //popup__button_disabled
  inputErrorClass: "form__input_type_error", //popup__input_type_error
  errorClass: "form__input-error_active" //popup__error_visible
};

const formList = Array.from(document.querySelectorAll(formSettings.formSelector));
formList.forEach((formElement) => {
  const form = new FormValidator(formSettings, formElement);
  form.enableValidation();
});

export { imagePopup };
