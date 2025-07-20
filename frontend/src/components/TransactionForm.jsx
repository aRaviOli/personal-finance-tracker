import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: uuidv4(),
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date || new Date().toISOString().split("T")[0],
    };

    onAddTransaction(newTransaction);
    setFormData({ date: "", category: "", amount: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-xl mx-auto animate-fadeSlideUp">
      <h2 className="text-lg font-semibold text-indigo-700">➕ Add a New Transaction</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          required
        />
      </div>

      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount (use negative for expense)"
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
        required
      />

      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Optional Description"
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-all"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;