export default function BalanceSummary({ userKey, transactions }) {
  const userData = JSON.parse(localStorage.getItem(userKey)) || {};
  const startingBalance = parseFloat(userData?.startingBalance || 0);
  const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalBalance = startingBalance + income - expenses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-indigo-500 relative hover:scale-105 hover:shadow-xl transition-transform">
        <p className="text-sm text-gray-500 mb-1">Total Balance</p>
        <h2 className="text-3xl font-semibold text-indigo-700">${totalBalance.toFixed(2)}</h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-green-500 hover:rotate-1 hover:shadow-xl transition-transform">
        <p className="text-sm text-gray-500 mb-1">Income</p>
        <h2 className="text-3xl font-semibold text-green-600">+${income.toFixed(2)}</h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-rose-500 hover:-rotate-1 hover:shadow-xl transition-transform">
        <p className="text-sm text-gray-500 mb-1">Expenses</p>
        <h2 className="text-3xl font-semibold text-rose-600">−${expenses.toFixed(2)}</h2>
      </div>
    </div>
  );
}
