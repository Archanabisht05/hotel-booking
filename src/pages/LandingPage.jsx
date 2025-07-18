import React from "react";
import SearchForm from "../components/SearchForm";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?hotel,resort,travel')",
      }}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow mb-6">
          Find the Best Hotels 🏨
        </h1>
        <SearchForm />
      </div>
    </div>
  );
};

export default LandingPage;
