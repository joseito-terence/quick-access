import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Shortcuts from "./Components/Shortcuts";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import Login from "./Components/Login";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: blue,
    },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(
        authUser
          ? {
              uid: authUser.uid,
              displayName: authUser.displayName,
              email: authUser.email,
              photoURL: authUser.photoURL,
            }
          : null
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        {!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Header user={user} />
            <Shortcuts />
            <Footer />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
