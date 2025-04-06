import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate

function Sidebar() {
  const navigate = useNavigate(); // Define navigate inside the function
  const location = useLocation(); 
  
  return (
    <div className="bg-white mt-5 shadow-md p-4 w-64 h-screen" style={{height:"118vh"}}>
      <div className="flex flex-col space-y-4">

      <button className={`p-2 bg-purple-100 rounded-lg ${
            location.pathname === "/" ? "bg-purple-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => navigate("/")}
        >Consumption Trends</button>

       
        <button
          className={`p-2 rounded-lg hover:bg-purple-100 ${
            location.pathname === "/predict" ? "bg-purple-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => navigate("/predict")}
        >
          Predict Bill
        </button>
        <button className={`p-2 rounded-lg hover:bg-purple-100 ${
            location.pathname === "/recommendation" ? "bg-purple-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => navigate("/recommendation")}>
          Recommendations <span className="ml-2 bg-red-500 text-white text-sm rounded-full px-2">1</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
