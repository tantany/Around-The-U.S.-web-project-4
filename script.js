let content = document.querySelector('.content');
let formElement = document.querySelector('.popup');
let closeIcon = document.querySelector('.popup__close-icon');
let editButton = content.querySelector('.profile__edit-button');

editButton.addEventListener('click', popupDisplay);
closeIcon.addEventListener('click', popupDisplay);

function popupDisplay () {
  formElement.classList.toggle('popup_closed');
}

// Let's find the form in the DOM
//let formElement =  Use the querySelector() method
// Next is the form submit handler, though
// it won't submit anywhere just yet
function formSubmitHandler (evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
                          // Having done so, we can define our own way of submitting the form.
                          // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    let nameInput = document.querySelector('.popup__name');// Use querySelector()
    let jobInput = document.querySelector('.popup__about');// Use querySelector()


    // Get the values of each field from the corresponding value property
    let newName = nameInput.value;
    let newJob = jobInput.value;

    // Select elements where the field values will be entered
    let profileName = content.querySelector('.profile__title');
    let profileJob = content.querySelector('.profile__subtitle');

    // Insert new values using the textContent property of the querySelector() method
    profileName.textContent = newName;
    profileJob.textContent = newJob;

    popupDisplay();
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', formSubmitHandler);
