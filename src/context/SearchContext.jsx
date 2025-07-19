import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    occupancies: [{ rooms: 1, adults: 1, children: 0 }],
  });

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <SearchContext.Provider
      value={{
        searchParams,
        setSearchParams,
        hotels,
        setHotels,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);