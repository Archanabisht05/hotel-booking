import React from "react";
import { useAppContext } from "../context/AppContext";

const HotelDetailsDrawer = () => {
  const { state, dispatch } = useAppContext();
  const hotel = state.selectedHotel;

  if (!hotel) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => dispatch({ type: "CLEAR_SELECTED_HOTEL" })}
          className="float-right text-red-500"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-64 object-cover"
          />
          <div>
            <p>{hotel.description}</p>
            <p className="mt-2">⭐ {hotel.starRating}</p>
            <p>{hotel.address}</p>
            <p>Email: {hotel.email}</p>
            <p>Phone: {hotel.phone}</p>
          </div>
        </div>
        {/* Add more hotel detail sections here */}
      </div>
    </div>
  );
};

export default HotelDetailsDrawer;
