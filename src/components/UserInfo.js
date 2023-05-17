export default class UserInfo {
  constructor(infoElement) {
    this.infoElement = infoElement;
  }

  getUserInfo() {
    //console.log(this.infoElement);
    this.infoProfile = {};
    this.name = document.querySelector(this.infoElement.name);
    this.position = document.querySelector(this.infoElement.position);
    this.infoProfile.name = this.name.textContent;
    this.infoProfile.position = this.position.textContent;
    return this.infoProfile;
  }
  setUserInfo(data) {
    this.name.textContent = data.name;
    this.position.textContent = data.position;
  }
}
