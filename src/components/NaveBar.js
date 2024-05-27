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
        <div className="flex h-16 items-center justify-between">
          <Link to="/">
            <div className="flex items-center space-x-2">
              <img
                src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
                alt=""
                className="w-11"
              />
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-white">
                  Delight Mail
                </span>
              </div>
            </div>
          </Link>

          <div>
            <Link
              to="/"
              className="rounded px-4 py-2 font-bold text-white hover:bg-gray-700"
            >
              Home
            </Link>
            <button
              onClick={loadDataHandler}
              className="rounded px-4 py-2 font-bold text-white hover:bg-gray-700"
            >
              <Link to="/inbox">Inbox</Link>
            </button>
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
