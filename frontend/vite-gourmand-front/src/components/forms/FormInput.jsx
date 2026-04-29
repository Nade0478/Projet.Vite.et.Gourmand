import React from "react";

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block font-medium mb-1">
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
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
