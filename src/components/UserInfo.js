import {profileTitle, profileSubtitle, profilePicture} from "../utils/constants.js"


class UserInfo {
  constructor( { userName, userJob, userAvatar, userId } ) {
    this._userName = userName;
    this._userJob = userJob;
    this._userAvatar = userAvatar;
    this._userId = userId;
  }

  // Returns an object with information about the user.
  getUserInfo() {
    return {userName: this._userName, userJob: this._userJob, userAvatar: this._userAvatar, userId: this._userId};
  }

  // Takes new user data and adds it on the page
  setUserInfo() {
    profileTitle.textContent = this._userName;
    profileSubtitle.textContent = this._userJob;
    profilePicture.src = this._userAvatar;
  }

  updateUserInfo(data) {
    this._userName = data.userName;
    this._userJob = data.userJob;
  }

  updateUserAvatar(link) {
    this._userAvatar = link;
  }
}

export default UserInfo;
