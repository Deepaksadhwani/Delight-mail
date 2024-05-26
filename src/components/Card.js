import { useDispatch } from "react-redux";
import { DATABASE_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { deleteMail, deleteSentMail } from "../store/slices/mailSlice";

const Card = ({ recipient, subject, text, id }) => {
  const dispatch = useDispatch();
  const deleteMailHandler = async (event) => {
    event.preventDefault();

    await dispatch(deleteMail({ mailId: id, recipient }));
    await dispatch(deleteSentMail({ mailId: id, recipient }));
  };

  return null ? (
    <Shimmer />
  ) : (
    <div className="my-4 rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:scale-105 hover:bg-green-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
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
            <p className="font-bold text-green-600">{subject}</p>
          </div>
        </div>
        <button
          onClick={deleteMailHandler}
          className="cursor-pointer text-red-400 hover:scale-110 "
        >
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default Card;
