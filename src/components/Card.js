class Card {
  constructor({cardItem, handleCardClick}, cardSelector) {
    this._name = cardItem.name;
    this._link = cardItem.link;
    this._card = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._card.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners(){
    //delete button
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      const listItem = this._element.querySelector('.element__delete-button').closest('.element');
      listItem.remove();
    });
    //heart button
    this._element.querySelector('.element__heart').addEventListener('click', (evt) => {
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

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').style.backgroundImage = `url('${this._link}')`;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}

export default Card;
