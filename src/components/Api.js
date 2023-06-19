export default class Api {
  constructor() {
    this._urlBase = "https://around.nomoreparties.co/v1/web_es_05";
    this._authorization = "a0471525-76a0-442d-afa2-307d9b782544";
  }

  async fetcher(url, method, body) {
    const data = await fetch(url, {
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    });
    //console.log(data);

    if (data.ok) {
      return data.json();
    }
  }

  async getUserInfo() {
    let userInfo;
    try {
      userInfo = await this.fetcher(`${this._urlBase}/users/me`, "GET");
    } catch (err) {
      console.log(`se dio el sigueinte error: ${err}`);
    }
    return userInfo;
  }

  async getCards() {
    let cardsInfo;
    try {
      cardsInfo = await this.fetcher(`${this._urlBase}/cards`, "GET");
    } catch (err) {
      console.log(err);
    }
    return cardsInfo;
  }

  async editProfileInfo(data) {
    let profileInfo;
    try {
      profileInfo = await this.fetcher(
        `${this._urlBase}/users/me`,
        "PATCH",
        data
      );
    } catch (err) {
      console.log(err);
    }

    return profileInfo;
  }

  async addCard(data) {
    let newCard;
    try {
      newCard = await this.fetcher(`${this._urlBase}/cards`, "POST", data);
    } catch (err) {
      console.log(err);
    }
    return newCard;
  }

  async deleteCard(data, id) {
    let delCard;
    try {
      delCard = await this.fetcher(
        `${this._urlBase}/cards/${id}`,
        "DELETE",
        data
      );
    } catch (err) {
      console.log(err);
    }

    return delCard;
  }

  async likeCard(body, id) {
    let likeCard;
    try {
      likeCard = await this.fetcher(
        `${this._urlBase}/cards/likes/${id}`,
        "PUT",
        body
      );
    } catch (err) {
      console.log(err);
    }
    return likeCard;
  }

  async unlikeCard(body, id) {
    let unlikeCard;
    try {
      unlikeCard = await this.fetcher(
        `${this._urlBase}/cards/likes/${id}`,
        "DELETE",
        body
      );
    } catch (err) {
      console.log(err);
    }
    return unlikeCard;
  }

  async updateImg(data, link) {
    let newImage;
    try {
      newImage = await this.fetcher(
        `${this._urlBase}/users/me/avatar`,
        "PATCH",
        data
      );
    } catch (err) {
      console.log(err);
    }
    return newImage;
  }
}
