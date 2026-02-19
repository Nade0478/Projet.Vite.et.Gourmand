// src/components/ui/Button.jsx
import React from "react";

export default function Button({ children, variant = "primary", ...props }) {
  const base = "px-4 py-2 rounded-md font-medium";
  const styles = {
    primary: "bg-[#CCB531] text-white",
    secondary: "bg-[#6CC4BC] text-white",
    danger: "bg-[#CC6831] text-white",
    outline: "border border-gray-300 text-[#333]",
  };
  return (
    <button
      className={`${base} ${styles[variant] || styles.primary}`}
      {...props}
    >
      {children}
    </button>
  );
}
