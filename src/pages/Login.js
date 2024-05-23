import React, { useEffect, useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import { FIREBASE_KEY, USER_SIGN_IN, USER_SIGN_UP } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import Shimmer from "../components/Shimmer";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [isSign, setIsSign] = useState(true);
  const [error, setError] = useState(true);
  const navigate = useNavigate();
  const toggleSignInForm = () => {
    setIsSign((prev) => !prev);
  };

  const validationHandler = async () => {
    const nameValue = name?.current?.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const message = checkValidData(nameValue, emailValue, passwordValue);
    console.log(message);
    setError(message);
    if (message) return;
    const postRequestData = JSON.stringify({
      email: emailValue,
      password: passwordValue,
      returnSecureToken: true,
    });
    setLoading(true);
    if (!isSign) {
      const response = await fetch(USER_SIGN_UP + FIREBASE_KEY, {
        method: "POST",
        body: postRequestData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setError(data.error.message);
        setLoading(false);
      } else {
       
        localStorage.setItem("token", data?.idToken);
        localStorage.setItem("email", emailValue);
        setLoading(false);
        navigate("/");
        toast.success("your account is created.");
      }
    } else {
      const response = await fetch(USER_SIGN_IN + FIREBASE_KEY, {
        method: "POST",
        body: postRequestData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.error.message);
        setLoading(false);
      } else {
        toast.success("Login in successfully");
        localStorage.setItem("token", data?.idToken);
        localStorage.setItem("email", emailValue);

        navigate("/");
        setLoading(false);

        console.log("sign in successful");
      }
    }
  };
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      dispatch(addToken(userToken));
      navigate("/");
    }
  }, []);

  return loading ? (
    <Shimmer />
  ) : (
    <div className="relative flex h-screen items-center justify-center bg-gradient-to-br from-pink-800 via-purple-800 to-blue-800 md:items-end ">
      <div className="flex w-[90%]  flex-col  items-center space-y-3 rounded-md border-2 bg-gray-100 py-20 shadow-lg  md:mb-[5%] md:ml-[35%]  md:w-[20%] md:py-14">
        <h1 className="font-Mont mb-10 text-3xl font-semibold text-blue-500  md:mb-0 ">
          {isSign ? "Sign In" : "Sign Up"}
        </h1>
        {!isSign && (
          <input
            ref={name}
            className=" border  border-gray-700 p-2  focus:border-blue-500 focus:outline-none"
            type="text"
            placeholder="Name"
          />
        )}
        <input
          className=" border  border-gray-700 p-2  focus:border-blue-500 focus:outline-none"
          ref={email}
          type="email"
          placeholder="Email"
        />
        <input
          className="mb-2 border  border-gray-700 p-2 focus:border-blue-500 focus:outline-none"
          ref={password}
          type="password"
          placeholder="Password"
        />
        <p className="pt-2 font-medium text-red-800 ">{error}</p>
        <button
          className=" font-Mont w-[60%] rounded-lg bg-blue-500 p-2 font-semibold text-white transition-all duration-300 hover:bg-blue-700 md:w-[75%]"
          onClick={validationHandler}
        >
          {isSign ? "Sign In" : "Sign Up"}
        </button>
        <button
          className="font-semibold text-red-500"
          onClick={toggleSignInForm}
        >
          {!isSign
            ? "Have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
      <img
        src="https://img.freepik.com/premium-photo/mail-email-business-communication-concept-with-digital-paper-list-envelope-with-red-notification-alert-symbol-paper-airplane-abstract-dark-background-3d-rendering_670147-31781.jpg"
        alt=""
        className="absolute -left-5 top-40 w-40 rounded-full opacity-80 md:left-40 md:top-5 md:w-[520px]"
      />
    </div>
  );
};

export default Login;
