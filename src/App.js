import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Landing";
import LoadingPage from "./Components/LoadingPage"; // Import your LoadingPage component
import Predictbill from "./Components/Predictbill";
import Recommendation from "./Components/Recommendation";

function App() {
  const [isLoading, setIsLoading] = useState(true); // State for loading

  useEffect(() => {
    // Simulate a loading delay (e.g., 3 seconds)
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <Router>
      {isLoading ? (
        <LoadingPage /> // Show LoadingPage while loading
      ) : (
        <Routes>
          {/* Route for the landing page */}
          <Route path="/" element={<LandingPage />} />
         
          {/* Add more routes here as needed */}
          <Route path="/predict" element={<Predictbill />} /> 
          <Route path="/recommendation" element={<Recommendation />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
