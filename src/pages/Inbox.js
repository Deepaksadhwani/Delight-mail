import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";

const Inbox = () => {
  const [switchTab, setSwitchTab] = useState(true);
  const inboxData = useSelector((store) => store.mail.data);
  const sentData = useSelector((store) => store.mail.sentData);
  const isLoading = useSelector((store) => store.mail.isLoading);
  

  const tabClass =
    "flex cursor-pointer items-center bg-green-500 py-1 px-2 rounded-lg transition-all duration-300 hover:hover hover:bg-green-600 text-white space-x-2";
  const switchTabHandler = (tab) => {
    setSwitchTab(tab);
  };

  return isLoading ? (
    <Shimmer />
  ) : (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      <h1 className="my-8 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-4xl font-bold text-transparent">
        Delight Mail
      </h1>
      <div className="mb-4 flex w-full items-center   justify-evenly space-x-60 px-4 md:w-[50%]">
        <div
          onClick={() => switchTabHandler(true)}
          className={
            switchTab ? tabClass : "flex cursor-pointer items-center space-x-2"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={!switchTab ? "h-6 w-6 text-black" : "h-6 w-6 text-white"}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <h1 className="text-2xl font-bold ">Sent</h1>
        </div>
        <div
          onClick={() => switchTabHandler(false)}
          className={
            !switchTab ? tabClass : "flex cursor-pointer items-center space-x-2"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={switchTab ? "h-6 w-6 text-black" : "h-6 w-6 text-white"}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h1 className="text-2xl font-bold">Inbox</h1>
        </div>
      </div>

      {switchTab ? (
        <div className="w-full max-w-4xl">
          {sentData && Object.keys(sentData).length > 0 ? (
            Object.keys(sentData).map((key) => (
              <Link
                to={`/inbox/${key}`}
                className="transition-all hover:scale-105"
                key={key}
              >
                <Card
                  recipient={sentData[key].recipient}
                  subject={sentData[key].subject}
                  text={sentData[key].textContent}
                  className="mb-4 rounded-lg bg-white shadow-lg"
                  id={key}
                  sender={sentData[key].sender}
                />
              </Link>
            ))
          ) : (
            <div className="flex justify-center rounded-lg bg-white p-6 shadow-lg">
              <p className="font-medium text-red-600">No email available</p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          {" "}
          {inboxData && Object.keys(inboxData).length > 0 ? (
            Object.keys(inboxData).map((key) => (
              <Link
                to={`/inbox/${key}`}
                className="transition-all hover:scale-105"
                key={key}
              >
                <Card
                  recipient={inboxData[key].recipient}
                  subject={inboxData[key].subject}
                  text={inboxData[key].textContent}
                  className="mb-4 rounded-lg bg-white shadow-lg"
                  id={key}
                  sender={inboxData[key].sender}
                />
              </Link>
            ))
          ) : (
            <div className="flex justify-center rounded-lg bg-white p-6 shadow-lg">
              <p className="font-medium text-red-600">No email available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Inbox;
