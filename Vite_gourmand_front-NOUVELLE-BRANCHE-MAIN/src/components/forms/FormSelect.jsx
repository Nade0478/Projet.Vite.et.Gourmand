import React from "react";

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  error = "",
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block font-medium mb-1">
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">Sélectionner...</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
