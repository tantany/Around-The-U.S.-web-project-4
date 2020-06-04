class FormValidator {
  constructor (settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _isValid(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
      input.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    } else {
      input.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = input.validationMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
  };

  _toggleButtonState (inputList) {
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    const hasInvalidInput = inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    if (hasInvalidInput) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.classList.remove("hover-button");
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.classList.add("hover-button");
    }
  };

  _setEventListeners (inputList) {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  };

  //enables form validation
  enableValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    this._setEventListeners(inputList);
  }
}

export {FormValidator};
