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
export const setAllExceptSelected = movies => {
  return {
    type: "CREATE_EXCEPTSELECTED",
    movies
  };
};

export const deleteSelected = movie =>{
  return {
    type : 'DELETE_SELECTED',
    movie
  }
}

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
       return  movie.id !== action.movie.id
      })
      return {...state, selected : removed}

    }
  }
  return state;
};

export const store = createStore(reducer);
