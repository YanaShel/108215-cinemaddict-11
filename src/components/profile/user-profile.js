import AbstractComponent from "../abstract-component";
import {getRang} from "../../util/common";

export default class UserProfile extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
            <p class="profile__rating">${getRang(this._films)}</p>
              <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
       </section>`
    ).trim();
  }


}
