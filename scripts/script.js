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
const openImageFormElement = document.querySelector('.popup_type_image');
let popupImage = document.querySelector('.popup__image');
let popupImageTitle = document.querySelector('.popup__image-title');
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

const elementsContainer = document.querySelector('.elements__container');
const templateCard = document.querySelector('.template-card').content.querySelector('.element');

//Event Listeners
addButton.addEventListener('click', () => {
  popupDisplay(addFormElement);
});
addCloseIcon.addEventListener('click', () => {
  popupDisplay(addFormElement);
});

editButton.addEventListener('click', () => {
  popupDisplay(editFormElement);
});
editCloseIcon.addEventListener('click', () => {
  popupDisplay(editFormElement);
});

imageCloseIcon.addEventListener('click', () => {
  popupDisplay(openImageFormElement);
});

//editFormElement.addEventListener('submit', editFormSubmitHandler);
//addFormElement.addEventListener('submit', addFormSubmitHandler);

//Functions
function popupDisplay (element) {
  element.classList.toggle('popup_opened');
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
  elementsContainer.prepend(createCard(card));
}

function createCard(card) {
  //clone the template to a card entity
  const cardEntity = templateCard.cloneNode(true);
  //create consts for each entity in the cloned card
  const imageEntity = cardEntity.querySelector('.element__image');
  const titleEntity = cardEntity.querySelector('.element__title');
  const deleteButtonEntity = cardEntity.querySelector('.element__delete-button');
  const heartEntity = cardEntity.querySelector('.element__heart');
  //Assign initialCards
  imageEntity.style.backgroundImage = `url('${card.link}')`;
  titleEntity.textContent = card.name;

  deleteButtonEntity.addEventListener('click', () => {
    const listItem = deleteButtonEntity.closest(".element");
    listItem.remove();
  });

  heartEntity.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__heart_active');
  });

  imageEntity.addEventListener('click', () => {
    popupImage.src = `${card.link}`;
    popupImage.alt = `${card.name.replace(/\s+/g, '-').toLowerCase()}`;
    popupImageTitle.textContent = card.name;
    popupDisplay(openImageFormElement);
  });

  return cardEntity;
}

initialCards.forEach((card) => {
  renderCard(card);
});


//forms validity

const formElement = document.querySelector(".form");
const formInput = formElement.querySelector(".form__input");
const formError = formElement.querySelector(`#${formInput.id}-error`);

// Shows the error element
const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.classList.add("form__input-error_active");
};

// Hides the error element
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
};

// Takes an array of input fields and returns true if at least one field is invalid, false if all are valid
const hasInvalidInput = (inputList) => {
  // Iterate over the array using the some() method
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Checks if the field is valid
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // If not valid show the error element
    showInputError(formElement, inputElement);
  } else {
    // If valid hide the error element
    hideInputError(formElement, inputElement);
  }
};

// Takes an array of input fields and the button element to toggle between active/inactive
const toggleButtonState = (inputList, buttonElement) => {
  // If there is at least one invalid input
  if (hasInvalidInput(inputList)) {
    // make the button inactive
    buttonElement.classList.add("popup__button_inactive");
    buttonElement.classList.remove("hover-button");
  } else {
        // otherwise, make it active
    buttonElement.classList.remove("popup__button_inactive");
    buttonElement.classList.add("hover-button");
  }
};

//Takes a form element as a parameter and add the necessary handlers to its fields
const setEventListeners = (formElement) => {
  // Find all fields inside the form, and make an array from them using the Array.from() method
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  // find submit button and call the toggleButtonState() before starting to listen to the input event
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  // Iterate over the resulting array
  inputList.forEach((inputElement) => {
    // add the input event handler to each field
    inputElement.addEventListener("input", () => {
      // Call the isValid() function inside the callback, and pass the form and the element to be checked to it
      isValid(formElement, inputElement)
      // Call the toggleButtonState() and pass an array of fields and the button to it
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Find all the forms on the page and then iterate over them
const enableValidation = () => {
  //Find all forms with the specified class in DOM, and make an array from them using the Array.from() method
  const formList = Array.from(document.querySelectorAll(".form"));
  // Iterate over the resulting array
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // Cancel default behavior for each form
      evt.preventDefault();
    });
    // Call the setEventListeners() function for each form, taking a form element as an argument
    setEventListeners(formElement);
  });
};

// Call the function
enableValidation();
