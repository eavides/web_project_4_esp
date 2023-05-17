import "./blocks/pages/index.css";
import { Card } from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { FormValidator } from "./components/FormValidator.js";
import { closeAllPopup } from "./utils/utils.js";
import {
  initialCards,
  cardListSelector,
  settings,
  profile,
} from "./utils/constants.js";

import logoSrc from "./images/Logo.png";
import profileSrc from "./images/profile_image.jpg";
import editSrc from "./images/Edit.svg";
import addSrc from "./images/AddButton.svg";
import closeSrc from "./images/Close.png";
const logoHeader = document.querySelector(".header__logo");
const profileHeader = document.querySelector(".profile__image");
const editProfile = document.querySelector(".profile__edit");
const addBtn = document.querySelector(".profile__addImage");
const closeBtn = document.querySelector(".popup__buttonClose");
const closeNewCard = document.querySelector(".newcard__buttonClose");
const closeImgDisplay = document.querySelector(
  ".imgdisplay__container-buttonimg"
);
logoHeader.src = logoSrc;
profileHeader.src = profileSrc;
editProfile.src = editSrc;
addBtn.src = addSrc;
closeBtn.src = closeSrc;
closeNewCard.src = closeSrc;
closeImgDisplay.src = closeSrc;
export const popup = document.querySelector(".popup");
const openProfileButton = document.querySelector(".profile__button");
export const profileName = document.querySelector(".profile__name");
export const positionProf = document.querySelector(".profile__position");
export const namePop = document.querySelector("#name-input");
export const positionPop = document.querySelector("#position-input");
const createCardButton = document.querySelector(".profile__add");
export const newcard = document.querySelector(".newcard");
export const imgPop = document.querySelector(".imgdisplay__image");
export const titlePop = document.querySelector(".imgdisplay__title");
export const imgDisplay = document.querySelector(".imgdisplay");
export const closeDisplayBtn = document.querySelector(
  ".imgdisplay__container-button"
);

function createCard(cardInfo) {
  const card = new Card(cardInfo, "#grid__template", (evt) => {
    const imgPopup = new PopupWithImage(".imgdisplay");
    imgPopup.open(evt);
    imgPopup.setEventListeners(closeDisplayBtn);
  });
  return card.generateCard();
}

//crea nueva seccion y agrega tarjetas
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      defaultCardList.addItem(cardElement);
    },
  },
  cardListSelector
);
defaultCardList.renderItems();

//crea nueva tarjeta
function createNewCard(data) {
  const newCardObj = { name: data.nameplace, link: data.linkplace };
  const cardElement = createCard(newCardObj);
  document.querySelector(".grid__container").prepend(cardElement);
  closeAllPopup();
}
const formElement = Array.from(
  document.querySelectorAll(settings.formSelector)
);
const formCard = new FormValidator(settings, formElement[1]);
const formProfile = new FormValidator(settings, formElement[0]);
const profilePopup = new PopupWithForm(".popup", (data) => {
  profileInfo.setUserInfo(data);
});
profilePopup.setEventListeners();
const newCardPopup = new PopupWithForm(".newcard", (data) => {
  createNewCard(data);
});
newCardPopup.setEventListeners();
formCard.enableValidation();
formProfile.enableValidation();
const profileInfo = new UserInfo(profile);

//abre ventana de perfil
openProfileButton.addEventListener("click", (evt) => {
  evt.preventDefault;

  const dataInfo = profileInfo.getUserInfo();
  profilePopup.open(dataInfo);
});

//abre ventana de Nueva tarjeta
createCardButton.addEventListener("click", (evt) => {
  evt.preventDefault;
  newCardPopup.open();
});
