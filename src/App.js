import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const App = () => {
  const token = useSelector((store) => store.user.token);
  console.log(token);
  return !token ? (
    <Navigate to="/login" />
  ) : (
    <div>
     
      <Toaster />
      <Outlet />
    </div>
  );
};

export default App;
