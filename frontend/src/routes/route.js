import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Construction from "../pages/construction";

const AdminRoute = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Construction />} />
        <Route path="/chapter" element={<Construction />} />
        <Route path="/help" element={<Construction />} />
        <Route path="/reports" element={<Construction />} />
        <Route path="/settings" element={<Construction />} />
        {/* <Route path="/create-new-user" element={<CreateNewUser />} />
        <Route path="/edit-user/:id" element={<CreateNewUser />} /> */}
      </Routes>
  );
};

export default AdminRoute;
