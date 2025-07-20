import { useState, useEffect } from "react";
import BalanceSummary from "../components/BalanceSummary";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionSummary from "../components/TransactionSummary";

function Dashboard({ user, onLogout }) {
  const userKey = `user_${user}`;
  const userData = JSON.parse(localStorage.getItem(userKey));
  const name = userData?.name || user;

  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  useEffect(() => {
    document.title = `Dashboard | Fintrack`;

    // Initial load
    const stored = JSON.parse(localStorage.getItem(userKey)) || {};
    setTransactions(stored.transactions || []);
  }, [userKey]);

  const updateLocalStorage = (newTransactions) => {
    const stored = JSON.parse(localStorage.getItem(userKey)) || {};
    stored.transactions = newTransactions;
    localStorage.setItem(userKey, JSON.stringify(stored));
  };

  const handleAddTransaction = (tx) => {
    const updated = [tx, ...transactions];
    setTransactions(updated);
    updateLocalStorage(updated);
  };

  const handleDeleteTransaction = (indexToDelete) => {
    const updated = transactions.filter((_, i) => i !== indexToDelete);
    setTransactions(updated);
    updateLocalStorage(updated);
  };

  return (
    <div className="bg-gradient-to-br from-amber-100 via-indigo-100 to-pink-100 px-4 py-8 font-sans transition-colors duration-300">
      <section className="max-w-5xl mx-auto flex justify-between items-center mb-10">
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
      </section>

      <section className="max-w-5xl mx-auto">
        <BalanceSummary userKey={userKey} transactions={transactions} />
      </section>

      <section className="max-w-5xl mx-auto">
        <TransactionSummary transactions={transactions} />
      </section>

      <section className="max-w-5xl mx-auto flex justify-end my-4">
        <button
          onClick={toggleForm}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow-md font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
        >
          {showForm ? "✖️ Close Form" : "➕ Add Transaction"}
        </button>
      </section>
      

      {showForm && (
        <section className="max-w-5xl mx-auto transition-all duration-300 animate-fadeSlideUp">
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </section>
      )}

      <section className="max-w-5xl mx-auto mt-10 text-center text-gray-500 text-sm animate-fadeSlideUp">
        <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
      </section>
    </div>
  );
}

export default Dashboard;
