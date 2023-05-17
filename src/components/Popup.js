export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._popupElement = document.querySelector(this._selectorPopup);
  }
  open(data) {
    this._popupElement.classList.add("popup_opened");
    this._popupElement.classList.add("newcard_opened");
    const infoForm = this._popupElement.querySelector("#editProfile");
    if (infoForm) {
      const infoName = infoForm.querySelector("#name-input");
      const infoPosition = infoForm.querySelector("#position-input");
      infoName.value = data.name;
      infoPosition.value = data.position;
    }
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    this._popupElement.classList.remove("newcard_opened");
  }

  _handleEscClose(evt) {
    //console.log(evt);
    if (
      evt.target.classList.value == "popup popup_opened newcard_opened" ||
      evt.target.classList.value == "newcard popup_opened newcard_opened" ||
      evt.target.classList.value == "imgdisplay__container"
    ) {
      this.close();
    }
    if (evt.key == "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      this._handleEscClose(evt);
      if (evt.target.alt === "cerrar") {
        this.close();
      }
    });
    window.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
