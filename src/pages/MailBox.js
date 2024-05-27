import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Shimmer from "../components/Shimmer";
import toast from "react-hot-toast";
import { DATABASE_URL } from "../utils/constants";

const MailBox = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("email");
  const emailSliced = email.slice(0, -10);
  const [sender, setSender] = useState(email);
  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };
  const handleSend = async () => {
    setLoading(true);
    const recipientId = recipient.slice(0, -10);
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const blocks = rawContentState.blocks;
    const textContent = blocks.map((block) => block.text).join(" ");
    const data = JSON.stringify({ sender, recipient, subject, textContent });
    
    const response = await fetch(`${DATABASE_URL}/mails/${recipientId}.json`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseFromSentMail = await fetch(
      `${DATABASE_URL}/sent/${emailSliced}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          sender,
          recipient,
          subject,
          textContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (responseFromSentMail.ok) {
      toast.success("Mail sent successfully");
      setEditorState(EditorState.createEmpty());
      setRecipient("");
      setSubject("");
      setLoading(false);
    }
    setLoading(false);
  };

  return loading ? (
    <Shimmer />
  ) : (
    <div className="flex h-screen w-full flex-col items-center justify-center  bg-gradient-to-bl from-slate-700 via-gray-400 to-gray-700">
      <div className="mx-auto w-full max-w-3xl rounded-lg bg-white to-slate-600 p-8 shadow-md">
        <div className="mb-4">
          <label
            htmlFor="recipient"
            className="mb-2 block font-bold text-gray-700"
          >
            Recipient
          </label>
          <input
            type="text"
            id="recipient"
            placeholder="Recipient Email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="mb-2 block font-bold text-gray-700"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
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
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MailBox;
