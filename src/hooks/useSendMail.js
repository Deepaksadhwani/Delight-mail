import toast from "react-hot-toast";
import { DATABASE_URL } from "../utils/constants";

const email = localStorage.getItem("email");

const useSendMail = (data, setLoading) => {
  const slicedEmail = email.slice(0, -9);
  const sendMail = async () => {
    setLoading(true);
    const response = await fetch(`${DATABASE_URL}/mails${slicedEmail}.json`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.ok) {
      toast.success("Mail sent successfully");
    }

    setLoading(false);
  };
  sendMail();
};
export default useSendMail;
