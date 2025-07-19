// src/components/Filters.jsx
import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Filters() {
  const { dispatch } = useAppContext();

  // merge partial filters into global state
  const handleFilter = (patch) => {
    dispatch({ type: "SET_FILTERS", payload: patch });
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-semibold text-lg">Filters</h2>

      {/* Min price */}
      <label className="block">
        <span>Min Price</span>
        <input
          type="number"
          className="border p-2 w-full"
          onChange={(e) =>
            handleFilter({
              extrafilter: { minRate: Number(e.target.value || 0) },
            })
          }
        />
      </label>

      {/* Max price */}
      <label className="block">
        <span>Max Price</span>
        <input
          type="number"
          className="border p-2 w-full"
          onChange={(e) =>
            handleFilter({
              extrafilter: { maxRate: Number(e.target.value || 100000) },
            })
          }
        />
      </label>

      {/* Star rating */}
      <label className="block">
        <span>Star Category</span>
        <select
          className="border p-2 w-full"
          onChange={(e) =>
            handleFilter({
              extrafilter: {
                minCategory: Number(e.target.value),
                maxCategory: Number(e.target.value),
              },
            })
          }
        >
          <option value="">All</option>
          {[1, 2, 3, 4, 5].map((s) => (
            <option key={s} value={s}>
              {s} Star
            </option>
          ))}
        </select>
      </label>

      {/* Price sort */}
      {/* <label className="block">
        <span>Sort Price</span>
        <select
          className="border p-2 w-full"
          onChange={(e) => handleFilter({ sort: e.target.value })}
        >
          <option value="">None</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </label> */}
    </div>
  );
}