import {profileTitle, profileSubtitle} from "../utils/constants.js"


class UserInfo {
  constructor( { userName, userJob } ) {
    this._userName = userName;
    this._userJob = userJob;
  }


  // Returns an object with information about the user.
  getUserInfo() {
    return {userName: this._userName, userJob: this._userJob};
  }

  // Takes new user data and adds it on the page
  setUserInfo() {
    profileTitle.textContent = this._userName;
    profileSubtitle.textContent = this._userJob;
  }
}

export default UserInfo;
