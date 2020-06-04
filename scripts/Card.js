class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector(".element").cloneNode(true);
    return cardElement;
  }

  _setEventListeners(){
    //delete button
    this._element.querySelector(".element__delete-button").addEventListener("click", () => {
      const listItem = this._element.querySelector(".element__delete-button").closest(".element");
      listItem.remove();
    });
    //heart button
    this._element.querySelector(".element__heart").addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__heart_active');
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").style.backgroundImage = `url('${this._link}')`;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }
}

export {Card};
