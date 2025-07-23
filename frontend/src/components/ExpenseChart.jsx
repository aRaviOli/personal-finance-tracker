import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { isSameMonth, isSameYear, subMonths } from "date-fns";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "#F87171", "#FBBF24", "#34D399", "#60A5FA",
  "#A78BFA", "#F472B6", "#FCD34D", "#C084FC",
];

function ExpenseChart({ userKey }) {
  const [data, setData] = useState([]);
  const [view, setView] = useState("current"); // "current", "previous", or "year"
  const navigate = useNavigate();

  const toggleView = () => {
    setView((prev) =>
      prev === "current" ? "previous" : prev === "previous" ? "year" : "current"
    );
  };

  useEffect(() => {
    document.title = `Expenses | RandomFintrack`;
    const userData = JSON.parse(localStorage.getItem(userKey)) || {};
    const now = new Date();
    const previous = subMonths(now, 1);
    const categoryMap = {};

    for (const tx of userData.transactions || []) {
      const date = new Date(tx.date);
      const amount = parseFloat(tx.amount);
      if (amount >= 0) continue;
      const include =
        (view === "current" && isSameMonth(date, now) && isSameYear(date, now)) ||
        (view === "previous" && isSameMonth(date, previous) && isSameYear(date, previous)) ||
        (view === "year" && isSameYear(date, now));

      if (include) {
        const category = tx.category || "Uncategorized";
        categoryMap[category] = (categoryMap[category] || 0) + Math.abs(amount);
      }
    }

    const formatted = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    }));

    setData(formatted);
  }, [userKey, view]);

  
  return (
    <div className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 animate-fadeSlideUp">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-indigo-600 text-white px-5 py-2 rounded-full shadow hover:bg-pink-600 hover:scale-105"
      >
        ← Back
      </button>

      <div class="transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
          📊 {view === "current"
            ? "Current Month"
            : view === "previous"
            ? "Previous Month"
            : "Current Year"}{" "}
          Expenses by Category
        </h2>
      </div>

      <button
        onClick={toggleView}
        className="absolute top-4 right-4 bg-pink-600 text-white px-5 py-2 rounded-full shadow hover:bg-indigo-600 hover:scale-105"
      >
        Change View
      </button>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={360} onClick={() => navigate('/')}>
          <PieChart
            onClick={toggleView}
          >
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ fontSize: "14px", fontWeight: "500" }}
              formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => (
                <span style={{ color: "#374151", fontSize: "16px"}}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 mt-4" onClick={toggleView}>No expense data available for this month.</p>
      )}
      <p className="text-s text-gray-400 mt-2 italic text-center">
        (Click the chart or change view to toggle charts)
      </p>
    </div>
  );
}

export default ExpenseChart;
