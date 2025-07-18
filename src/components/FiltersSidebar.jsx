import React from "react";
import { useAppContext } from "../context/AppContext";

const FiltersSidebar = () => {
  const { state, dispatch } = useAppContext();

  const handleChange = (e) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <div className="border p-4 rounded space-y-4">
      <h3 className="font-bold">Filters</h3>
      <input
        type="range"
        name="priceRange"
        min="0"
        max="100000"
        onChange={handleChange}
      />
      <select
        name="starRating"
        onChange={handleChange}
        className="w-full border p-2"
      >
        <option value="">Star Rating</option>
        {[1, 2, 3, 4, 5].map((v) => (
          <option key={v} value={v}>
            {v} Star
          </option>
        ))}
      </select>
      <select
        name="boardTypes"
        onChange={handleChange}
        className="w-full border p-2"
      >
        <option value="">Board Type</option>
        <option value="AI">All Inclusive</option>
        <option value="BB">Bed & Breakfast</option>
        <option value="FB">Full Board</option>
        <option value="HB">Half Board</option>
        <option value="RO">Room Only</option>
      </select>
    </div>
  );
};

export default FiltersSidebar;
