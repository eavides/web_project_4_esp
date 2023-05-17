import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this.popupElement = document.querySelector(selectorPopup);
  }

  open(evt) {
    this.popupElement.classList.add("imgdisplay_opened");
    this.image = this.popupElement.querySelector(".imgdisplay__image");
    this.title = this.popupElement.querySelector(".imgdisplay__title");
    this.image.src = evt.target.src;
    this.title.textContent = evt.target.alt;
  }

  close() {
    this.popupElement.classList.remove("imgdisplay_opened");
  }
}
