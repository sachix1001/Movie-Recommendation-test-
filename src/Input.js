import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import { deleteSelected, selectMovieByTitle , selectMovie} from "./redux/redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";


const useStyles = makeStyles(theme => ({
  root: {
    padding: "0.5% 1%",
    display: "inline-flex",
    alignItems: "center",
    width: "30%",
    margin: "10px"
  },
  input: {
    marginLeft: theme.spacing(0),
    flex: 1
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const selected = useSelector(state => state.selected);
  const allMovies = useSelector(state => state.allMovies);
  const dispatch = useDispatch();

  async function selectMovie(title) {
    
    if (title) {
      const movie = await allMovies.find(movie => movie.title == title)
      dis(title)
    }
  }
  function dis(movie){
    dispatch(selectMovieByTitle(movie));

  }

  function unselect(movie) {
    dispatch(deleteSelected(movie));
  }

  return (
    <>
      <Paper component="form" className={classes.root}>
        <Autocomplete
          className={classes.input}
          id="free-solo-demo"
          freeSolo
          options={allMovies.map(option => option.title)}
          onChange={(e, value) => selectMovie(value)}
          renderInput={params => (
            <TextField
              {...params}
              label="Search Your Favorite Movie"
              margin="normal"
              variant="outlined"
              fullWidth
            />
          )}
        />
        {/* <IconButton
          type="button"
          className={classes.iconButton}
          aria-label="search"
        >
          <Divider className={classes.divider} orientation="vertical" />
          <SearchIcon />
        </IconButton> */}
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
