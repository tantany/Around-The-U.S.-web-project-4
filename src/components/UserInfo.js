import {profileTitle, profileSubtitle} from "../utils/constants.js"


class UserInfo {
  constructor( { userName, userJob } ) {
    this._userName = userName;
    this._userJob = userJob;
  }


  // Returns an object with information about the user.
  getUserInfo() {
    return {userName: this._userName, userJob: this._userJob}; //Every time I hit submit, this._userName & this._userJob are updated
                                                               //because in index.js I preform: new UserInfo(data); on handleFormSubmit
                                                               //so I think they are always up to date.
                                                               //I also checked by printing to console and it seems they are updated.
  }

  // Takes new user data and adds it on the page
  setUserInfo() {
    profileTitle.textContent = this._userName;
    profileSubtitle.textContent = this._userJob;
  }
}

export default UserInfo;
