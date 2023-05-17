class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid__card")
      .cloneNode(true);

    return this._cardElement;
  }

  _setEventListeners() {
    this.link.addEventListener("click", (evt) => {
      this._handleCardClick(evt); //this._element
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
    this.link.alt = this._title;
    this.title.textContent = this._title;
  }

  generateCard() {
    this.setCardProperties();
    this._setEventListeners();

    return this._element;
  }
}

export { Card };
