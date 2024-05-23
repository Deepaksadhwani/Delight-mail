import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MailBox = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  const handleSend = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const blocks = rawContentState.blocks;
    const textContent = blocks.map(block => block.text).join(' ');
    console.log("Recipient:", recipient);
    console.log("Subject:", subject);
    console.log("Email Content:", textContent);
  };

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center  bg-gradient-to-bl from-slate-700 via-gray-400 to-gray-700">
      <div className="w-full max-w-3xl mx-auto bg-white to-slate-600 rounded-lg shadow-md p-8">
        <div className="mb-4">
          <label
            htmlFor="recipient"
            className="block text-gray-700 font-bold mb-2"
          >
            Recipient
          </label>
          <input
            type="text"
            id="recipient"
            placeholder="Recipient Email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-gray-700 font-bold mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <Editor
            editorState={editorState}
            toolbarClassName="flex sticky z-50 !justify-center mx-auto"
            wrapperClassName="wrapperClassName border rounded-lg bg-white mb-4"
            editorClassName="mt-6 mb-4 px-4 py-2 bg-white border border-gray-300 rounded-lg"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MailBox;