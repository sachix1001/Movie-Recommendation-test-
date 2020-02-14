import React, { useEffect } from "react";
import "./App.css";
import { setAllMovies, setAllExceptSelected } from "./redux/redux";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Movies from "./Movies";
import Input from "./Input";
import dummy from "./dummyData.js";


function App() {
  const dispatch = useDispatch();

  const dummyWithContent = dummy.dummy.map(movie => {
    return {
      id: movie.id,
      content: movie.genres.concat(movie.overview, movie.keywords),
      poster: movie.poster,
      title: movie.title
    };
  });
  dispatch(setAllMovies(dummyWithContent));
  dispatch(setAllExceptSelected(dummyWithContent));

  useEffect(() => {
    axios.get("/api/moviedata").then(res => {
      const movies = res.data
        // .filter(movie =>
        //   axios
        //     .get(movie.poster)
        //     .then(res => {
        //       return true;
        //     })
        //     .catch(error => false)
        // )
        .map(movie => {
          return {
            id: movie.id,
            content: movie.genres.concat(movie.overview, movie.keywords),
            poster: movie.poster,
            title: movie.title
          };
        });
      dispatch(setAllMovies(movies));
      dispatch(setAllExceptSelected(movies));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <nav className='nav-bar'>
        <h1 id="title">Movie Recommendation</h1>
      </nav>
        <Input />
      <div className="wrapper">
        <Movies></Movies>
      </div>
    </div>
  );
}

export default App;
