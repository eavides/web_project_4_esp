const openProfileButton = document.querySelector(".profile__button");
let popup = document.querySelector(".popup");
let popupCloseBtn = document.querySelector(".popup__button");
let profileName = document.querySelector(".profile__name");
let positionProf = document.querySelector(".profile__position");
let namePop = document.getElementById("name-input");
let positionPop = document.getElementById("position-input");
let saveBtn = document.getElementById("save-submit");
const gridContainer = document.querySelector(".grid__container");

const createCardButton = document.querySelector(".profile__add");
const newcardCloseBtn = document.querySelector(".newcard__button");
const newcard = document.querySelector(".newcard");
const createCardBtn = document.getElementById("save-card");
let newTitle = document.getElementById("title-input");
let newLink = document.getElementById("url-input");

const imgDisplay = document.querySelector(".imgdisplay");
const closeDisplayBtn = document.querySelector(".imgdisplay__container-button");

/*
const openProfileButton = document.querySelector(".profile__button");
let popup = document.querySelector(".popup");
let popupCloseBtn = document.querySelector(".popup__button");
let profileName = document.querySelector(".profile__name");
let positionProf = document.querySelector(".profile__position");
let namePop = document.querySelector(".popup__name");
let positionPop = document.querySelector(".popup__position");
let saveBtn = document.querySelector(".popup__save");
const gridContainer = document.querySelector(".grid__container");

const createCardButton = document.querySelector(".profile__add");
const newcardCloseBtn = document.querySelector(".newcard__button");
const newcard = document.querySelector(".newcard");
const createCardBtn = document.querySelector(".newcard__create");
let newTitle = document.querySelector(".newcard__name");
let newLink = document.querySelector(".newcard__place");

const imgDisplay = document.querySelector(".imgdisplay");
const closeDisplayBtn = document.querySelector(".imgdisplay__container-button");
 */

const initialCards = [
  {
    name: "Canal de Venecia",
    link: "https://images.unsplash.com/photo-1677362376803-93af835b3a47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Coliseo Romano",
    link: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=796&q=80",
  },
  {
    name: "Playa el Tunco",
    link: "https://images.unsplash.com/photo-1626663082623-daed65c06061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

function openPopup() {
  popup.classList.add("popup_opened");
  namePop.value = profileName.textContent;
  positionPop.value = positionProf.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function closeOut(evt) {
  console.log(evt.target.classList.value);
  if (
    evt.target.classList.value == "popup popup_opened" ||
    evt.target.classList.value == "newcard newcard_opened" ||
    evt.target.classList.value == "imgdisplay__container"
  ) {
    closePopup();
    closeCard();
    closeDisplay();
  }
  if (evt.key == "Escape") {
    closePopup();
    closeCard();
    closeDisplay();
  }
}

function saveProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = namePop.value;
  positionProf.textContent = positionPop.value;
  closePopup();
}

function addPicture(picturteValue, titleValue) {
  const cardTemplate = document.querySelector("#grid__template").content;
  const cardElement = cardTemplate.querySelector(".grid__card").cloneNode(true);

  cardElement.querySelector(".grid__card-image").src = picturteValue;
  cardElement.querySelector(".grid__card-title").textContent = titleValue;
  cardElement
    .querySelector(".grid__card-like")
    .addEventListener("click", function (evt) {
      evt.preventDefault();
      evt.target.classList.toggle("grid__card-like_active");
    });
  const deleteButton = cardElement.querySelector(".grid__card-delete");
  deleteButton.addEventListener("click", function (evt) {
    deleteButton.closest(".grid__card").remove();
  });

  const openImage = cardElement.querySelector(".grid__card-image");
  openImage.addEventListener("click", function (evt) {
    let imgLink = evt.target.src;
    let imgTitle = evt.target
      .closest(".grid__card")
      .querySelector(".grid__card-title").textContent;
    openDisplay(imgLink, imgTitle);
  });
  return cardElement;
}

initialCards.forEach(function (item) {
  const newPicture = addPicture(item.link, item.name);
  gridContainer.append(newPicture);
});

function createCard() {
  newcard.classList.add("newcard_opened");
}

function closeCard() {
  newcard.classList.remove("newcard_opened");
}

function createNewCard(evt) {
  evt.preventDefault();
  console.log(newLink.value);
  console.log(newTitle.value);
  const newCardAdd = addPicture(newLink.value, newTitle.value);
  gridContainer.prepend(newCardAdd);
  closeCard();
}

function openDisplay(link, title) {
  imgDisplay.classList.add("imgdisplay_opened");
  const imgPop = document.querySelector(".imgdisplay__image");
  const titlePop = document.querySelector(".imgdisplay__title");
  imgPop.src = link;
  titlePop.textContent = title;
}

function closeDisplay() {
  imgDisplay.classList.remove("imgdisplay_opened");
}

/*-------------------------------------------- */

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);
  });
};

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(settings);

popup.addEventListener("click", closeOut);
newcard.addEventListener("click", closeOut);
imgDisplay.addEventListener("click", closeOut);
window.addEventListener("keydown", closeOut);
openProfileButton.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
saveBtn.addEventListener("click", saveProfileInfo);
createCardButton.addEventListener("click", createCard);
newcardCloseBtn.addEventListener("click", closeCard);
createCardBtn.addEventListener("click", createNewCard);
closeDisplayBtn.addEventListener("click", closeDisplay);
