import "./SalesReport.css";

const SalesReport = () => {
  return (
    <div className="report-container">
      <h2 className="report-title">Sales Report</h2>

      {/* Filters */}
      <div className="report-filters">
        <select>
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>

        <button className="export-btn">Export CSV</button>
      </div>

      {/* Table */}
      <table className="report-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Orders</th>
            <th>Revenue</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01 Feb 2026</td>
            <td>32</td>
            <td>₹24,000</td>
            <td>Completed</td>
          </tr>
          <tr>
            <td>02 Feb 2026</td>
            <td>18</td>
            <td>₹14,500</td>
            <td>Completed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
