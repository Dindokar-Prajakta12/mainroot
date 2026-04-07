import { Line } from "react-chartjs-2";
import "./Analytics.css";

const Analytics = () => {
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
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="dashboard">
      <h2 className="page-title">Analytics</h2>

      <div className="chart-box">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Analytics;