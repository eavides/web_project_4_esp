class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    userid,
    handleLike,
    handleUnlike
  ) {
    this._dataCard = data;
    this._like = data.likes;
    this._title = data.name;
    this._image = data.link;
    this._idUser = data._id;
    this._user = userid;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleUnlike = handleUnlike;
    //this._userId = data.owner._id;
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
      this._handleCardClick(evt, this._element); //this._element
    });

    this.btnCardLike.addEventListener("click", (evt) => {
      evt.preventDefault();
      if (evt.target.classList.toggle("grid__card-like_active")) {
        //console.log("like");
        this._handleLike(evt);
      } else {
        // console.log("no like");
        this._handleUnlike(evt);
      }
    });

    this.btnCardDel.addEventListener("click", (evt) => {
      this._handleCardClick(evt, this._element);
      //this._element.remove();
    });
  }
  setCardProperties() {
    this._element = this._getTemplate();
    this.link = this._element.querySelector(".grid__card-image");
    this.title = this._element.querySelector(".grid__card-title");
    this.count = this._element.querySelector(".grid__card-count");
    this.btnCardDel = this._element.querySelector(".grid__card-delete");
    this.btnCardLike = this._element.querySelector(".grid__card-like");
    this.link.src = this._image;
    this.link.alt = this._title;
    this.title.textContent = this._title;
    this.count.textContent = this.likeCount();
    if (this._dataCard.owner) {
      this._userId = this._dataCard.owner._id;
    }
    //console.log(this._dataCard._id);
    if (this._dataCard._id) {
      this._dataCard.likes.map((item) => {
        if (item._id == this._dataCard.owner._id) {
          this.btnCardLike.classList.add("grid__card-like_active");
        }
      });
    }

    if (this._user != this._userId && this._dataCard.owner) {
      this.btnCardDel.remove();
    }
  }

  likeCount() {
    return (Array.isArray(this._like) && this._like.length) || 0;
  }

  generateCard() {
    this.setCardProperties();
    this._setEventListeners();
    return this._element;
  }
}

export { Card };
