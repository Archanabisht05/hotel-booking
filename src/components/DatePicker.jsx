import React from "react";

const DatePicker = ({ value, onChange }) => {
  return (
    <input
      type="date"
      className="w-full border p-2"
      value={value}
      onChange={onChange}
    />
  );
};

export default DatePicker;
