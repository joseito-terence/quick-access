import React from "react";
import "../Stylesheets/Footer.css";
import { IconButton, Tooltip } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PreferencesDialog from "./PreferencesDialog";
import { auth } from "../firebase";

function Footer() {
  const logout = () => {
    auth.signOut();
  };

  return (
    <footer className="footer">
      <PreferencesDialog />

      <Tooltip title="Logout">
        <IconButton onClick={logout}>
          <LockIcon />
        </IconButton>
      </Tooltip>
    </footer>
  );
}

export default Footer;
