class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    // this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Stores the logic for closing the popup by pressing the Esc key.
  _handleEscClose(keyEvt) {
    if(keyEvt.which === 27){
      this.close();
    }
  }

  // Adds a click event listener to the close icon of the popup.
  setEventListeners() {
    this._popupElement.querySelector('.popup__close-icon').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.close();
      evt.stopPropagation();
    });

    //Enables closing the form when clicking outside the form area
    this._popupElement.addEventListener('click', (evt) => {
      if(evt.target.classList.contains("popup")){
        this.close();
      }
    });
  }

  // Opens the popup
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  //Closes the popup
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    // this._popup.querySelectorAll('.popup__item').forEach((item) =>{ //do reset instead?
    //   item.value = "";
    // });
    //this._popupElement.querySelector('.form').reset();
  }
}

export default Popup;
