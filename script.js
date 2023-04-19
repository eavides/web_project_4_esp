import { Card } from "./Card.js";
const openProfileButton = document.querySelector(".profile__button");
export const popup = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__button");
const profileName = document.querySelector(".profile__name");
const positionProf = document.querySelector(".profile__position");
const namePop = document.querySelector("#name-input");
const positionPop = document.querySelector("#position-input");
const saveBtn = document.querySelector("#save-submit");
const gridContainer = document.querySelector(".grid__container");

const createCardButton = document.querySelector(".profile__add");
const newcardCloseBtn = document.querySelector(".newcard__button");
export const newcard = document.querySelector(".newcard");
const createCardBtn = document.querySelector("#save-card");
let newTitle = document.querySelector("#title-input");
let newLink = document.querySelector("#url-input");

export const imgDisplay = document.querySelector(".imgdisplay");
export const closeDisplayBtn = document.querySelector(
  ".imgdisplay__container-button"
);

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

initialCards.forEach((item) => {
  const card = new Card(item, "#grid__template");
  const cardElement = card.generateCard();

  // Agrega al DOM
  document.querySelector(".grid__container").append(cardElement);
});

function openPopup() {
  popup.classList.add("popup_opened");
  namePop.value = profileName.textContent;
  positionPop.value = positionProf.textContent;
}

function closeOut(evt) {
  if (
    evt.target.classList.value == "popup popup_opened" ||
    evt.target.classList.value == "newcard newcard_opened" ||
    evt.target.classList.value == "imgdisplay__container"
  ) {
    closeAllPopup();
  }
  if (evt.key == "Escape") {
    closeAllPopup();
  }
}

function saveProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = namePop.value;
  positionProf.textContent = positionPop.value;
  closeAllPopup();
}

function likeCard(evt) {
  evt.preventDefault();
  evt.target.classList.toggle("grid__card-like_active");
}

function OpenCard(evt) {
  let imgLink = evt.target.src;
  let imgTitle = evt.target
    .closest(".grid__card")
    .querySelector(".grid__card-title").textContent;
  openDisplay(imgLink, imgTitle);
}

function createCardElement(picturteValue, titleValue) {
  const cardTemplate = document.querySelector("#grid__template").content;
  const cardElement = cardTemplate.querySelector(".grid__card").cloneNode(true);

  cardElement.querySelector(".grid__card-image").src = picturteValue;
  cardElement.querySelector(".grid__card-title").textContent = titleValue;
  cardElement
    .querySelector(".grid__card-like")
    .addEventListener("click", likeCard);

  const deleteButton = cardElement.querySelector(".grid__card-delete");
  deleteButton.addEventListener("click", function (evt) {
    deleteButton.closest(".grid__card").remove();
  });

  const openImage = cardElement.querySelector(".grid__card-image");
  openImage.addEventListener("click", OpenCard);
  return cardElement;
}

initialCards.forEach(function (item) {
  const newPicture = createCardElement(item.link, item.name);
  gridContainer.append(newPicture);
});

function createCard() {
  newcard.classList.add("newcard_opened");
}

function createNewCard(evt) {
  evt.preventDefault();
  const newCardAdd = createCardElement(newLink.value, newTitle.value);
  gridContainer.prepend(newCardAdd);
  closeAllPopup();
}

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
//popupCloseBtn.addEventListener("click", closeAllPopup);
saveBtn.addEventListener("click", saveProfileInfo);
createCardButton.addEventListener("click", createCard);
//newcardCloseBtn.addEventListener("click", closeAllPopup);
createCardBtn.addEventListener("click", createNewCard);
//closeDisplayBtn.addEventListener("click", closeAllPopup);
