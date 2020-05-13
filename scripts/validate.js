// Shows the error element
const showInputError = (formElement, inputElement, errorMessage, rest) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(rest.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(rest.errorClass);
};

// Hides the error element
const hideInputError = (formElement, inputElement, rest) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(rest.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(rest.errorClass);
};

// Takes an array of input fields and returns true if at least one field is invalid, false if all are valid
const hasInvalidInput = (inputList) => {
  // Iterate over the array using the some() method
  return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
  })
};

// Checks if the field is valid
const isValid = (formElement, inputElement, rest) => {
  if (!inputElement.validity.valid) {
    // If not valid show the error element
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    // If valid hide the error element
    hideInputError(formElement, inputElement, rest);
  }
};

// Takes an array of input fields and the button element to toggle between active/inactive
const toggleButtonState = (inputList, buttonElement, rest) => {
  // If there is at least one invalid input
  if (hasInvalidInput(inputList)) {
    // make the button inactive
    buttonElement.classList.add(rest.inactiveButtonClass);
    buttonElement.classList.remove("hover-button");
  } else {
        // otherwise, make it active
    buttonElement.classList.remove(rest.inactiveButtonClass);
    buttonElement.classList.add("hover-button");
  }
};

//Takes a form element as a parameter and add the necessary handlers to its fields
const setEventListeners = (formElement, rest) => {
  // Find all fields inside the form, and make an array from them using the Array.from() method
  const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
  // find submit button and call the toggleButtonState() before starting to listen to the input event
  const buttonElement = formElement.querySelector(rest.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  // Iterate over the resulting array
  inputList.forEach((inputElement) => {
    // add the input event handler to each field
    inputElement.addEventListener("input", () => {
      // Call the isValid() function inside the callback, and pass the form and the element to be checked to it
      isValid(formElement, inputElement, rest);
      // Call the toggleButtonState() and pass an array of fields and the button to it
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

//Find all the forms on the page and then iterate over them
const enableValidation = ({formSelector, ...rest}) => {
  //Find all forms with the specified class in DOM, and make an array from them using the Array.from() method
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Iterate over the resulting array
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // Cancel default behavior for each form
      evt.preventDefault();
    });
    // Call the setEventListeners() function for each form, taking a form element as an argument
    setEventListeners(formElement, rest);
  });
};

// Call the function
enableValidation({
  formSelector: ".form", //popup__form
  inputSelector: ".form__input",  //popup__input
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive", //popup__button_disabled
  inputErrorClass: "form__input_type_error", //popup__input_type_error
  errorClass: "form__input-error_active" //popup__error_visible
});
