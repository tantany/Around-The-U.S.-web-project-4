import Popup from './Popup.js';

class PopupWithImage extends Popup {
	constructor(popupSelector) {
    super(popupSelector);
  }

  // Adds an image to the popup and the corresponding image src attribute along with a caption for the image.
  open(name, link) {
    this._popupElement.querySelector('.popup__image').src = link;
    this._popupElement.querySelector('.popup__image-title').textContent = name;
    super.open();
  }
}

export default PopupWithImage;
