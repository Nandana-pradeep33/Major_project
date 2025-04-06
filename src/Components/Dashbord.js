import React, { useState, useEffect } from "react";
import LineGraph from "./LineGraph";
import PieChart from "./PieChart";

function Dashboard() {
  const [consumptionData, setConsumptionData] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState("6hr");

  // Function to convert time range string to number
  const getHoursFromRange = (range) => {
    if (range === "6hr") return 6;
    if (range === "12hr") return 12;
    if (range === "24hr") return 24;
    return 6; // default fallback
  };

  useEffect(() => {
    const fetchConsumptionData = async () => {
      const hours = getHoursFromRange(selectedTimeRange);
      try {
        const response = await fetch(
          `https://b805-35-204-222-22.ngrok-free.app/get_power_data?hours=${hours}`,
          {
            headers: {
              'ngrok-skip-browser-warning': '69420',
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response");
        }
        const data = await response.json();
        setConsumptionData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchConsumptionData();
  }, [selectedTimeRange]); // 🔁 Re-run when time range changes

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">
        Consumption Trends →
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {/* Alert Box */}
        <div className="col-span-3 md:col-span-1 bg-red-100 border-l-4 border-red-600 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-red-600 font-bold">Alert !!!</h3>
            <button className="text-red-600 font-bold">✕</button>
          </div>
          <p className="text-sm mt-2">
            Your energy consumption between <strong>6-10PM</strong> has
            increased by <strong>15%</strong> this week. Review appliance
            usage.
          </p>
        </div>

        {/* Pie Chart */}
        <div className="col-span-3 md:col-span-1 bg-white rounded-lg shadow p-2">
          <h3 className="text-lg font-semibold mb-4">Device Consumption</h3>
          <PieChart data={consumptionData} />
        </div>

        {/* Line Graph */}
        <div className="col-span-3 md:col-span-2 bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Consumption Over Last</h3>
            <select
              className="border rounded-lg p-1"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <option value="6hr">6 hr</option>
              <option value="12hr">12 hr</option>
              <option value="24hr">24 hr</option>
            </select>
          </div>
          <LineGraph data={consumptionData} timeRange={selectedTimeRange} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
