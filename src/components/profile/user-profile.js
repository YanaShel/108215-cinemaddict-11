import Abstract from "../abstract";

export default class UserProfile extends Abstract {
  constructor(user) {
    super();

    this._user = user;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
            <p class="profile__rating">${this._user}</p>
              <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
       </section>`
    ).trim();
  }
}
