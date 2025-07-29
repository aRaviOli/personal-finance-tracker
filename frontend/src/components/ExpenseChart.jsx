import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { isSameMonth, isSameYear, subMonths } from "date-fns";
import { useNavigate } from "react-router-dom";

{/* 
  https://recharts.org/en-US/examples/PieChartWithCustomizedLabel
  site used for customised label on chart directly  
*/}

const RADIAN = Math.PI / 180;
const COLORS = [
  "#F87171", "#FBBF24", "#34D399", "#60A5FA",
  "#A78BFA", "#F472B6", "#FCD34D", "#C084FC",
];

function ExpenseChart({ userKey }) {
  const [data, setData] = useState([]);
  const [view, setView] = useState("current");
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
        const category = tx.category;
        categoryMap[category] = (categoryMap[category] || 0) + Math.abs(amount);
      }
    }

    const formatted = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    }));

    setData(formatted);
  }, [userKey, view]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
};
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <button
        onClick={() => navigate("/")}
        className="bg-purple-600 text-white px-5 py-2 rounded-full shadow hover:bg-pink-500 hover:scale-105 transition"
      >
        ← Back
      </button>

      <h2
        className={`text-xl sm:text-2xl font-bold text-center transition-all duration-300 ${
          view === "current"
            ? "text-yellow-700"
            : view === "previous"
            ? "text-red-600"
            : "text-green-700"
        }`}
      >
        📊{" "}
        {view === "current"
          ? "Current Month"
          : view === "previous"
          ? "Previous Month"
          : "Current Year"}{" "}
        Expenses
      </h2>

      <button
        onClick={toggleView}
        className="bg-pink-500 text-white px-5 py-2 rounded-full shadow hover:bg-purple-600 hover:scale-105 transition"
      >
        Change View
      </button>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={360} onClick={() => navigate('/')}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              labelLine={false}
              label={renderCustomizedLabel}
              
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              cursor={{visibility: "default", stroke: "#606571"}}
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
    </div>
  );
}

export default ExpenseChart;
