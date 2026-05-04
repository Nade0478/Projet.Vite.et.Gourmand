import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">
        <Link to="/">Vite & Gourmand</Link>
      </h1>

      <nav className="flex items-center gap-6">
        {!token && (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Connexion
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Inscription
            </Link>
          </>
        )}

        {token && (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/menus" className="hover:text-gray-300">
              Menus
            </Link>
            <Link to="/plats" className="hover:text-gray-300">
              Plats
            </Link>
            <Link to="/commandes" className="hover:text-gray-300">
              Commandes
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Déconnexion
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
