import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

function Predictbill() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [estimatedBill, setEstimatedBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }
  
    setLoading(true);
    setError("");
    setEstimatedBill(null);
  
    const formattedDate = {
      day: selectedDate.getDate(),
      month: selectedDate.getMonth() + 1,
      year: selectedDate.getFullYear(),
    };
  
    try {
      const response = await axios.post(
        "https://58c8-35-204-222-22.ngrok-free.app/predict_bill",
        formattedDate,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
  
      // Handle "No enough data to calculate bill" response
      if (response.data.message) {
        setError(response.data.message); // Show the message
      } else {
        setEstimatedBill(response.data.estimated_remaining_bill);
      }
    } catch (err) {
      setError("No enough data to calculate bill.");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Predict Monthly Bill</h2>
          
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-md">
            <div>
              <label className="block font-medium text-gray-700">Select Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                className="border p-2 w-full mt-1 rounded-lg focus:ring focus:ring-blue-300"
                placeholderText="Choose a date"
                required
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100} // Shows 100 years in the dropdown
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict Bill"}
            </button>
          </form>

          {error && <p className="text-red-600 font-medium mt-4">{error}</p>}

          {estimatedBill !== null && (
            <div className="mt-6 p-4 bg-green-100 border border-green-500 rounded-lg">
              <p className="font-semibold text-green-700">Estimated Bill:</p>
              <p className="text-xl font-bold text-green-900">₹ {estimatedBill}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Predictbill;
