class Card {
  constructor({cardItem, handleCardClick, handleDeleteClick, handleLikeClick}, cardSelector) {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._cardItem = cardItem;
    this._card = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = this._card.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners(){
    //delete button
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      const listItem = this._element.querySelector('.element__delete-button').closest('.element');
      this._handleDeleteClick(listItem);
    });

    //heart button
    this._element.querySelector('.element__heart').addEventListener('click', (evt) => {
      const LikeButtonIsActive = this._element.querySelector('.element__heart').classList.contains('element__heart_active');
      this._handleLikeClick(LikeButtonIsActive);
      evt.target.classList.toggle('element__heart_active');
    });

    //image popup
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick({
        name: this._name,
        link: this._link
      });
    });
  }

  //show delete icon on cards belonging to the user, number of likes per card and cards liked by user
  showCardIcons(result) {
    const buttonItem = this._element.querySelector('.element__delete-button');
    //check if it's a new card just created
    if(this._cardItem.likes === undefined) {
      //likes counter
      this._element.querySelector('.element__counter').textContent = 0;
      //show delete bin
      buttonItem.classList.add('element__delete-button_active');
    }
    else {
      //likes counter
      this._element.querySelector('.element__counter').textContent = this._cardItem.likes.length;
      this._cardItem.likes.forEach(element => {
        if(result._id === element._id) this._element.querySelector('.element__heart').classList.toggle('element__heart_active')
      });
      //show delete bin if the card was created by the user
      if(result._id === this._cardItem.owner._id) {
        buttonItem.classList.add('element__delete-button_active');
      }
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').style.backgroundImage = `url('${this._link}')`;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

export default Card;
