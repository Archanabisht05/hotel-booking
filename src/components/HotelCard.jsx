// import React from "react";
// import { useAppContext } from "../context/AppContext";

// const HotelCard = ({ hotel }) => {
//   const { dispatch } = useAppContext();

//   const handleViewDetails = () => {
//     dispatch({ type: "SELECT_HOTEL", payload: hotel });
//   };

//   return (
//     <div className="border rounded p-4 shadow">
//       <img
//         src={hotel.image}
//         alt={hotel.name}
//         className="w-full h-48 object-cover mb-2"
//       />
//       <h3 className="font-bold text-lg">{hotel.name}</h3>
//       <p>{hotel.address}</p>
//       <p>⭐ {hotel.starRating}</p>
//       <p className="text-green-600 font-semibold">From ₹{hotel.lowestPrice}</p>
//       <button
//         className="text-blue-600 mt-2 underline"
//         onClick={handleViewDetails}
//       >
//         View Details
//       </button>
//     </div>
//   );
// };

// export default HotelCard;

import React, { useState } from "react";
import Modal from "./Modal";
import ImageSlider from "./ImageSlider";

export default function HotelCard({ hotel }) {
  const [open, setOpen] = useState(false);

  console.log("HotelCard hotel:", hotel);

  return (
    <>
      <div className="bg-white rounded shadow p-4 space-y-3">
        {/* <img
          src={hotel.hotelImageLinks[0].imageLink}
          alt={hotel.name}
          className="w-full h-48 object-cover rounded"
        /> */}
        <ImageSlider images={hotel.hotelImageLinks?.map((i) => i.imageLink)} />
        <h3 className="text-xl font-bold">{hotel.name}</h3>
        <p>{hotel.address}</p>
        <div>⭐ {hotel.rating}</div>
        {/* <p>
          From <span className="font-bold">${hotel.minRate}</span>
        </p> */}
        <ul className="flex space-x-2 text-sm text-gray-600">
          {(hotel.facilities || []).slice(0, 5).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Details
        </button>
      </div>

      {open && <Modal hotel={hotel} onClose={() => setOpen(false)} />}
    </>
  );
}
