let content = document.querySelector('.content');
let formElement = document.querySelector('.popup');
let editButton = content.querySelector('.profile__edit-button');
let closeIcon = document.querySelector('.popup__close-icon');
let saveButton = content.querySelector('.popup__button');
// Let's find the form fields in the DOM
let nameInput = document.querySelector('.popup__name');// Use querySelector()
let jobInput = document.querySelector('.popup__about');// Use querySelector()
// Select elements where the field values will be entered
let profileName = content.querySelector('.profile__title');
let profileJob = content.querySelector('.profile__subtitle');
let newName;
let newJob;

editButton.addEventListener('click', popupDisplay);
closeIcon.addEventListener('click', popupDisplay);

function popupDisplay () {
  formElement.classList.toggle('popup_closed');
}

// The form submit handler
function formSubmitHandler (evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
                          // Having done so, we can define our own way of submitting the form.
                          // We'll explain it in more detail later.
    evt.stopPropagation();
    // Get the values of each field from the corresponding value property
    newName = nameInput.value;
    newJob = jobInput.value;

    // Insert new values using the textContent property of the querySelector() method
    profileName.textContent = newName;
    profileJob.textContent = newJob;

    popupDisplay();
}
// Connect the handler to the form:
formElement.addEventListener('submit', formSubmitHandler);
