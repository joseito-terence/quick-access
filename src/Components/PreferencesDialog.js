import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  FormControlLabel,
  IconButton,
  Tooltip,
  Switch,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Checkbox,
} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SettingsIcon from "@material-ui/icons/Settings";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import db, { auth } from "../firebase";

export default function PreferencesDialog() {
  /* The dialog */
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const uid = auth.currentUser.uid;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [state, setState] = useState({});

  useEffect(() => {
    var unsubscribe;
    if (uid) {
      unsubscribe = db
        .doc(uid)
        .collection("preferences")
        .onSnapshot((snapshot) => {
          setState(snapshot.docs[0].data()); // sync local state with db state.
        });
    }

    return () => {
      if (uid) {
        unsubscribe();
      }
    };
  }, [uid]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

    db.doc(uid)
      .collection("preferences")
      .doc("prefs")
      .update({ [event.target.name]: event.target.checked });
  };

  /* Radio Buttons - icon shape */
  const handleIconShapeChange = (event) => {
    setState({ ...state, iconShape: event.target.value });

    db.doc(uid)
      .collection("preferences")
      .doc("prefs")
      .update({ iconShape: event.target.value });
  };

  return (
    <div>
      <Tooltip title="Preferences">
        <IconButton onClick={handleClickOpen}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Preferences</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>

          <MuiSwitch
            name="greetings"
            label="Greeting"
            value={state.greetings}
            handleChange={handleChange}
          />
          <br />
          {/* BACKGROUND IMAGE */}
          <MuiSwitch
            name="backgroundImage"
            label="Background Image"
            value={state.backgroundImage}
            handleChange={handleChange}
          />
          <br />
          <MuiSwitch
            name="joke"
            label="Joke of the day"
            value={state.joke}
            handleChange={handleChange}
          />
          <br />
          <div style={{ marginLeft: "30px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.joke_isProgrammingJoke}
                  onChange={handleChange}
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  name="joke_isProgrammingJoke"
                  color="primary"
                  disabled={!state.joke}
                />
              }
              label="Programming Jokes Only"
            />
          </div>

          {/* ICON SHAPE */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Icon Shape</FormLabel>
            <RadioGroup
              row
              aria-label="icoShape"
              name="iconShape"
              value={state.iconShape}
              onChange={handleIconShapeChange}
            >
              <FormControlLabel
                value="square"
                control={<Radio color="primary" />}
                label="Square"
              />
              <FormControlLabel
                value="circle"
                control={<Radio color="primary" />}
                label="Circle"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Close
          </Button>
          {/* <Button onClick={handleClose} color="primary" variant="contained">
            Apply
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

/*
 * Material-Ui Switch Component
 */
const MuiSwitch = ({ name, value, handleChange, label }) => (
  <FormControlLabel
    control={
      <Switch
        checked={value}
        onChange={handleChange}
        name={name}
        color="primary"
      />
    }
    label={label}
  />
);
