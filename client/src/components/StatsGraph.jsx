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
    ],
    datasets: [
      {
        label: "Platform Statistics",
        data: [
          stats.totalUsers,
          stats.totalEmployers,
          stats.totalJobseekers,
          stats.totalMentors,
          stats.totalApplications,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
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
    <div className="space-y-8">
      <div>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
};

export default StatsGraph;
