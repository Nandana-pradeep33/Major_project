import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

function Recommendation() {
  const [dailyRecommendation, setDailyRecommendation] = useState("");
  const [hourlyRecommendation, setHourlyRecommendation] = useState([]); // Store as array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = "https://45a7-34-16-200-140.ngrok-free.app/get_recommendation"; // Replace with your actual ngrok URL

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl, {
          headers: { "ngrok-skip-browser-warning": "69420" },
        });

        setDailyRecommendation(response.data.daily_summary); // Use daily_summary instead of daily
        setHourlyRecommendation(response.data.hourly_recommendations); // Store as array
      } catch (err) {
        setError("Error fetching recommendations. Try again later.");
      }
      setLoading(false);
    };
    fetchRecommendations();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar activePage="recommendation" />
        <div className="flex-1 p-4">
          <h2 className="text-xl font-semibold mb-4">Energy Usage Recommendations</h2>

          {loading ? (
            <p>Loading recommendations...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              {/* Daily Recommendation Section */}
              <div className="mt-4 p-4 bg-blue-100 border border-blue-500">
                <p className="font-semibold">Weekly Recommendation:</p>
                <p className="text-lg">{dailyRecommendation}</p>
              </div>

              {/* Hourly Recommendation Table */}
              <div className="mt-4 p-4 bg-yellow-100 border border-yellow-500">
                <p className="font-semibold">Hourly Recommendation:</p>
                
                <table className="w-full border-collapse border border-yellow-500 mt-2">
                  <thead>
                    <tr className="bg-yellow-300">
                      <th className="border border-yellow-600 p-2">Hour</th>
                      <th className="border border-yellow-600 p-2">Device</th>
                      <th className="border border-yellow-600 p-2">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hourlyRecommendation.map((rec, index) =>
                      Object.entries(rec.recommendations).map(([device, recommendation], idx) => (
                        <tr key={`${index}-${idx}`} className="border-b border-yellow-400">
                          {idx === 0 && (
                            <td
                              className="border border-yellow-600 p-2 text-center"
                              rowSpan={Object.keys(rec.recommendations).length}
                            >
                              {rec.hour}
                            </td>
                          )}
                          <td className="border border-yellow-600 p-2">{device}</td>
                          <td className="border border-yellow-600 p-2">{recommendation}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
