import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchHotels } from "../api/hotelApi";
import { useAppContext } from "../context/AppContext";
import SearchForm from "../components/SearchForm";
import FiltersSidebar from "../components/FiltersSidebar";
import HotelCard from "../components/HotelCard";
import { X, Filter, MapPin } from "lucide-react";

const ResultsPage = () => {
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  const searchParams = location.state || state.searchParams;
  const destinationId = state.destinationDetails[0]?.id;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    if (searchParams) {
      const payloadData = {
        ...searchParams,
        reviewsFilter: [
          {
            minRate: state.filters.starRating[0],
            maxRate: state.filters.starRating[1],
            minReviewCount: 1,
            type: "TRIPADVISOR",
          },
        ],
      };

      dispatch({ type: "FETCH_HOTELS_START" });
      fetchHotels(payloadData, destinationId)
        .then((data) => {
          dispatch({ type: "FETCH_HOTELS_SUCCESS", payload: data });
        })
        .catch((err) => {
          dispatch({ type: "FETCH_HOTELS_ERROR", payload: err.message });
        });
    }
  }, [searchParams]);

  const handleClearFilters = () => {
    setShowFilters(false);
    setTimeout(() => setShowFilters(true), 100);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <div className="min-h-screen bg-white/10 ">
        {/* Header */}
        <header className="bg-white/90 shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">
                  {state.destinationDetails[0]?.name || "Hotel Search Results"}
                </h1>
              </div>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="flex items-center">
                  <Filter className="mr-2 h-5 w-5 text-gray-500" />
                  Filters
                </span>
                {isFilterOpen ? "Hide" : "Show"}
              </button>
            </div>

            {/* Sidebar Filters */}
            <aside
              className={`${
                isFilterOpen ? "block" : "hidden"
              } lg:block lg:col-span-1`}
            >
              <div className="bg-white/90 rounded-xl shadow-md p-4 sticky top-20">
                <FiltersSidebar />
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              <div className="bg-white/90 rounded-xl shadow-md p-4 mb-6">
                <SearchForm initialParams={searchParams} />
              </div>

              <div className="bg-white/90 rounded-xl shadow-md p-4 mb-6">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="mb-2 sm:mb-0">
                    <p className="text-sm text-gray-600">
                      Found {state.hotels?.meta?.total} hotels in{" "}
                      {state.destinationDetails[0]?.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select className="text-sm border-gray-300 rounded-md">
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Rating</option>
                      <option>Distance</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Hotel Results */}
              <div className="space-y-6">
                {state.loading ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, idx) => (
                      <div
                        key={idx}
                        className="bg-white/80 rounded-lg shadow-md overflow-hidden animate-pulse"
                      >
                        <div className="h-48 bg-gray-300"></div>
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                          <div className="h-8 bg-gray-300 rounded w-1/4 mt-4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : state.error ? (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <div className="flex">
                      <X className="h-5 w-5 text-red-400" />
                      <div className="ml-3 text-sm text-red-700">
                        Error loading hotels: {state.error}
                      </div>
                    </div>
                  </div>
                ) : state.hotels?.data?.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No hotels found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search criteria.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={handleClearFilters}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {state.hotels?.data?.map((hotel, idx) => (
                        <HotelCard key={idx} hotel={hotel} />
                      ))}
                    </div>

                    <div className="mt-8 text-center">
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Load More Hotels
                      </button>
                    </div>
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
