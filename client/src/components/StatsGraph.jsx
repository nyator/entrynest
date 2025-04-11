import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatsGraph = ({ stats }) => {
  const barChartData = {
    labels: [
      "Total Users",
      "Employers",
      "Jobseekers",
      "Mentors",
      "Applications",
      "Jobs Posted", // Add label for jobs posted
    ],
    datasets: [
      {
        label: "Platform Statistics",
        data: [
          stats.totalUsers || 0,
          stats.totalEmployers || 0,
          stats.totalJobseekers || 0,
          stats.totalMentors || 0,
          stats.totalApplications || 0,
          stats.totalJobsPosted || 0, // Add data for jobs posted
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 159, 64, 0.6)", // Add color for jobs posted
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)", // Add border color for jobs posted
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="space-y-1">
        <Bar data={barChartData} options={barChartOptions} />
      </div>
  );
};

export default StatsGraph;
