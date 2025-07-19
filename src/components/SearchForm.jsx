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
  const [adultAges, setAdultAges] = useState([""]);
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

  useEffect(() => {
    setAdultAges(new Array(adults).fill("").map((_, i) => adultAges[i] || ""));
  }, [adults]);

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

    const occupancies = [{ rooms, adults, children, paxes }];

    const payload = {
      stay: { checkIn, checkOut },
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
    <form onSubmit={handleSearch} className="space-y-6 text-white bg-blue-300 p-4">
      <div>
        <input
          type="text"
          placeholder="Destination"
          className="w-full bg-white/30 placeholder-white text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          list="destinations"
          required
        />
        <datalist id="destinations">
          {suggestions.map(
            (sug, idx) => sug && <option key={idx} value={sug} />
          )}
        </datalist>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="date"
          className="flex-1 bg-white/30 text-white p-3 rounded-md"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
        <input
          type="date"
          className="flex-1 bg-white/30 text-white p-3 rounded-md"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-4 flex-col md:flex-row">
        <input
          type="number"
          min="1"
          className="flex-1 bg-white/30 text-white p-3 rounded-md"
          placeholder="Rooms"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
        />
        <input
          type="number"
          min="1"
          className="flex-1 bg-white/30 text-white p-3 rounded-md"
          placeholder="Adults"
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
        />
        <input
          type="number"
          min="0"
          className="flex-1 bg-white/30 text-white p-3 rounded-md"
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
          className="w-full bg-white/30 text-white p-3 rounded-md"
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
          className="w-full bg-white/30 text-white p-3 rounded-md"
          placeholder={`Child ${index + 1} Age`}
          value={age}
          onChange={(e) => {
            const updated = [...childAges];
            updated[index] = e.target.value;
            setChildAges(updated);
          }}
        />
      ))}

      <div className="text-center pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold px-6 py-3 rounded-full shadow-md"
        >
          🔍 Search Hotels
        </button>
      </div>
    </form>
  );
};

export default SearchForm;



// import React from "react";
// import DestinationInput from "./DestinationInput";
// import { useSearch } from "../context/SearchContext";
// import { useNavigate } from "react-router-dom";

// export default function SearchForm() {
//   const { searchParams, setSearchParams } = useSearch();
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     navigate("/results", { replace: true });
//   };

//   return (
//     <div className="bg-white shadow p-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
//         <DestinationInput
//           value={searchParams.destination}
//           onChange={(val) =>
//             setSearchParams((s) => ({ ...s, destination: val }))
//           }
//         />
//         <input
//           type="date"
//           value={searchParams.checkIn}
//           onChange={(e) =>
//             setSearchParams((s) => ({ ...s, checkIn: e.target.value }))
//           }
//           className="border p-2 rounded"
//         />
//         <input
//           type="date"
//           value={searchParams.checkOut}
//           onChange={(e) =>
//             setSearchParams((s) => ({ ...s, checkOut: e.target.value }))
//           }
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           placeholder="Rooms"
//           min={1}
//           value={searchParams.occupancies[0].rooms}
//           onChange={(e) =>
//             setSearchParams((s) => ({
//               ...s,
//               occupancies: [{ ...s.occupancies[0], rooms: +e.target.value }],
//             }))
//           }
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           placeholder="Adults"
//           min={1}
//           value={searchParams.occupancies[0].adults}
//           onChange={(e) =>
//             setSearchParams((s) => ({
//               ...s,
//               occupancies: [{ ...s.occupancies[0], adults: +e.target.value }],
//             }))
//           }
//           className="border p-2 rounded"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// }