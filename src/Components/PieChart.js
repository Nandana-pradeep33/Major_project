import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components of Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data }) {
  // If data is not available yet, show a loading message
  if (!data) {
    return (
      <div className="h-40 w-40 mx-auto">
        <p className="text-gray-500">Loading Data...</p>
      </div>
    );
  }

  // Extract labels (device names) and consumption values dynamically
  const labels = Object.keys(data[0]).filter((key) => key !== "time"); // Remove time column from labels
  const consumptionData = labels.map((label) =>
    data.reduce((sum, item) => sum + item[label], 0)
  ); // Sum the consumption for each device

  // Prepare data for Pie chart
  const chartData = {
    labels: labels.map((label) => label.replace("_active-power", "")), // Clean device names
    datasets: [
      {
        data: consumptionData, // Sum of consumption for each device
        backgroundColor: ["#a79aff", "#bffcc6", "#85e3ff", "#ffabab"], // 4 colors to match the number of devices
        borderColor: "#FFFFFF", // Border color for slices
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    plugins: {
      legend: {
        position: "right", // Move legend to the right
        labels: {
          usePointStyle: true, // Use circular points for colors
          pointStyle: "circle", // Set the shape of the legend's colors to circles
          boxWidth: 10, // Control the size of the circular point
          font: {
            size: 15, // Increase legend label font size
            weight: 700,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="h-64 w-85 mx-auto">
      <Pie data={chartData} options={options} /> {/* Render the Pie chart */}
    </div>
  );
}

export default PieChart;
