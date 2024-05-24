import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Shimmer from "../components/Shimmer";

const Inbox = () => {
  const inboxData = useSelector((store) => store.mail.data);
  const isLoading = useSelector((store) => store.mail.isLoading);
  return isLoading ? (
    <Shimmer />
  ) : (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold my-8 text-indigo-700">Inbox</h1>
    <div className="w-full max-w-4xl">
      {inboxData && Object.keys(inboxData).length > 0 ? (
        Object.keys(inboxData).map((key) => (
          <Card
            key={key}
            recipient={inboxData[key].recipient}
            subject={inboxData[key].subject}
            text={inboxData[key].textContent}
            className="mb-4 shadow-lg rounded-lg bg-white"
          />
        ))
      ) : (
        <div className="bg-white p-6 rounded-lg flex justify-center shadow-lg">
          <p className="text-gray-600">No email available</p>
        </div>
      )}
    </div>
  </div>

  );
};

export default Inbox;
