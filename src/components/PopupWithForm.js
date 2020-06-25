import Popup from './Popup.js';

class PopupWithForm extends Popup {
	constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  // Collects data from all the input fields
  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  // Adds the click event listener to the close icon while also adding the submit event handler.
  setEventListeners(){
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      evt.stopPropagation();
    });
  }

  // Modifies the close() parent method in order to reset the form once the popup is closed.
  close() {
    super.close();
    this._popupElement.querySelector('.form').reset();
  }
}

export default PopupWithForm;
