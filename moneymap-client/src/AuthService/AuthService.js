import decode from "jwt-decode";
import axios from "axios";

export default class AuthService {
  constructor(domain) {
    this.domain = domain || this.baseurl + "/validate"; //this.baseurl = /users
    this.forgotpw = this.baseurl + "/auth/forgot-password"; //not active yet
    this.resetpw = this.baseurl + "/auth/change-password"; //not active yet
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  async login(email, password) {
    //console.log("login " + email + password);
    let payload = {
      username: email,
      password: password
    };

    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      await axios
        .post(
          "http://ec2-18-217-169-247.us-east-2.compute.amazonaws.com:3000/users/validate",
          payload,
          config
        )
        .then(response => {
          //console.log(response.data);
          if (response.data.status === "error") {
            alert("Wrong username or email");
          } else {
            //console.log(response.data.uid);
            this.setToken(response.data.token);
            this.setUser(response.data.uid);
          }
        })
        .then(success => {
          return success;
        });
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message);
    }
  }

  async forgotPassword(email) {
    let payload = {
      email: email
    };
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      let response = await axios.post(this.forgotpw, payload, config);
      //console.log(response.data);
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message);
    }
  }

  async resetPassword(email, resetToken, password) {
    let payload = {
      email: email,
      resetToken: resetToken,
      password: password
    };
    let config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      let response = await axios.post(this.resetpw, payload, config);
      //console.log(response.data);
    } catch (err) {
      console.log(err.response);
      alert(err.response.data.message);
    }
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token; //&& !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    sessionStorage.setItem("id_token", idToken);
  }
  setUser(uid) {
    // Saves user token to localStorage
    sessionStorage.setItem("user", uid);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return sessionStorage.getItem("id_token");
  }
  getUser() {
    // Retrieves the user token from localStorage
    return sessionStorage.getItem("user");
  }

  logout() {
    // Clear user token and profile data from localStorage
    sessionStorage.removeItem("id_token");
    sessionStorage.removeItem("user");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
