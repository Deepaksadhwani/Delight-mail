import React from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const App = () => {
   const token = null
   return !token ? (
    <Navigate to="/login" />
  ) : (
    <div>
        <div>app</div>
      <Toaster/>
      <Outlet />
    </div>
  );
};

export default App;
