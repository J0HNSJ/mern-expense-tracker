import React, { useEffect, useState } from "react";
import axios from "axios";

function ExpenseList({ refresh, onEdit }) {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = () => {
    axios
      .get("http://localhost:5000/api/expenses")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchExpenses();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Calculate total
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className="mt-4">
      <h3 className="mb-3">All Expenses</h3>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.title}</td>
              <td>${exp.amount}</td>
              <td>{exp.category}</td>
              <td>{new Date(exp.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(exp)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(exp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {/* ✅ Add total row */}
          {expenses.length > 0 && (
            <tr className="table-info fw-bold">
              <td colSpan="5" className="text-end">
                Total: ${total}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
