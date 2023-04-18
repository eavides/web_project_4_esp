import { closeDisplayBtn, imgDisplay, imgPop, titlePop } from "./index.js";
class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid__card")
      .cloneNode(true);

    return this._cardElement;
  }

  _openImgDisplay() {
    imgDisplay.classList.add("imgdisplay_opened");
    imgPop.src = this._image;
    titlePop.textContent = this._title;
  }

  _closeImgDisplay() {
    //popup.classList.remove("popup_opened");
    //newcard.classList.remove("newcard_opened");
    imgDisplay.classList.remove("imgdisplay_opened");
  }

  _setEventListeners() {
    this.link.addEventListener("click", () => {
      this._openImgDisplay(this._element);
    });

    closeDisplayBtn.addEventListener("click", () => {
      this._closeImgDisplay();
    });

    this.btnCardLike.addEventListener("click", (evt) => {
      evt.preventDefault();
      evt.target.classList.toggle("grid__card-like_active");
    });

    this.btnCardDel.addEventListener("click", () => {
      this._element.remove();
    });
  }
  setCardProperties() {
    this._element = this._getTemplate();
    this.link = this._element.querySelector(".grid__card-image");
    this.title = this._element.querySelector(".grid__card-title");
    this.btnCardDel = this._element.querySelector(".grid__card-delete");
    this.btnCardLike = this._element.querySelector(".grid__card-like");
    this.link.src = this._image;
    this.title.textContent = this._title;
  }

  generateCard() {
    this.setCardProperties();
    this._setEventListeners();

    return this._element;
  }
}

export { Card };
