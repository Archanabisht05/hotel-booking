import React from "react";
import SearchForm from "../components/SearchForm";

const LandingPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-8 shadow-xl w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 drop-shadow mb-6">
          Find the Best Hotels 🏨
        </h1>
        <SearchForm />
      </div>
    </div>
  );
};

export default LandingPage;
