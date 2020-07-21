class Card {
  constructor({cardItem, handleCardClick, handleDeleteClick, handleLikeClick}, cardSelector, userId) {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._likes = cardItem.likes;
    this._cardItem = cardItem;
    this._userId = userId;
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
    const listItem = this._element.querySelector('.element__delete-button').closest('.element');
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteClick(listItem, this._cardItem._id);
    });

    //heart button
    this._element.querySelector('.element__heart').addEventListener('click', (evt) => {
      const LikeButtonIsActive = this._element.querySelector('.element__heart').classList.contains('element__heart_active');
      this._handleLikeClick(LikeButtonIsActive, this._cardItem._id, this._element.querySelector('.element__counter'));
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

  //Updates card view for delete icon, number of likes and if card was liked by user
  _updateCardView() {
    const buttonItem = this._element.querySelector('.element__delete-button');

    //likes counter
    this._element.querySelector('.element__counter').textContent = this._likes.length;
    this._likes.forEach(element => {
      if(this._userId === element._id) this._element.querySelector('.element__heart').classList.toggle('element__heart_active')
    });
    //show delete bin if the card was created by the user
    if(this._userId === this._cardItem.owner._id) {
      buttonItem.classList.add('element__delete-button_active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._updateCardView();

    this._element.querySelector('.element__image').style.backgroundImage = `url('${this._link}')`;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

export default Card;
