import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { selectMovie, setAllExceptSelected } from "./redux/redux";
import ContentBasedRecommender from "content-based-recommender";
import Box from "@material-ui/core/Box";

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
    // console.log(movie)
    dispatch(selectMovie(movie));
    // console.log("allMovies", allMovies);
    // console.log("selected", selected);
    // console.log("allExceptSelected", allExceptSelected);
    const exceptSelected = allMovies.filter(elem => elem.id !== movie.id);
    dispatch(setAllExceptSelected(exceptSelected));
  }

  // create recommendation
  useEffect(() => {
    // filter not needed info
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
      const similarDocuments = recommender.getSimilarDocuments(0, 0, 2000);
      // order exceptedList
      const orderedMovies = [];
      similarDocuments.forEach(ranking => {
        const pick = allMovies.find(movie => movie.id === ranking.id);
        orderedMovies.push(pick);
      });
      console.log('similarDocuments',similarDocuments)
      console.log("orderedMovies", orderedMovies);
      dispatch(setAllExceptSelected(orderedMovies));
    }
    // setOrder(orderedMovies)
  }, [selected, allMovies]);

  // useEffect(() => {
  //   console.log("selected", selected);
  // }, [selected]);

  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        flexWrap="wrap"
        p={0}
        m={0}
        // bgcolor="background.paper"
        // css={{ maxWidth: 100% }}
      >
        {allExceptSelected.map((movie, i) => {
          return (
            <Box p={0} bgcolor="grey.900" className="movie-card">
              <div className="ranking">{i + 1}</div>
              <img
                className="movie-img"
                src={movie.poster}
                key={movie.id}
                onClick={e => movieSelected(movie)}
                alt={movie.title}
              />
            </Box>
          );
        })}
      </Box>
    </div>
  );
}
{
  /* // <div className="App">
    //   <div className="container">
        // {selected ? (
          <div className="favorite-movie-card memox">
            <img src={frame} className='frame' alt='frame'/>
            <h3 className="ranking" id='select'>
              Select Your Favorite Movie
            </h3>
            <img
              className="movie-img"
              id="favorite"
              src={selected.poster}
            />
          </div>
        ) : null}
        <div className="place-holder">
        </div>
        <div className="movie-card">
        </div>
        {allExceptSelected.map((movie, i) => {
          return (
            <div className="movie-card">
              <div className="ranking">{i + 1}</div>
              <img
                className="movie-img"
                src={movie.poster}
                key={movie.id}
                onClick={e => movieSelected(movie)}
                alt={movie.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
} */
}

export default Movies;
