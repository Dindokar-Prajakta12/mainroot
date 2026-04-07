import { Line } from "react-chartjs-2";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,   // ✅ add
  LineElement,    // ✅ add
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,   // ✅ add
  LineElement,    // ✅ add
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Total Users",
        data: [20, 45, 60, 80],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        tension: 0.35,
        fill: true,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#e5e7eb" } },
    },
  };

  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard Overview</h2>

      <div className="cards">
        <div className="card">
          <h3>120</h3>
          <p>Total Users</p>
        </div>
        <div className="card">
          <h3>10</h3>
          <p>Managers</p>
        </div>
        <div className="card">
          <h3>110</h3>
          <p>Employees</p>
        </div>
      </div>

      <div className="chart-box">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;