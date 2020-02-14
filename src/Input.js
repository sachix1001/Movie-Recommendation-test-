import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import { deleteSelected } from "./redux/redux";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "inline-flex",
    alignItems: "center",
    width: 400,
    margin: "8px"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const selected = useSelector(state => state.selected);
  const dispatch = useDispatch();

  function unselect(movie){
    
    dispatch(deleteSelected(movie))
  }

  return (
    <>
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          {/* <MenuIcon /> */}
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search Your Favorite Movie"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton
          type="button"
          className={classes.iconButton}
          aria-label="search"
        >
          <Divider className={classes.divider} orientation="vertical" />
          <SearchIcon />
        </IconButton>
      </Paper>
      <div>
        {selected.map(movie => (
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CancelIcon />}
            onClick={() => unselect(movie)}
          >
            {movie.title}
          </Button>
        ))}
      </div>
    </>
  );
}
