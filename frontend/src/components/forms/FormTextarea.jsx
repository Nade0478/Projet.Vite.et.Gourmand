import React from "react";

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  error = "",
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block font-medium mb-1">
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full border rounded px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
