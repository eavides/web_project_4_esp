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
      body: body ?? JSON.stringify(body),
    });

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
    } catch (err) {}

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
}

const api = new Api();
(async () => {
  const userInfo = await api.editProfileInfo({
    name: "Jacques Cousteaufff",
    about: "Sailor, researcher",
  });
  console.log(userInfo);
})();
