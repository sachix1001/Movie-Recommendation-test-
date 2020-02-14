import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { selectMovie, setAllExceptSelected } from "./redux/redux";
import ContentBasedRecommender from "content-based-recommender";
import Box from "@material-ui/core/Box";
// import Popover from "@material-ui/core/Popover";
// import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

function Movies() {
  const allMovies = useSelector(state => state.allMovies);
  const selected = useSelector(state => state.selected);
  const allExceptSelected = useSelector(state => state.allExceptSelected);
  const dispatch = useDispatch();
  const recommender = new ContentBasedRecommender({
    minScore: 0,
    maxSimilarDocuments: 100
  });

  function movieSelected(movie) {
    dispatch(selectMovie(movie));
    const exceptSelected = allMovies.filter(elem => elem.id !== movie.id);
    dispatch(setAllExceptSelected(exceptSelected));
  }

  // create recommendation
  useEffect(() => {
    if (selected.length !== 0) {
      const filtered = allMovies.map(movie => {
        return { id: movie.id, content: movie.content };
      });
      // Create combined info of all selected movies
      let combinedContent = "";
      selected.forEach(movie => {
        combinedContent = combinedContent.concat(movie.content);
      });

      const favorite = {
        id: 0,
        content: combinedContent
      };
      filtered.push(favorite);

      // train
      recommender.train(filtered);

      //get top 10 similar items favorite
      const similarDocuments = recommender.getSimilarDocuments(0, 0, 3000);
      // order exceptedList
      const orderedMovies = [];
      similarDocuments.forEach(ranking => {
        const pick = allMovies.find(movie => movie.id === ranking.id);
        orderedMovies.push(pick);
      });

      dispatch(setAllExceptSelected(orderedMovies));
    }
    // setOrder(orderedMovies)
  }, [selected, allMovies]);

  const useStyles = makeStyles(theme => ({
    popover: {
      pointerEvents: "none"
    },
    paper: {
      padding: theme.spacing(1)
    }
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        flexWrap="wrap"
        p={1}
        m={0}
        // bgcolor="background.paper"
        // css={{ maxWidth: 100% }}
      >
        {allExceptSelected.map((movie, i) => {
          return (
            <>
              <Box p={0} bgcolor="grey.900" className="movie-card">
                <Card>
                  <CardMedia
                    component="img"
                    className="movie-img"
                    image={movie.poster}
                    key={movie.id}
                    alt={movie.title}
                    onClick={() => movieSelected(movie)}
                    aria-owns={open ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    // onMouseEnter={handlePopoverOpen}
                    // onMouseLeave={handlePopoverClose}
                  />
                </Card>
              </Box>
              {/* <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                  paper: classes.paper
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography>{e => e.target}</Typography>
              </Popover> */}
            </>
          );
        })}
      </Box>
    </div>
  );
}

export default Movies;
