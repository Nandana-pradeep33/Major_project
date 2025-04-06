import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register required components of Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function LineGraph({ data, timeRange }) {
  // If data is not available yet, show a loading message
  if (!data) {
    return (
      <div className="h-48 w-full flex justify-center items-center">
        <p className="text-gray-500">Loading Data...</p>
      </div>
    );
  }

  // Extract device labels and sum their active power values over time
  const labels = Object.keys(data[0]).filter((key) => key !== "time"); // Exclude 'time'
  let consumptionData = labels.map((label) =>
    data.reduce((sum, item) => sum + item[label], 0)
  );

  // Apply adjustments for 12hr selection
  /*
  if (timeRange === "12hr") {
    const freezerIndex = labels.findIndex((label) => label.includes("freezer"));
    const acIndex = labels.findIndex((label) => label.includes("Air_conditioner"));

    if (freezerIndex !== -1) consumptionData[freezerIndex] *= 0.97; // Reduce Freezer slightly (-3%)
    if (acIndex !== -1) consumptionData[acIndex] *= 1.73; // Increase Air Conditioner slightly (+3%)
  }
  */

  // Prepare data for Bar chart
  const chartData = {
    labels: labels.map((label) => label.replace("_active-power", "")), // Clean device names
    datasets: [
      {
        label: "Active Power Consumption (kWh)",
        data: consumptionData,
        backgroundColor: ["#a79aff", "#bffcc6", "#85e3ff", "#ffabab"], // Colors for bars
        borderWidth: 0,
        borderRadius: 8, // Curve bar corners
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw.toFixed(2)} Wh`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { 
          display: true, 
          text: "Devices",
          font: { size: 16, weight: "bold" }, // 🔥 Increase size & make bold
        },
        ticks: {
          font: { size: 14 }, // 🔥 Increase size & make bold
        },
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      y: {
        title: { 
          display: true, 
          text: "Active Power (Wh)",
          font: { size: 16, weight: "bold" }, // 🔥 Increase size & make bold
        },
        ticks: {
          display: false, // Hide Y-axis values (optional)
          font: { size: 14, weight: "bold" }, // 🔥 Increase size & make bold
        },
        grid: {
          drawTicks: false, // Optional: Hide tick marks
        },
        beginAtZero: true,
      },
    },
  };
  
  

  return (
    <div className="h-96 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default LineGraph;
