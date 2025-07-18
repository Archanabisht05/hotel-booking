import React, { createContext, useReducer, useContext } from "react";

const AppContext = createContext();

const initialState = {
  searchParams: null,
  hotels: [],
  filters: {
    priceRange: [0, 100000],
    starRating: [],
    boardTypes: [],
    reviews: [],
  },
  destinationDetails: [],
  selectedHotel: null,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_PARAMS":
      return { ...state, searchParams: action.payload };
    case "SET_SEARCH_DESTINATION_DETAILS":
      return { ...state, destinationDetails: action.payload };
    case "FETCH_HOTELS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_HOTELS_SUCCESS":
      return { ...state, loading: false, hotels: action.payload };
    case "FETCH_HOTELS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SELECT_HOTEL":
      return { ...state, selectedHotel: action.payload };
    case "CLEAR_SELECTED_HOTEL":
      return { ...state, selectedHotel: null };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
