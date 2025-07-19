import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const HotelCard = ({ hotel }) => {
  const { dispatch } = useAppContext();
  const images = hotel.roomResponses?.[0]?.roomImageUrl || [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleViewDetails = () => {
    dispatch({ type: "SELECT_HOTEL", payload: hotel });
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const displayImage =
    images.length > 1
      ? images[currentImageIndex]
      : images[0] || "/hotel_image_not_available.jpg";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
      <div className="relative w-full h-48">
        <img
          src={displayImage}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 text-gray-800 hover:bg-white"
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1 text-gray-800 hover:bg-white"
            >
              ▶
            </button>
          </>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-gray-900">{hotel.name}</h3>
        <p className="text-sm text-gray-600">{hotel.address}</p>
        <p className="text-yellow-500 font-semibold">⭐ {hotel.rating}</p>
        <p className="text-green-700 font-semibold text-lg">
          From ₹{hotel.roomResponses?.[0]?.rateKeyResponses?.totalPrice}
        </p>
        <button
          className="mt-2 inline-block text-blue-600 hover:text-blue-800 underline"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
