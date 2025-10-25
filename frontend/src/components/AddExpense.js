import React, { useState, useEffect } from "react";
import axios from "axios";

function AddExpense({ onAdd, editingExpense, onUpdate }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date.split("T")[0]); // format yyyy-mm-dd
    }
  }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingExpense) {
        // update existing
        await axios.put(
          `http://localhost:5000/api/expenses/${editingExpense._id}`,
          { title, amount, category, date }
        );
        onUpdate();
      } else {
        // add new
        const res = await axios.post("http://localhost:5000/api/expenses", {
          title,
          amount,
          category,
          date,
        });
        onAdd(res.data);
      }

      // reset form
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      <h3>{editingExpense ? "Edit Expense" : "Add New Expense"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
  {editingExpense ? "✅ Update Expense" : "➕ Add Expense"}
</button>

      </form>
    </div>
  );
}

export default AddExpense;
