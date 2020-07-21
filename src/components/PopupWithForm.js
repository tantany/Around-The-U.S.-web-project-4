import Popup from './Popup.js';
import {EnterKeyEvt} from "../utils/constants.js"

class PopupWithForm extends Popup {
	constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector('.form');
    this._buttonValue = this._popupElement.querySelector('.popup__button').value;
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
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues(), this._listItem, this._cardId);
      evt.stopPropagation();
    });

    this._popupElement.addEventListener('keydown', (evt) => {
      if(evt.which === EnterKeyEvt){
        this.renderLoading(true);
        this._handleFormSubmit(this._getInputValues());
      }
    });

  }

  // Modifies the close() parent method in order to reset the form once the popup is closed.
  close() {
    super.close();
    this._formElement.reset();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupElement.querySelector('.popup__button').value = "Saving..."
    }
    else {
      this._popupElement.querySelector('.popup__button').value = this._buttonValue;
    }
  }

  setSubmitAction(listItem, cardId) {
    this._listItem = listItem;
    this._cardId = cardId;
  }
}

export default PopupWithForm;
