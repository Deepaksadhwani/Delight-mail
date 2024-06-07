import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeToken } from "../store/slices/userSlice";
import Shimmer from "./Shimmer";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  fetchInboxData,
  fetchSentMailData,
  removeData,
  removeSentData,
} from "../store/slices/mailSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const logoutHandler = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      localStorage.clear();
      dispatch(removeToken());
      dispatch(removeData());
      dispatch(removeSentData());
      toast.success("logout successfully");
    }, 700);
  };

  const loadDataHandler = async () => {
    dispatch(fetchInboxData());
    dispatch(fetchSentMailData());
  };

  return loading ? (
    <Shimmer />
  ) : (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-5">
          <div className="flex items-center">
            <Link to="/">
              <div className="flex items-center space-x-2">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
                  alt=""
                  className="w-8 md:w-11"
                />
                <div className="flex-shrink-0">
                  <span className="text-lg font-bold hidden sm:block text-white sm:text-xl">
                    Delight Mail
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center md:ml-4">
            <Link
              to="/"
              className="mr-2 rounded px-3 py-2 font-bold text-white hover:bg-gray-700 md:px-4"
            >
              Home
            </Link>
            <button
              onClick={loadDataHandler}
              className="mr-2 rounded px-3 py-2 font-bold text-white hover:bg-gray-700 md:px-4"
            >
              <Link to="/inbox">Inbox</Link>
            </button>
            <button
              onClick={logoutHandler}
              className="rounded px-3 py-2 font-bold text-white hover:bg-gray-700 md:px-4"
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
