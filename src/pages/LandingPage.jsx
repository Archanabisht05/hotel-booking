import React from "react";
import SearchForm from "../components/SearchForm";
import { useSearch } from "../context/SearchContext";

const LandingPage = () => {

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 m-auto"
      style={{
        backgroundImage: "url('/images/images1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-blue-300 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow mb-6">
          Book Your Dream Hotel
        </h1>
        <SearchForm />
      </div>
    </div>
  );
};

export default LandingPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DestinationInput from "../components/DestinationInput";
// import { useSearch } from "../context/SearchContext";

// export default function LandingPage() {
//   const { setSearchParams } = useSearch();
//   const [form, setForm] = useState({
//     destination: "",
//     checkIn: "",
//     checkOut: "",
//     rooms: "",
//     adults: "",
//     children: "",
//   });
//   const navigate = useNavigate();

//   console.log("LandingPage form state:", form);

//   const handleSearch = () => {
//     setSearchParams({
//       destination: form.destination,
//       checkIn: form.checkIn,
//       checkOut: form.checkOut,
//       occupancies: [
//         {
//           rooms: form.rooms,
//           adults: form.adults,
//           children: form.children,
//         },
//       ],
//     });
//     navigate("/results");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-slate-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl space-y-6">
//         <h1 className="text-3xl font-bold text-center">Search Hotels</h1>

//         <DestinationInput
//           value={form.destination}
//           onChange={(val) => setForm((f) => ({ ...f, destination: val }))}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="date"
//             value={form.checkIn}
//             onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="date"
//             value={form.checkOut}
//             onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         <div className="grid grid-cols-3 gap-4">
//           <input
//             type="number"
//             placeholder="Rooms"
//             min={1}
//             value={form.rooms === 0 ? "" : form.rooms}
//             onChange={(e) => {
//               const val = e.target.value;
//               setForm((f) => ({ ...f, rooms: val === "" ? 0 : +val }));
//             }}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="number"
//             placeholder="Adults"
//             min={1}
//             value={form.adults === 0 ? "" : form.adults}
//             onChange={(e) => setForm({ ...form, adults: +e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//           <input
//             type="number"
//             placeholder="Children"
//             min={0}
//             value={form.children === 0 ? "" : form.children}
//             onChange={(e) => setForm({ ...form, children: +e.target.value })}
//             className="border p-2 rounded w-full"
//           />
//         </div>

//         <button
//           onClick={handleSearch}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// }
