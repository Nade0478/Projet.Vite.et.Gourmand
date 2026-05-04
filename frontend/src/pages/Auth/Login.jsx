import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);

    if (!res.success) {
      setToast({ message: res.error, type: "error" });
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border p-2 rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className="w-full">
            Se connecter
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

      <Footer />
    </>
  );
}
