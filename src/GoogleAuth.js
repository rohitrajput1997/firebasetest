/** @format */

import { Avatar, Button } from "@material-ui/core";
import jwtDecode from "jwt-decode";
import React, { Component } from "react";
import firebase from "./FireBase";
import { popUp } from "./Utils/utils";

class GoogleAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
    this.button = React.createRef();
  }
  componentDidMount = () => {
    this.handleFetchdata();
  };

  handleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((response) => {
        this.handleFetchdata();
      })
      .catch((error) => {
        popUp(error.message, "error", true);
      });
  };

  handleFetchdata = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ url: user });
        console.log(
          user.getIdToken(true).then((jwtToken) => {
            const session = jwtDecode(jwtToken);
            console.log(session.exp);
          })
        );
      } else {
        setTimeout(() => {
          this.handleSignIn();
        }, 1000);
      }
    });
  };
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        popUp("See you Again", "success", true);
        this.handleFetchdata();
        this.setState({ url: "" });
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  render() {
    const { url } = this.state;
    return (
      <div>
        <Avatar src={url.photoURL} />
        <Button onClick={this.signOut}>Signout</Button>
        <br />
      </div>
    );
  }
}
export default GoogleAuth;
