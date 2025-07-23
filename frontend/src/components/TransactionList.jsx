import { useEffect, useState } from "react";

export default function TransactionList({ transactions, onDelete }) {
  const [sortedTransactions, setSortedTransactions] = useState([]);

  useEffect(() => {
    const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortedTransactions(sorted);
  }, [transactions]);

  return (
    <div className="transaction-list space-y-4">
      {sortedTransactions.length === 0 ? (
        <p>No transactions added yet.</p>
      ) : (
        sortedTransactions.map((tx) => (
          <div
            key={tx.id}
            className={`p-4 rounded-lg shadow transition-all animate-fadeSlideUp flex justify-between items-center ${
              parseFloat(tx.amount) >= 0 ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div>
              <div className="font-medium">{tx.category}</div>
              <div className="text-xs text-gray-500">{tx.date}</div>
              {tx.description && <div className="text-sm text-gray-600">{tx.description}</div>}
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`text-lg font-semibold ${
                  parseFloat(tx.amount) >= 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                {parseFloat(tx.amount) >= 0 ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
              </div>
              <button
                onClick={() => onDelete(tx.id)}
                className="text-gray-400 hover:text-red-500 transition"
                title="Delete transaction"
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
