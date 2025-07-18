import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchHotels } from "../api/hotelApi";
import { useAppContext } from "../context/AppContext";
import SearchForm from "../components/SearchForm";
import FiltersSidebar from "../components/FiltersSidebar";
import HotelCard from "../components/HotelCard";

const ResultsPage = () => {
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  console.log(state);
  const searchParams = location.state || state.searchParams;
  const destinationId = state.destinationDetails[0].id;

  useEffect(() => {
    if (searchParams) {
      dispatch({ type: "FETCH_HOTELS_START" });
      fetchHotels(searchParams, destinationId)
        .then((data) => {
          dispatch({ type: "FETCH_HOTELS_SUCCESS", payload: data });
        })
        .catch((err) => {
          dispatch({ type: "FETCH_HOTELS_ERROR", payload: err.message });
        });
    }
  }, [searchParams]);
  console.log(state);
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-1">
        <FiltersSidebar />
      </div>
      <div className="col-span-3">
        <SearchForm initialParams={searchParams} />
        {state.loading && <p>Loading...</p>}
        {state.error && <p className="text-red-500">{state.error}</p>}
        {state.hotels && state.hotels.length === 0 && <p>No results found.</p>}
        <div className="grid gap-4">
          {state.hotels &&
            state.hotels?.data?.map((hotel, idx) => (
              <HotelCard key={idx} hotel={hotel} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
