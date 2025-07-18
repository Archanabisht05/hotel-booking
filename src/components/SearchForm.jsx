import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDestinations } from "../api/destinationApi";
import { useAppContext } from "../context/AppContext";

let debounceTimeout;

const SearchForm = ({ initialParams = {} }) => {
  const [destination, setDestination] = useState(
    initialParams.destination || ""
  );
  const [destinationDetails, setDestinationDetails] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [checkIn, setCheckIn] = useState(initialParams.checkIn || "");
  const [checkOut, setCheckOut] = useState(initialParams.checkOut || "");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [adultAges, setAdultAges] = useState([""]); // NEW STATE
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState([]);

  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  useEffect(() => {
    if (destination) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        fetchDestinations(destination).then((res) => {
          const destinations = res?.data || [];
          const labels = destinations.map((item) =>
            typeof item === "string" ? item : item?.name || item?.label || ""
          );
          setDestinationDetails(destinations);
          setSuggestions(labels);
        });
      }, 300);
    }
  }, [destination]);

  // Update adult age inputs on change
  useEffect(() => {
    setAdultAges(new Array(adults).fill("").map((_, i) => adultAges[i] || ""));
  }, [adults]);

  // Update child age inputs on change
  useEffect(() => {
    setChildAges(
      new Array(children).fill("").map((_, i) => childAges[i] || "")
    );
  }, [children]);

  const handleSearch = (e) => {
    e.preventDefault();

    const paxes = [
      ...adultAges.map((age) => ({ type: "AD", age: Number(age) })),
      ...childAges.map((age) => ({ type: "CH", age: Number(age) })),
    ];

    const occupancies = [
      {
        rooms,
        adults,
        children,
        paxes,
      },
    ];

    const payload = {
      stay: {
        checkIn,
        checkOut,
      },
      occupancies,
      destination,
    };

    dispatch({ type: "SET_SEARCH_PARAMS", payload });
    dispatch({
      type: "SET_SEARCH_DESTINATION_DETAILS",
      payload: destinationDetails,
    });

    navigate("/results", { state: payload });
  };

  return (
    <form className="space-y-4" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Destination"
        className="w-full border p-2"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        list="destinations"
        required
      />
      <datalist id="destinations">
        {suggestions.map((sug, idx) =>
          sug ? <option key={idx} value={sug} /> : null
        )}
      </datalist>

      <div className="flex gap-2">
        <input
          type="date"
          className="w-full border p-2"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full border p-2"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          min="1"
          className="w-1/3 border p-2"
          placeholder="Rooms"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
        />
        <input
          type="number"
          min="1"
          className="w-1/3 border p-2"
          placeholder="Adults"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
        />
        <input
          type="number"
          min="0"
          className="w-1/3 border p-2"
          placeholder="Children"
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
        />
      </div>

      {adultAges.map((age, index) => (
        <input
          key={`adult-${index}`}
          type="number"
          min="18"
          max="120"
          className="w-full border p-2"
          placeholder={`Adult ${index + 1} Age`}
          value={age}
          onChange={(e) => {
            const updated = [...adultAges];
            updated[index] = e.target.value;
            setAdultAges(updated);
          }}
        />
      ))}

      {childAges.map((age, index) => (
        <input
          key={`child-${index}`}
          type="number"
          min="0"
          max="17"
          className="w-full border p-2"
          placeholder={`Child ${index + 1} Age`}
          value={age}
          onChange={(e) => {
            const updated = [...childAges];
            updated[index] = e.target.value;
            setChildAges(updated);
          }}
        />
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
