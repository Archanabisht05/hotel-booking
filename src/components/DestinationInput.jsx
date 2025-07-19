import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DestinationInput({ value, onChange }) {
    console.log("DestinationInput value:", value);
  const [query, setQuery] = useState(value.name || "");
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!query) return;
    const timer = setTimeout(async () => {
      const res = await axios.post(
        "https://staging.travelyatra.com/api/unsecure/dummy/hotels/places",
        {
          paginationFilterRequest: {
            paginationAction: "INITIAL_PAGE",
            maxLimit: 10,
            sortingOrder: "ASC",
          },
          search: query,
          fetchStaticDestination: false,
        },
        { headers: { "x-tenant-id": "pml" } }
      );
      setItems(res.data.data || []);
      setShow(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Enter destination"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded w-full"
        onFocus={() => setShow(true)}
        onBlur={() => {}}
      />
      {show && items.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full max-h-60 overflow-y-auto">
          {items.map((it) => (
            <li
              key={it.code}
              onClick={() => {
                setQuery(it.name);
                onChange({ name: it.name, code: it.country.id });
                setShow(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {it.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
