export default class UserInfo {
  constructor({ userNameSelector, userActivitySelector, userPhotoSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._activity = document.querySelector(userActivitySelector);
    this._userPhoto = document.querySelector(userPhotoSelector);
  }

  getUserInfo() {
    this._userInfo = {
      username: this._name.textContent,
      activity: this._activity.textContent,
      userId: this._userId,
      avatar: this._userPhoto.src,
    };

    return this._userInfo;
  }

  setUserInfo({ username, activity, userId, avatar }) {
    this._name.textContent = username;
    this._activity.textContent = activity;
    this._userId = userId;
    this.setUserPhoto(avatar);
  }

  setUserPhoto(link) {
    this._userPhoto.src = link;
  }
}
