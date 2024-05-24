import React from "react";

const Card = ({ recipient, subject, text }) => {
  return (
    <div className="bg-white rounded-lg shadow-md my-4 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{recipient}</h3>
            <p className="text-green-600 font-bold">{subject}</p>
          </div>
        </div>
        <div className="text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default Card;