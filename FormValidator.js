export class FormValidator {
  constructor(settings, formElement) {
    this.settings = settings;
    this.formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    this.errorElement = this.formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this.settings.inputErrorClass);
    this.errorElement.textContent = errorMessage;
    this.errorElement.classList.add(this.settings.errorClass);
  }

  _hideInputError(inputElement, formElement) {
    this.errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.settings.inputErrorClass);
    this.errorElement.classList.remove(this.settings.errorClass);
    this.errorElement.textContent = "";
  }

  _checkInputValidity(inputElement, formElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, formElement);
    }
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.buttonElement.classList.add(this.settings.inactiveButtonClass);
    } else {
      this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
    }
  }

  _setEventListeners(formElement) {
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.settings.inputSelector)
    );

    this.buttonElement = this.formElement.querySelector(
      this.settings.submitButtonSelector
    );

    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, formElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this.formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners(this.formElement);
  }
}
