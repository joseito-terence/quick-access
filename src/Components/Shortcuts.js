import React, { useState, useEffect } from "react";
import "../Stylesheets/Shortcuts.css";
import { Tooltip } from "@material-ui/core";
import AddShortcut from "./AddShortcut";
import ShortcutMenu from "./ShortcutMenu";
import db, { auth } from "../firebase";

function Shortcuts() {
  const [shortcuts, setShortcuts] = useState([]);
  const [iconShape, setIconShape] = useState("");
  const uid = auth.currentUser.uid;

  useEffect(() => {
    const unsubscribe = db
      .doc(uid)
      .collection("shortcuts")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        setShortcuts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      
    return () => {
      unsubscribe();
    };
  }, [uid]);



  useEffect(() => {
    var unsubscribe;
    if (uid) {
      unsubscribe = db
        .doc(uid)
        .collection("preferences")
        .onSnapshot((snapshot) => {
          setIconShape(snapshot.docs[0].data().iconShape);
        });
    }
    return () => {
      if (uid) {
        unsubscribe();
      }
    };
  }, [uid]);

  return (
    <div className="shortcuts">
      {shortcuts.map((shortcut) => (
        <Tooltip title={shortcut.name} key={shortcut.id}>
          <div className="shortcut__wrapper">
            <div className={`shortcut ${iconShape}`} id={shortcut.id}>
              <a href={shortcut.url}>
                <img
                  src={
                    shortcut.imageUrl
                      ? shortcut.imageUrl
                      : `https://api.faviconkit.com/?size=144&url=${
                          shortcut.url
                        }`
                  }
                  alt=""
                />
              </a>
            </div>
            <span className="shortcut__more">
              <ShortcutMenu shortcutId={shortcut.id} />
            </span>
          </div>
        </Tooltip>
      ))}

      <div className={`shortcut addShortcutBtn ${iconShape}`}>
        <AddShortcut />
      </div>
    </div>
  );
}

export default Shortcuts;
