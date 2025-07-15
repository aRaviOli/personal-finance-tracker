import { useEffect } from "react";

function Dashboard({ user, onLogout }) {
  const userData = JSON.parse(localStorage.getItem(`user_${user}`));
  const name = userData?.name || user;

  useEffect(() => {
    document.title = "Dashboard | Fintrack"; // or "Dashboard | Fintrack"
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-700">Welcome, {name} 👋</h1>
        <button
          onClick={() => {
            localStorage.removeItem("finance_user");
            onLogout();
          }}
          className="text-sm px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
        >
          🔒 Logout
        </button>
      </div>

      <p className="text-gray-600 mb-4">You’re now tracking transactions under <strong>@{user}</strong></p>
      {/* Your transaction form and table will go here */}
    </div>
  );
}

export default Dashboard