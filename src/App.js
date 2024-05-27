import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/NaveBar";

const App = () => {
  const token = useSelector((store) => store.user.token);
  return !token ? (
    <Navigate to="/login" />
  ) : (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
};

export default App;
