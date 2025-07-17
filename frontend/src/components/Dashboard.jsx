import { useEffect } from "react";

function Dashboard({ user, onLogout }) {
  const userData = JSON.parse(localStorage.getItem(`user_${user}`));
  const name = userData?.name || user;

  useEffect(() => {
    document.title = `Dashboard | Fintrack`;
  }, []);

  return (
    <div className="bg-gradient-to-br from-amber-100 via-indigo-100 to-pink-100 px-4 py-8 font-sans transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-indigo-800 tracking-tight animate-fadeSlideDown">
            Welcome, {name} 👋
          </h1>
          <p className="text-gray-600 text-sm mt-1">Track your finances with style.</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("finance_user");
            onLogout();
          }}
          className="px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg shadow hover:shadow-md hover:scale-105 transition-all duration-200"
        >
          🔒 Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-indigo-500 transform transition-transform hover:scale-105 hover:shadow-xl">
          <p className="text-sm text-gray-500 mb-1">Total Balance</p>
          <h2 className="text-3xl font-semibold text-indigo-700">$0.00</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-green-500 transform transition-transform hover:rotate-1 hover:shadow-xl">
          <p className="text-sm text-gray-500 mb-1">Income</p>
          <h2 className="text-3xl font-semibold text-green-600">+$0.00</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-rose-500 transform transition-transform hover:-rotate-1 hover:shadow-xl">
          <p className="text-sm text-gray-500 mb-1">Expenses</p>
          <h2 className="text-3xl font-semibold text-rose-600">−$0.00</h2>
        </div>
      </div>

      {/* Transaction Button */}
      <div className="max-w-5xl mx-auto flex justify-end">
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-md font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
        >
          ➕ Add Transaction
        </button>
      </div>

      <div className="max-w-5xl mx-auto mt-10 text-center text-gray-500 text-sm animate-fadeSlideUp">
        Your transactions will appear here once added.
      </div>
    </div>
  );
}

export default Dashboard