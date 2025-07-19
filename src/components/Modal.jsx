import React from "react";

export default function Modal({ hotel, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
        <button onClick={onClose} className="float-right text-2xl">
          &times;
        </button>

        <h2 className="text-2xl font-bold">{hotel.name}</h2>

        <div className="grid grid-cols-2 gap-2">
          {(hotel.imageGallery || []).map((img, idx) => (
            <img key={idx} src={img} alt="" className="rounded" />
          ))}
        </div>

        <p>{hotel.description}</p>

        <h3 className="font-semibold">Rooms & Rates</h3>
        <ul>
          {(hotel.rooms || []).map((r) => (
            <li key={r.code} className="border-b py-2">
              <strong>{r.name}</strong> – ${r.rates[0]?.net || ""} (
              {r.rates[0]?.boardName || ""})
            </li>
          ))}
        </ul>

        <h3 className="font-semibold">Facilities</h3>
        <ul className="list-disc list-inside">
          {(hotel.facilities || []).map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h3 className="font-semibold">Contact</h3>
        <p>
          {hotel.email} / {hotel.phone}
        </p>
      </div>
    </div>
  );
}