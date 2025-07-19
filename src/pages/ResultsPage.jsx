import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchHotels } from "../api/hotelApi";
import { useAppContext } from "../context/AppContext";
import SearchForm from "../components/SearchForm";
import FiltersSidebar from "../components/FiltersSidebar";
import HotelCard from "../components/HotelCard";
import Filters from "../components/Filters";

const ResultsPage = () => {
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  const searchParams = location.state || state.searchParams;
  const destinationId = state?.destinationDetails[0]?.id;

  // useEffect(() => {
  //   if (searchParams) {
  //     dispatch({ type: "FETCH_HOTELS_START" });
  //     fetchHotels(searchParams, destinationId)
  //       .then((data) => {
  //         dispatch({ type: "FETCH_HOTELS_SUCCESS", payload: data });
  //       })
  //       .catch((err) => {
  //         dispatch({ type: "FETCH_HOTELS_ERROR", payload: err.message });
  //       });
  //   }
  // }, [searchParams]);

  // src/pages/ResultsPage.jsx

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
    if (!searchParams || !destinationId) return;

    dispatch({ type: "FETCH_HOTELS_START" });

    const payload = {
      ...searchParams,
      extrafilter: {
        minRate: state.filters?.extrafilter?.minRate ?? 0,
        maxRate: state.filters?.extrafilter?.maxRate ?? 100000,
        minCategory: state.filters.extrafilter.minCategory,
        maxCategory: state.filters.extrafilter.maxCategory,
      },
    };

    fetchHotels(payload, destinationId)
      .then((data) => dispatch({ type: "FETCH_HOTELS_SUCCESS", payload: data }))
      .catch((err) =>
        dispatch({ type: "FETCH_HOTELS_ERROR", payload: err.message })
      );
    }, 1000);
    return () => clearTimeout(debounceTimeout);
  }, [searchParams, destinationId, state.filters]);

  console.log({ state });
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-1">
        <Filters />
      </div>
      <div className="col-span-3">
        {/* <SearchForm initialParams={searchParams} /> */}
        {state.loading && <p>Loading...</p>}
        {state.error && <p className="text-red-500">{state.error}</p>}
        {state.hotels && state.hotels.data?.length <= 0 && !state.loading && (
          <div className="col-span-3 flex items-center justify-center h-96">
            <p className="text-2xl text-gray-500">No results found.</p>
          </div>
        )}
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
