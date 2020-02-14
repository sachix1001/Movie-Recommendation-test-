import { createStore } from "redux";

const initialState = {
  allMovies: [],
  selected: [],
  allExceptSelected: []
};

export const setAllMovies = movies => {
  return {
    type: "SET_MOVIES",
    movies
  };
};
export const selectMovie = movie => {
  return {
    type: "SELECT_MOVIE",
    movie
  };
};

export const selectMovieByTitle = movie => {
  return {
    type: "SELECT_BY_TITLE",
    movie
  };
};
export const setAllExceptSelected = movies => {
  return {
    type: "CREATE_EXCEPTSELECTED",
    movies
  };
};

export const deleteSelected = title => {
  return {
    type: "DELETE_SELECTED",
    title
  };
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "SET_MOVIES": {
      return { ...state, allMovies: action.movies };
    }
    case "SELECT_MOVIE": {
      return { ...state, selected: [...state.selected, action.movie] };
    }
    case "CREATE_EXCEPTSELECTED": {
      return { ...state, allExceptSelected: action.movies };
    }
    case "DELETE_SELECTED": {
      const removed = [...state.selected].filter(movie => {
        return movie.id !== action.title.id;
      });
      return { ...state, selected: removed };
    }
    case "SELECT_BY_TITLE": {
      let detail = "";
      state.allMovies.map(movie =>
        movie.title === action.movie ? (detail = movie) : null
      );
      return { ...state, selected: [...state.selected, detail] };
    }
  }
  return state;
};

export const store = createStore(reducer);
