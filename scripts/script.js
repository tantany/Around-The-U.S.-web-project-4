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

//Event Listeners
addButton.addEventListener('click', () => {
  popupDisplay(addFormElement);
});
addCloseIcon.addEventListener('click', (evt) => {
  popupDisplay(addFormElement);
  evt.stopPropagation();
});

editButton.addEventListener('click', () => {
  popupDisplay(editFormElement);
});
editCloseIcon.addEventListener('click', (evt) => {
  popupDisplay(editFormElement);
  evt.stopPropagation();
});

imageCloseIcon.addEventListener('click', (evt) => {
  popupDisplay(openImageFormElement);
  evt.stopPropagation();
});


editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);

//Enables closing the form when clicking outside the form area
editFormElement.addEventListener('click', (evt) => {
  if(evt.target.classList[0]==="popup"){
    popupDisplay(editFormElement);
  }
});

addFormElement.addEventListener('click', (evt) => {
  if(evt.target.classList[0]==="popup"){
    popupDisplay(addFormElement);
  }
});

openImageFormElement.addEventListener('click', (evt) => {
  if(evt.target.classList[0]==="popup"){
    popupDisplay(openImageFormElement);
  }
});

//Enables closing the form when pressing Esc key
document.addEventListener("keydown", keyHandler);

//Functions

function keyHandler(evt) {
  if(evt.which === 27){
    if(editFormElement.classList.contains('popup_opened')){
      popupDisplay(editFormElement);
    }
    if(addFormElement.classList.contains('popup_opened')){
      popupDisplay(addFormElement);
    }
    if(openImageFormElement.classList.contains('popup_opened')){
      popupDisplay(openImageFormElement);
    }
  }
}

function popupDisplay (element) {
  element.classList.toggle('popup_opened');
  element.querySelectorAll('.popup__item').forEach((item) =>{
    item.value = "";
  });
}

// The edit form submit handler
function editFormSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupDisplay(editFormElement);
}


// The add-card form submit handler
function addFormSubmitHandler (evt) {
  evt.preventDefault();

  const newCard =
    {
        name: titleInput.value,
        link: linkInput.value
    };
  renderCard(newCard);
  popupDisplay(addFormElement);
}

function renderCard(card) {
  // elementsContainer.prepend(createCard(card));
  const newCard = new Card(card,".template-card");
  const newCardElement = newCard.generateCard();
  document.querySelector(".elements__container").prepend(newCardElement);
  //create popup event listeners
  newCardElement.querySelector(".element__image").addEventListener("click", () => {
    popupImage.src = newCardElement.querySelector(".element__image").style.backgroundImage.slice(5, -2);
    popupImage.alt = `${newCardElement.querySelector(".element__title").textContent.replace(/\s+/g, '-').toLowerCase()}`;
    popupImageTitle.textContent = newCardElement.querySelector(".element__title").textContent;
    popupDisplay(openImageFormElement);
  });
}

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


import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
