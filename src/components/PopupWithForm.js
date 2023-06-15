import Popup from "./Popup.js";
import { settings } from "../utils/constants.js";
import Api from "./Api.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this.handleFormSubmit = handleFormSubmit;
    this._apiCard = new Api();
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
      //console.log(evt.target.id);

      evt.preventDefault();
      const formData = this._getInputValues();
      this.handleFormSubmit(formData);
      //console.log(evt.target.id);
      //console.log(formData);
      if (evt.target.id != "delCard" && evt.target.id != "editProfile") {
        this._apiCard.addCard(formData);
        // const respu = apiCard
        //   .then((res) => {
        //     return res.json;
        //   })
        //   .then((data) => {
        //     console.log(data);
        //   });
        // console.log(respu);
      }

      this.close();
    });
  }

  close() {
    super.close();
    this.popupFormElement.reset();
  }
}
