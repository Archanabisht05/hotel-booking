import React from "react";
import { useAppContext } from "../context/AppContext";

const FiltersSidebar = () => {
  const { state, dispatch } = useAppContext();

  const handleStarRatingChange = (e) => {
    const value = parseInt(e.target.value);
    const checked = e.target.checked;
    let updated = [...state.filters.starRating];
    if (checked) {
      updated.push(value);
    } else {
      updated = updated.filter((r) => r !== value);
    }
    dispatch({ type: "SET_FILTERS", payload: { starRating: updated } });
  };

  return (
    <div className="border p-4 rounded space-y-4">
      <h3 className="font-bold">Filters</h3>

      <div className="space-y-1">
        {[1, 2, 3, 4, 5].map((v) => (
          <label key={v} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              name="starRating"
              value={v}
              checked={state.filters.starRating.includes(v)}
              onChange={handleStarRatingChange}
            />
            <span>{v} Star</span>
          </label>
        ))}
      </div>

      <select
        name="boardTypes"
        onChange={(e) =>
          dispatch({
            type: "SET_FILTERS",
            payload: { boardTypes: [e.target.value] },
          })
        }
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
