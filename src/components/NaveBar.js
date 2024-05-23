import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeToken } from "../store/slices/userSlice";
import Shimmer from "./Shimmer";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      localStorage.clear();
      dispatch(removeToken());
      toast.success("logout successfully")
    }, 700);
  };

  return loading ? <Shimmer/> : (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-white">Delight Mail</span>
            </div>
          </div>
          <div>
            <button
              onClick={logoutHandler}
              className="rounded px-4 py-2 font-bold text-white hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
