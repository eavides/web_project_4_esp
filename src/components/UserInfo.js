import Api from "./Api.js";
import { api } from "../index.js";
export default class UserInfo {
  constructor(infoElement) {
    this._api = api; //new Api();
    this.infoElement = infoElement;
  }

  async getUserInfo() {
    this.infoProfile = {};
    const userInfo = await this._api.getUserInfo();
    this.name = document.querySelector(this.infoElement.name);
    this.position = document.querySelector(this.infoElement.position);
    this.infoProfile.name = userInfo.name;
    this.infoProfile.about = userInfo.about;
    this.infoProfile.avatar = userInfo.avatar;
    this.infoProfile.userId = userInfo._id;
    return this.infoProfile;
  }
  async setUserInfo(data) {
    this.name.textContent = data.name;
    this.position.textContent = data.about;

    const editInfo = await this._api.editProfileInfo(data);
  }
}
