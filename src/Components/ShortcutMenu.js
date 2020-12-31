import React from "react";
import db from "../firebase";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import firebase from "firebase";

export default function SimpleMenu({ shortcutId }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const uid = firebase.auth().currentUser.uid;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /*        DELETE SHORTCUT         */
  const shortcut_delete = () => {
    handleClose();

    db.doc(uid).collection("shortcuts").doc(shortcutId).delete();
  };

  /* ADD CUSTOM IMAGE */
  const addCustomImage = () => {
    handleClose();

    const imageUrl = prompt("Type or Paste Custom Image URL");

    if (imageUrl) {
      db.doc(uid)
        .collection("shortcuts")
        .doc(shortcutId)
        .update({ imageUrl: imageUrl });
    }
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={addCustomImage}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>Add Custom Image</ListItemText>
        </MenuItem>

        <MenuItem onClick={shortcut_delete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Remove</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
