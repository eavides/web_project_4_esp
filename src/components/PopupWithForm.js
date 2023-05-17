import Popup from "./Popup.js";
import { settings } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this.handleFormSubmit = handleFormSubmit;
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
      evt.preventDefault();
      const formData = this._getInputValues();
      this.handleFormSubmit(formData);
      this.close();
    });
  }

  close() {
    super.close();
    this.popupFormElement.reset();
  }
}
