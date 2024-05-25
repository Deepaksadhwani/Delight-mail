import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MailPage = () => {
  const { mailId } = useParams();
  const inboxData = useSelector((store) => store.mail.data);
  const recipient = inboxData[mailId].recipient;
  const subject = inboxData[mailId].subject;
  const textContent = inboxData[mailId].textContent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-700 flex justify-center items-center">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-10">
        <div className="mb-8 bg-indigo-100 rounded-lg p-6">
          <label className="block text-indigo-800 font-bold mb-2">
            Recipient
          </label>
          <div className="bg-white rounded-lg p-4 text-gray-700 font-mono shadow-md">
            {recipient}
          </div>
        </div>
        <div className="mb-8 bg-purple-100 rounded-lg p-6">
          <label className="block text-purple-800 font-bold mb-2">Subject</label>
          <div className="bg-white rounded-lg p-4 text-gray-700 font-mono shadow-md">
            {subject}
          </div>
        </div>
        <div className="bg-pink-100 rounded-lg p-6">
          <label className="block text-pink-800 font-bold mb-2">
            Text Content
          </label>
          <div className="bg-white rounded-lg p-4 text-gray-700 font-mono shadow-md whitespace-pre-wrap">
            {textContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailPage;