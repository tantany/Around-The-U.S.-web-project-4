// Adds elements to the DOM
class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Iterates over the array of data
  renderItems() {
    this._initialArray.forEach(item => this._renderer(item));
  }

  // Places the element into the appropriate container.
  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
