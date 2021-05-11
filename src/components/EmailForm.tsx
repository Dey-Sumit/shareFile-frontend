import axios from "axios";
import { FunctionComponent, useState } from "react";

const EmailForm: FunctionComponent<{ id: string }> = ({ id }) => {
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [message, setMessage] = useState(null);
  const handleEmail = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "api/files/email", // TODO
        data: { id, emailFrom, emailTo },
      });
      setMessage(data.message);
      setEmailFrom("");
      setEmailTo("");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mt-4 space-y-3 ">
      <h3>You can also send the link through mail directly</h3>
      <form
        onSubmit={handleEmail}
        className="flex flex-col items-center justify-center w-full p-1 space-y-3 "
      >
        <input
          type="email"
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
          placeholder="Email From"
          value={emailFrom}
          onChange={(e) => setEmailFrom(e.target.value)}
          required
        />
        <input
          placeholder="Email To"
          type="email"
          className="p-1 text-white bg-gray-800 border-2 focus:outline-none"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
          required
        />
        <button className="w-32 button" type="submit">
          Email
        </button>
      </form>
      {message && <p className="font-medium">{message}</p>}
    </div>
  );
};

export default EmailForm;
