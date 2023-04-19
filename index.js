import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  openPopup,
  closeAllPopup,
  closeOut,
  saveProfileInfo,
} from "./utils.js";
const openProfileButton = document.querySelector(".profile__button");
export const popup = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup__button");
export const profileName = document.querySelector(".profile__name");
export const positionProf = document.querySelector(".profile__position");
export const namePop = document.querySelector("#name-input");
export const positionPop = document.querySelector("#position-input");
const saveBtn = document.querySelector("#save-submit");
const gridContainer = document.querySelector(".grid__container");

const createCardButton = document.querySelector(".profile__add");
const newcardCloseBtn = document.querySelector(".newcard__button");
export const newcard = document.querySelector(".newcard");
const createCardBtn = document.querySelector("#save-card");
let newTitle = document.querySelector("#title-input");
let newLink = document.querySelector("#url-input");

const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const imgPop = document.querySelector(".imgdisplay__image");
export const titlePop = document.querySelector(".imgdisplay__title");

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
  document.querySelector(".grid__container").append(cardElement);
});

function createCard() {
  newcard.classList.add("newcard_opened");
}

function createNewCard(evt) {
  evt.preventDefault();
  const newCardObj = { name: newTitle.value, link: newLink.value };
  const card = new Card(newCardObj, "#grid__template");
  const cardElement = card.generateCard();
  document.querySelector(".grid__container").prepend(cardElement);
  closeAllPopup();
}

const formElement = Array.from(
  document.querySelectorAll(settings.formSelector)
);

const formCard = new FormValidator(settings, formElement[1]);
const formProfile = new FormValidator(settings, formElement[0]);

formCard.enableValidation();

popup.addEventListener("click", closeOut);
newcard.addEventListener("click", closeOut);
imgDisplay.addEventListener("click", closeOut);
window.addEventListener("keydown", closeOut);
openProfileButton.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closeAllPopup);
saveBtn.addEventListener("click", saveProfileInfo);
createCardButton.addEventListener("click", createCard);
newcardCloseBtn.addEventListener("click", closeAllPopup);
createCardBtn.addEventListener("click", createNewCard);
//closeDisplayBtn.addEventListener("click", closeAllPopup);
