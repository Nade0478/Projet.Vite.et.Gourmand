import React, { useEffect } from "react";

export default function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 text-white rounded shadow ${colors[type]}`}
    >
      {message}
    </div>
  );
}
