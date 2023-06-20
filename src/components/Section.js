import Api from "./Api.js";
import { api } from "../index.js";
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._apiCard = api; //new Api();
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  addItem(element) {
    this._container.append(element);
  }

  async renderItems() {
    this.cardInfo = await this._apiCard.getCards();
    this.cardInfo.forEach((item) => {
      this._renderer(item);
    });
  }
}
