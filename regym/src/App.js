import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./UserPages/Dashboard";
import CreateListing from "./UserPages/CreateListing";
import ViewListings from "./UserPages/ViewListings";
import Cart from "./UserPages/Cart";
import EditProfile from "./UserPages/EditProfile";
import Filter from "./UserPages/Filter";
import Favorites from "./TransactionPages/Favorites";
import MySales from "./TransactionPages/MySales";
import RateUser from "./TransactionPages/RateUser";
import AdminDashboard from "./AdminPages/AdminDashboard";
import Users from "./AdminPages/Users";
import Reports from "./AdminPages/Reports";
import FlaggedListings from "./AdminPages/FlaggedListings";





import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/view-listings" element={<ViewListings />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/filter" element={<Filter />} />
        

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/flagged" element={<FlaggedListings />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-sales" element={<MySales />} />
        <Route path="/rate-user" element={<RateUser />} />



      </Routes>
    </Router>
  );
}

export default App;

