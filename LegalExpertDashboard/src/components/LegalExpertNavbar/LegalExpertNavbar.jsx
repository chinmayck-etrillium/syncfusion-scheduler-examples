import React from "react";
import "./LegalExpertNavbar.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const LegalExpertNavbar = () => {
  return (
    <div className="dashboard-container">
      {/* Header Navigation Bar */}
      <header className="navbar">
        <div className="navbar-brand">User Dashboard</div>
        <nav className="navbar-menu">
          <ul className="navbar-ul">
            {/* Dropdown for Appointment */}
            <li className="dropdown-menu">
              <a className="dropdown-toggle">Appointment</a>
              <ul className="dropdown-content">
                <li>
                  <Link to="/upcoming-appoinments">Upcoming</Link>
                </li>
                <li>
                  <Link to="/completed-appoinments">Completed</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/scheduler-colorpicker">Calendar</Link>
            </li>
            <li className="dropdown-menu">
              <a className="dropdown-toggle">Payments</a>
              <ul className="dropdown-content">
                <li>
                  <Link to="/completed-payments">Completed</Link>
                </li>
                <li>
                  <Link to="/pending-payments">Pending</Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default LegalExpertNavbar;
