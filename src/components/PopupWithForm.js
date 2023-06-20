import Popup from "./Popup.js";
import { settings } from "../utils/constants.js";
import Api from "./Api.js";
import { api } from "../index.js";
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this.handleFormSubmit = handleFormSubmit;
    this._apiCard = api; //new Api();
    this.popupElement = document.querySelector(selectorPopup);
    this.popupFormElement = this.popupElement.querySelector(
      settings.formSelector
    );
    this.inputList = this.popupFormElement.querySelectorAll(
      settings.inputSelector
    );
  }

  _getInputValues() {
    const formValues = {};
    this.inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupFormElement.addEventListener("submit", (evt) => {
      evt.target.querySelector(".form__submit").textContent = "Guardando...";
      evt.preventDefault();
      const formData = this._getInputValues();
      if (
        evt.target.id != "delCard" &&
        evt.target.id != "editProfile" &&
        evt.target.id != "editImage"
      ) {
        const addedCard = this._apiCard.addCard(formData);
        this.handleFormSubmit(addedCard);
      } else {
        this.handleFormSubmit(formData);
      }
      this.close();
    });
  }

  close() {
    super.close();
    this.popupFormElement.reset();
  }
}
