import {
  popup,
  newcard,
  imgDisplay,
  namePop,
  profileName,
  positionPop,
  positionProf,
} from "./index.js";
export function openPopup() {
  popup.classList.add("popup_opened");
  namePop.value = profileName.textContent;
  positionPop.value = positionProf.textContent;
}

export function closeAllPopup() {
  popup.classList.remove("popup_opened");
  newcard.classList.remove("newcard_opened");
  imgDisplay.classList.remove("imgdisplay_opened");
}

export function closeOut(evt) {
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

export function saveProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = namePop.value;
  positionProf.textContent = positionPop.value;
  closeAllPopup();
}
