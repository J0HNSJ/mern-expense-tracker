import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "", category: "", date: "" });
  const [editingExpense, setEditingExpense] = useState(null);

  // Fetch expenses
  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses").then((res) => setExpenses(res.data));
  }, []);

  // Handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExpense) {
      axios.put(`http://localhost:5000/api/expenses/${editingExpense._id}`, form).then(() => {
        window.location.reload();
      });
    } else {
      axios.post("http://localhost:5000/api/expenses", form).then(() => {
        window.location.reload();
      });
    }
  };

  // Delete expense
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/expenses/${id}`).then(() => {
      window.location.reload();
    });
  };

  // Calculate total expense
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
        paddingBottom: "50px",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark mb-4 shadow">
        <div className="container">
          <span className="navbar-brand mb-0 h1">💰 Expense Tracker</span>
        </div>
      </nav>

      <div className="container">
        <div className="row g-4">
          {/* Form Card */}
          <div className="col-md-4">
            <div
              className="card shadow-lg border-0 p-3"
              style={{ background: "rgba(240,240,240,0.9)", borderRadius: "15px" }}
            >
              <h4 className="text-center mb-3 fw-bold text-primary">
                {editingExpense ? "✏️ Edit Expense" : "➕ Add Expense"}
              </h4>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="form-control mb-2"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  className="form-control mb-2"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  className="form-control mb-2"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="date"
                  className="form-control mb-3"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="btn btn-success w-100 fw-bold">
                  {editingExpense ? "✅ Update Expense" : "➕ Add Expense"}
                </button>
              </form>
            </div>
          </div>

          {/* Table Card */}
          <div className="col-md-8">
            <div
              className="card shadow-lg border-0 p-3"
              style={{ background: "rgba(240,240,240,0.9)", borderRadius: "15px" }}
            >
              <h4 className="text-center mb-3 fw-bold text-primary">📊 Expenses</h4>
              <table className="table table-hover table-striped align-middle">
                <thead className="table-dark">
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
                      <td className="fw-bold text-success">₹{exp.amount}</td>
                      <td>{exp.category}</td>
                      <td>{new Date(exp.date).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => setEditingExpense(exp) || setForm(exp)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(exp._id)}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {expenses.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No expenses added yet 🚀
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Total Expense */}
              <div className="alert alert-info mt-3 text-center fw-bold fs-5 shadow-sm">
                💵 Total Expense: <span className="text-danger">₹{totalExpense}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
