const formElement = document.querySelector(".form");
const formInput = formElement.querySelector(".form__input");
const formError = formElement.querySelector(`#${formInput.id}-error`);

// Shows the error element
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

// Hides the error element
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.textContent = "";
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
    showInputError(formElement, inputElement, inputElement.validationMessage);
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
    //formElement.addEventListener("submit", (evt) => {
      // Cancel default behavior for each form
    //  evt.preventDefault();
    //});
    // Call the setEventListeners() function for each form, taking a form element as an argument
    setEventListeners(formElement);
  });
};

// Call the function
enableValidation();
