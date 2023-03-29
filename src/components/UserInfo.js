export default class UserInfo {
  constructor({ userNameSelector, userActivitySelector, userPhotoSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._activity = document.querySelector(userActivitySelector);
    this._userPhoto = document.querySelector(userPhotoSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo["username"] = this._name.textContent;
    this._userInfo["activity"] = this._activity.textContent;
    this._userInfo["user_id"] = this._name.getAttribute("user_id");
    return this._userInfo;
  }

  setUserInfo({ username, activity, userId }) {
    this._name.textContent = username;
    this._activity.textContent = activity;
    this._name.setAttribute("user_id", userId);
  }

  setUserPhoto(link) {
    this._userPhoto.src = link;
  }
}
