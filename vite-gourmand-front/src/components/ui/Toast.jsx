// src/components/ui/Toast.jsx
import React from "react";

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 bg-[#333] text-white px-4 py-2 rounded-md shadow">
      {message}
    </div>
  );
}
