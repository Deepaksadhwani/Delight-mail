import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";

const Inbox = () => {
  const inboxData = useSelector((store) => store.mail.data);
  const isLoading = useSelector((store) => store.mail.isLoading);
  return isLoading ? (
    <Shimmer />
  ) : (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      <h1 className="my-8 text-4xl font-bold text-indigo-700">Inbox</h1>
      <div className="w-full max-w-4xl">
        {inboxData && Object.keys(inboxData).length > 0 ? (
          Object.keys(inboxData).map((key) => (
            <Link to={`/inbox/${key}`}  className="hover:scale-105 transition-all">
              <Card
                key={key}
                recipient={inboxData[key].recipient}
                subject={inboxData[key].subject}
                text={inboxData[key].textContent}
                className="mb-4 rounded-lg bg-white shadow-lg"
                
              />
            </Link>
          ))
        ) : (
          <div className="flex justify-center rounded-lg bg-white p-6 shadow-lg">
            <p className="font-medium text-red-600">No email available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
