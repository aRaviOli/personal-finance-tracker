function TransactionList({ transactions, onDelete }) {
  if (!transactions.length) {
    return <div className="text-gray-500 text-sm mt-6">No transactions added yet.</div>;
  }

  return (
    <div className="mt-8 max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto transition-all duration-300">
      <table className="w-full table-auto text-sm">
        <thead className="bg-indigo-100 text-indigo-800 font-semibold">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-right">Amount</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {transactions.map((tx, index) => (
            <tr key={tx.id} className="border-t animate-fadingSlideUp">
              <td className="px-4 py-2">{tx.date}</td>
              <td className="px-4 py-2">{tx.category}</td>
              <td className="px-4 py-2 text-right">{Number(tx.amount).toFixed(2)}</td>
              <td className="px-4 py-2">{tx.description || "-"}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onDelete(index)}
                  className="text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-150"
                  title="Delete"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default TransactionList;