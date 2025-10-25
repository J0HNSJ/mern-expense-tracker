import React from "react";
import { FaHome, FaPlusCircle, FaList } from "react-icons/fa";

function Sidebar({ onNavigate }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">💰 Tracker</h2>
      <ul className="sidebar-menu">
        <li onClick={() => onNavigate("dashboard")}>
          <FaHome /> Dashboard
        </li>
        <li onClick={() => onNavigate("add")}>
          <FaPlusCircle /> Add Expense
        </li>
        <li onClick={() => onNavigate("list")}>
          <FaList /> All Expenses
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
