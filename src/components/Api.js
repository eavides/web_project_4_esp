export default class Api {
  constructor() {
    this._urlBase = "https://around.nomoreparties.co/v1/web_es_05";
    this._authorization = "a0471525-76a0-442d-afa2-307d9b782544";
  }

  async fetcher(url, method, body) {
    console.log("fetched");

    const data = await fetch(url, {
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    });
    console.log(data);

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
    //console.log(userInfo);
    return userInfo;
  }

  async getCards() {
    let cardsInfo;
    try {
      cardsInfo = await this.fetcher(`${this._urlBase}/cards`, "GET");
    } catch (err) {}
    //console.log(cardsInfo);
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
    } catch (err) {}

    return profileInfo;
  }

  async addCard(data) {
    let newCard;
    try {
      newCard = await this.fetcher(`${this._urlBase}/cards`, "POST", data);
    } catch (err) {}
    return newCard;
  }

  async deleteCard(data, id) {
    //console.log("entro api");
    //console.log(id);
    let delCard;
    try {
      delCard = await this.fetcher(
        `${this._urlBase}/cards/${id}`,
        "DELETE",
        data
      );
    } catch (err) {}

    return delCard;
  }
}

// const api = new Api();
// (async () => {
//   const userInfo = await api.editProfileInfo({
//     name: "Jacques Cousteaufff",
//     about: "Sailor, researcher",
//   });
//   console.log(userInfo);
// })();
