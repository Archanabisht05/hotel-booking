import React from "react";
import SearchForm from "../components/SearchForm";

const LandingPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Find the best hotels</h1>
      <SearchForm />
    </div>
  );
};

export default LandingPage;
