import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AB_Icon from "../../assets/AB-icon.jpg";
import Home from "./Home";
import EmployeeList from "./EmployeeList";

const Navbar = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link
            to="/EmployeeRegistration/"
            className=" navbar-brand nav-link active"
            aria-current="page"
          >
            <img src={AB_Icon} alt="LOGO" style={{ height: "50px" }} />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/EmployeeRegistration/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/EmployeeRegistration/list" className="nav-link">
                  Employees
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/EmployeeRegistration/" element={<Home />} />
        <Route path="/EmployeeRegistration/list" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
};

export default Navbar;
