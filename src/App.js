import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
}

export default App;


// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import ResultPage from "./pages/ResultPage";
// import { SearchProvider } from "./context/SearchContext";

// export default function App() {
//   return (
//     <SearchProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/results" element={<ResultPage />} />
//         </Routes>
//       </BrowserRouter>
//     </SearchProvider>
//   );
// }