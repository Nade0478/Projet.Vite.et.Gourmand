import React from "react";
import { Link } from "react-router-dom";

export default function Auth() {
  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow text-center">
      <h1 className="text-3xl font-bold mb-6">Bienvenue</h1>

      <p className="text-gray-600 mb-6">
        Connectez-vous ou créez un compte pour accéder à votre espace.
      </p>

      <div className="flex flex-col gap-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Connexion
        </Link>

        <Link
          to="/register"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Inscription
        </Link>
      </div>
    </div>
  );
}
