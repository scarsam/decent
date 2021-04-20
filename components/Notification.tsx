import { useState, useEffect } from "react";
import { INotification } from "../types";

const Notification: React.VFC<INotification> = ({
  message,
  autoDeleteTime,
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, autoDeleteTime);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return show ? (
    <div className="bg-green-50 border-green-600 border py-2 px-4 mb-4 inline-flex rounded-sm w-max">
      <p className="text-green-600 font-semibold m-0">{message}</p>
    </div>
  ) : null;
};

export default Notification;
