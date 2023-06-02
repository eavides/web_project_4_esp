import Api from "./Api.js";
export default class UserInfo {
  constructor(infoElement) {
    this._api = new Api();
    this.infoElement = infoElement;
  }

  async getUserInfo() {
    //console.log(this.infoElement);
    this.infoProfile = {};
    const userInfo = await this._api.getUserInfo();
    //console.log(userInfo);
    this.name = document.querySelector(this.infoElement.name);
    this.position = document.querySelector(this.infoElement.position);
    this.infoProfile.name = userInfo.name;
    this.infoProfile.about = userInfo.about;
    this.infoProfile.avatar = userInfo.avatar;
    return this.infoProfile;
  }
  async setUserInfo(data) {
    this.name.textContent = data.name;
    this.position.textContent = data.about;

    const editInfo = await this._api.editProfileInfo(data);
    console.log(editInfo);
  }
}
