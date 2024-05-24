import React from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const Inbox = () => {
  const inboxData = useSelector((store) => store.mail.data);

  return (
    <div>
      {inboxData &&
        Object.keys(inboxData).map((key) => (
          <Card
            key={key}
            recipient={inboxData[key].recipient}
            subject={inboxData[key].subject}
            text={inboxData[key].textContent}
          />
        ))}
    </div>
  );
};

export default Inbox;
