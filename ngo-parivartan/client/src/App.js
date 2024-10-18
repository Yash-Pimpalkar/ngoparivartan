import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Donate from "./Pages/DonationPage/Donate";
import AdminHome from "./Pages/AdminHome";
import PaymentsDashboard from "./Pages/PaymentDashBoard/Paymentdashboard";
import CreateVolunteerForm from "./Pages/Volunteer/CreateVolunteer";

function App() {
  const userData = JSON.parse(localStorage.getItem("userData")); // Assuming userData contains token and role (like 'isAdmin')
  const token = localStorage.getItem("token");
  const isLoggedIn = token && userData;
  const isAdmin = userData?.isAdmin; // Check if the user is an admin

  return (
    <div>
      <Router>
        <Navbar userData={userData} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin-Only Routes */}
          {isLoggedIn && isAdmin ? (
            <>
              <Route path="/" element={<AdminHome />} />
              <Route path="/admin/paymenthistory" element={<PaymentsDashboard />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} /> // Redirect if not logged in or not an admin
          )}

          {/* Protected Routes for Logged-in Users */}
          {isLoggedIn ? (
            <>
              <Route path="/createVolunteer" element={<CreateVolunteerForm />} />
              <Route path="/donate" element={<Donate />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} /> // Redirect if not logged in
          )}
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
