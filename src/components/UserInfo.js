export default class UserInfo {
  constructor({ userNameSelector, userActivitySelector }) {
    this._name = document.querySelector(userNameSelector);
    this._activity = document.querySelector(userActivitySelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo["username"] = this._name.textContent;
    this._userInfo["activity"] = this._activity.textContent;
    this._userInfo["user_id"] = this._name.getAttribute("user_id");
    return this._userInfo;
  }

  setUserInfo(item) {
    this._name.textContent = item.username;
    this._activity.textContent = item.activity;
    this._name.setAttribute("user_id", item.userId);
  }
}
