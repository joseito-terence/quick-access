import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";
import firebase from "firebase";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const uid = firebase.auth().currentUser.uid;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addShortcut = () => {
    handleClose();
    console.log("Add shortcut");

    if (name && url) {
      db.doc(uid).collection("shortcuts").add({
        name: name,
        url: url,
        imageUrl: customImageUrl,
      });
    }
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a Website</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="NAME"
            type="text"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="url"
            label="URL"
            type="text"
            fullWidth
            onChange={(e) => setUrl(e.target.value)}
          />

          <TextField
            margin="dense"
            id="imageUrl"
            label="Custom Image URL [OPTIONAL]"
            type="text"
            fullWidth
            onChange={(e) => setCustomImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addShortcut} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
