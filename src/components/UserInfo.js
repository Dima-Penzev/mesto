export default class UserInfo {
  constructor({ userNameSelector, userActivitySelector }) {
    this._name = document.querySelector(userNameSelector);
    this._activity = document.querySelector(userActivitySelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo["username"] = this._name.textContent;
    this._userInfo["activity"] = this._activity.textContent;
    return this._userInfo;
  }

  setUserInfo(item) {
    this._name.textContent = item.username;
    this._activity.textContent = item.activity;
  }
}
