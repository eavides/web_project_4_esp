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

function saveProfileInfo(evt) {
  console.log(evt);
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
      evt.target.classList.toggle("grid__card-like_active");
    });
  const deleteButton = cardElement.querySelector(".grid__card-delete");
  deleteButton.addEventListener("click", function (evt) {
    deleteButton.closest(".grid__card").remove();
  });

  const openImage = cardElement.querySelector(".grid__card-image");
  openImage.addEventListener("click", function (event) {
    let imgLink = event.target.src;
    let imgTitle = event.target
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

function createNewCard() {
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
  /*namePop.value = profileName.textContent;
  positionPop.value = positionProf.textContent;*/
}

function closeDisplay() {
  imgDisplay.classList.remove("imgdisplay_opened");
}

openProfileButton.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
saveBtn.addEventListener("click", saveProfileInfo);
createCardButton.addEventListener("click", createCard);
newcardCloseBtn.addEventListener("click", closeCard);
createCardBtn.addEventListener("click", createNewCard);

closeDisplayBtn.addEventListener("click", closeDisplay);
