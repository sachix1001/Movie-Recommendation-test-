import React, { useEffect } from "react";
import "./App.css";
import { setAllMovies, setAllExceptSelected } from "./redux/redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Movies from "./Movies";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/moviedata").then(res => {
      const moviesWithPoster = res.data.filter(movie =>
        axios.get(movie.poster).then(res => res.status) !== 404
      );
      dispatch(setAllMovies(res.data));
      dispatch(setAllExceptSelected(res.data));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <nav>
        <h1 id="title">Movie Recommendation</h1>
      </nav>
      <div className="wrapper">
        <Movies></Movies>
      </div>
    </div>
  );
}

export default App;
