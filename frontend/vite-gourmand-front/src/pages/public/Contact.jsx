import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";

export default function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast({ message: "Message envoyé !", type: "success" });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="nom"
          placeholder="Votre nom"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Votre email"
          className="w-full border p-2 rounded mb-3"
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Votre message"
          className="w-full border p-2 rounded mb-3"
          rows="4"
          onChange={handleChange}
        />

        <Button type="submit" className="w-full">
          Envoyer
        </Button>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
