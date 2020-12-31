import React, { useState, useEffect } from "react";
import "../Stylesheets/Header.css";
import Avatar from "@material-ui/core/Avatar";
import db, { auth } from "../firebase";

function Header({ user }) {
  const [prefs, setPrefs] = useState({});
  const [joke, setJoke] = useState({});
  const uid = auth.currentUser.uid;

  const getGreetings = () => {
    const hrs = new Date().getHours();

    var greet;

    if (hrs < 12) greet = "Good Morning";
    else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon";
    else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";

    return `${greet}, ${user.displayName.split(" ")[0]}`;
  };

  useEffect(() => {
    var unsubscribe;
    if (uid) {
      unsubscribe = db
        .doc(uid)
        .collection("preferences")
        .onSnapshot((snapshot) => {
          setPrefs(snapshot.docs[0].data());
        });
    }
    return () => {
      if (uid) {
        unsubscribe();
      }
    };
  }, [uid]);

  useEffect(() => {
    fetch(
      `https://official-joke-api.appspot.com/jokes/${
        prefs.joke_isProgrammingJoke ? "programming/" : ""
      }random`
    )
      .then((response) => response.json())
      .then((data) => {
        setJoke(prefs.joke_isProgrammingJoke ? data[0] : data);
      })
      .catch((error) => console.log(error));
  }, [prefs.joke_isProgrammingJoke]);

  return (
    <header className="header">
      <Avatar src={user.photoURL} />
      <div className="header__greetings">
        <h1>{prefs.greetings ? getGreetings() : "Quick Access"}</h1>

        {prefs.joke ? (
          <i>
            {joke.setup} <br /> {joke.punchline}
          </i>
        ) : null}
      </div>

      {/* Set body background image from api */}
      <style>
        {prefs.backgroundImage
          ? `body{ background-image: url("https://source.unsplash.com/1600x900/?wallpapers") }`
          : " "}
      </style>
    </header>
  );
}

export default Header;
