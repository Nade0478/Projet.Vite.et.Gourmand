import React from "react";

export default function Loader({ size = 32 }) {
  return (
    <div className="flex justify-center items-center py-4">
      <div
        className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
}
