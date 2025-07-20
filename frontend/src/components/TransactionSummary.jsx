import { isSameMonth, isSameYear, subMonths } from "date-fns";

export default function TransactionSummary({ transactions }) {
  const now = new Date();
  const lastMonth = subMonths(now, 1);

  const summary = {
    currentMonth: { income: 0, expenses: 0 },
    previousMonth: { income: 0, expenses: 0 },
  };

  for (const tx of transactions) {
    const date = new Date(tx.date);
    const amount = parseFloat(tx.amount || 0);

    if (isSameMonth(date, now) && isSameYear(date, now)) {
      amount >= 0 ? summary.currentMonth.income += amount : summary.currentMonth.expenses += Math.abs(amount);
    }

    if (isSameMonth(date, lastMonth) && isSameYear(date, lastMonth)) {
      amount >= 0 ? summary.previousMonth.income += amount : summary.previousMonth.expenses += Math.abs(amount);
    }
  }

  return (
    <div className="mt-10 max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-sm">
      {[
        { label: "Previous Month", data: summary.previousMonth },
        { label: "Current Month", data: summary.currentMonth },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-all duration-200 animate-fadeSlideUp"
        >
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">
            {item.label}
          </h3>
          <div className="text-green-600">
            Income: ${item.data.income.toFixed(2)}
          </div>
          <div className="text-red-500">
            Expenses: ${item.data.expenses.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
