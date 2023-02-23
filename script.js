const openProfileButton = document.querySelector(".profile__button");
let popup = document.querySelector(".popup");
let popupCloseBtn = document.querySelector(".popup__button");
let profileName = document.querySelector(".profile__name");
let positionProf = document.querySelector(".profile__position");
let namePop = document.querySelector(".popup__name");
let positionPop = document.querySelector(".popup__position");
let saveBtn = document.querySelector(".popup__save");

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

openProfileButton.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
saveBtn.addEventListener("click", saveProfileInfo);
