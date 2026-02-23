import React, { useState } from "react";
import Toast from "./Toast";

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(toasts.filter((t) => t.id !== id));
  };

  return (
    <div>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          onClose={() => removeToast(t.id)}
        />
      ))}
    </div>
  );
}
