import React from "react";
import { useAppContext } from "../context/AppContext";

const FiltersSidebar = () => {
  const { state, dispatch } = useAppContext();

  // star currently selected (number | undefined)
  const star = state.filters?.extrafilter?.minCategory;

  // generic change handler for text / range / select
  const handleChange = (e) => {
    dispatch({
      type: "SET_FILTERS",
      payload:
        e.target.name === "priceRange"
          ? { [e.target.name]: Number(e.target.value) }
          : { [e.target.name]: e.target.value },
    });
  };

  // helper to set star rating
  const updateFilter = (patch) => {
    dispatch({
      type: "SET_FILTERS",
      payload: {
        extrafilter: { ...state.filters?.extrafilter, ...patch },
      },
    });
  };

  return (
    <div className="border p-4 rounded space-y-4">
      <h3 className="font-bold">Filters</h3>

      {/* Price range */}
      <div>
        <label className="block text-sm mb-1">Price Range</label>
        <input
          type="range"
          name="priceRange"
          min="0"
          max="100000"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Star rating buttons */}
      <label className="block font-medium">Star Rating</label>
      <div className="flex gap-2 mt-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => updateFilter({ minCategory: s, maxCategory: s })}
            className={`w-8 h-8 rounded border ${
              star === s ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Board type */}
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
