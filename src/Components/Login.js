import React from "react";
import "../Stylesheets/Login.css";
import db, { auth, provider } from "../firebase";
import { Button } from "@material-ui/core";
import initial_shortcuts from "../initial_shortcuts";

function Login() {
  const setupDB = (uid) => {
    db.doc(uid).set({ uid: uid });

    initial_shortcuts.forEach((shortcut) => {
      db.doc(uid).collection("shortcuts").add({
        name: shortcut.name,
        url: shortcut.url,
        imageUrl: shortcut.imageUrl,
      });
    });

    db.doc(uid).collection("preferences").doc("prefs").set({
      greetings: true,
      backgroundImage: true,
      joke: true,
      joke_isProgrammingJoke: false,
      iconShape: "square",
    });
  };

  const checkIfUserExists = (uid) => {
    db.doc(uid)
      .get()
      .then(function (doc) {
        if (!doc.exists) {
          //console.log("not found");
          setupDB(uid);
        } else {
          console.log("user exists!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        //console.log(result.user.uid);
        checkIfUserExists(result.user.uid);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="logo512.png" alt="" />
        <div className="login__text">
          <h1>Sign in to Quick Access</h1>
          <p>
            <i>"Store once, access anywhere."</i>
          </p>
        </div>

        <Button
          onClick={signIn}
          startIcon={
            <img
              className="gIcon"
              src="https://developers.google.com/identity/images/g-logo.png"
              height="25"
              width="25"
              alt=""
            />
          }
          variant="contained"
          color="default"
        >
          Sign In With Google
        </Button>

        <p className="login__mark">Developed By: Joseito Fernandes</p>
      </div>
    </div>
  );
}

export default Login;
