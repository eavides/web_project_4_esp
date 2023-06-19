import "./blocks/pages/index.css";
import { Card } from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";
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
import iconSrc from "./images/iconed.png";
const logoHeader = document.querySelector(".header__logo");
const profileHeader = document.querySelector(".profile__image");
const profileEdit = document.querySelector(".profile__imageEdit");
const editProfile = document.querySelector(".profile__edit");
const addBtn = document.querySelector(".profile__addImage");
const closeBtn = document.querySelector(".popup__buttonClose");
const closeNewCard = document.querySelector(".newcard__buttonClose");
const closeConfirm = document.querySelector(".confirmation__buttonClose");
const closeEdit = document.querySelector(".editimage__buttonClose");

const closeImgDisplay = document.querySelector(
  ".imgdisplay__container-buttonimg"
);
logoHeader.src = logoSrc;
//profileHeader.src = profileSrc;
editProfile.src = editSrc;
addBtn.src = addSrc;
closeBtn.src = closeSrc;
closeNewCard.src = closeSrc;
closeImgDisplay.src = closeSrc;
closeConfirm.src = closeSrc;
closeEdit.src = closeSrc;
profileEdit.src = iconSrc;
export const popup = document.querySelector(".popup");
const openProfileButton = document.querySelector(".profile__button");
export const profileName = document.querySelector(".profile__name");
export const positionProf = document.querySelector(".profile__position");
const avatarProf = document.querySelector(".profile__image");
export const namePop = document.querySelector("#name-input");
export const positionPop = document.querySelector("#position-input");
const createCardButton = document.querySelector(".profile__add");
const editImgButton = document.querySelector(".profile__imageEdit");
export const newcard = document.querySelector(".newcard");
export const imgPop = document.querySelector(".imgdisplay__image");
export const titlePop = document.querySelector(".imgdisplay__title");
export const imgDisplay = document.querySelector(".imgdisplay");
export const closeDisplayBtn = document.querySelector(
  ".imgdisplay__container-button"
);
let idprofile;

const profileInfo = new UserInfo(profile);

async function profileinit(prof) {
  const userInfo = await prof.getUserInfo();
  profileName.textContent = userInfo.name;
  positionProf.textContent = userInfo.about;
  avatarProf.src = userInfo.avatar;
  idprofile = userInfo.userId;
}

function createCard(cardInfo) {
  const card = new Card(
    cardInfo,
    "#grid__template",
    (evt, elemento) => {
      if (evt.target.classList.value === "grid__card-image") {
        const imgPopup = new PopupWithImage(".imgdisplay");
        imgPopup.open(evt);
        imgPopup.setEventListeners(closeDisplayBtn);
      }

      if (evt.target.classList.value === "grid__card-delete") {
        const delCard = new PopupWithForm(".confirmation", () => {
          let body;
          const apiCard = new Api();
          apiCard.deleteCard(body, cardInfo._id);
          elemento.remove();
        });
        delCard.open(evt);
        delCard.setEventListeners();
      }
    },
    idprofile,
    async (evt) => {
      let body;
      const apiLike = new Api();
      const respLike = await apiLike.likeCard(body, cardInfo._id);
      evt.target.nextElementSibling.textContent = respLike.likes.length;
    },
    async (evt) => {
      let body;
      const apiUnlike = new Api();
      const respUnlike = await apiUnlike.unlikeCard(body, cardInfo._id);
      evt.target.nextElementSibling.textContent = respUnlike.likes.length;
    }
  );
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
  const newCardObj = { name: data.name, link: data.link };
  const cardElement = createCard(data);
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

const newCardPopup = new PopupWithForm(".newcard", async (data) => {
  const infoCard = await data;
  createNewCard(infoCard);
});

newCardPopup.setEventListeners();

//actualizar imagen
function updateImage(data) {
  closeAllPopup();
}

const editPopup = new PopupWithForm(".editimage", async (data) => {
  const editApi = new Api();
  let body = {
    avatar: data.link,
  };

  const newImage = await editApi.updateImg(body);
  profileHeader.src = data.link;
});

editPopup.setEventListeners();

formCard.enableValidation();
formProfile.enableValidation();

profileinit(profileInfo);

//abre ventana de perfil
openProfileButton.addEventListener("click", async (evt) => {
  evt.preventDefault;

  const dataInfo = await profileInfo.getUserInfo();
  profilePopup.open(dataInfo);
});

//abre ventana de Nueva tarjeta
createCardButton.addEventListener("click", (evt) => {
  evt.preventDefault;
  newCardPopup.open();
});

//abre ventana de editar imagen de perfil
editImgButton.addEventListener("click", (evt) => {
  evt.preventDefault;
  editPopup.open();
});
