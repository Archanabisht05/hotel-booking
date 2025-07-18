import React from "react";
import { useAppContext } from "../context/AppContext";

const HotelCard = ({ hotel }) => {
  const { dispatch } = useAppContext();

  const handleViewDetails = () => {
    dispatch({ type: "SELECT_HOTEL", payload: hotel });
  };

  return (
    <div className="border rounded p-4 shadow">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-48 object-cover mb-2"
      />
      <h3 className="font-bold text-lg">{hotel.name}</h3>
      <p>{hotel.address}</p>
      <p>⭐ {hotel.starRating}</p>
      <p className="text-green-600 font-semibold">From ₹{hotel.lowestPrice}</p>
      <button
        className="text-blue-600 mt-2 underline"
        onClick={handleViewDetails}
      >
        View Details
      </button>
    </div>
  );
};

export default HotelCard;
