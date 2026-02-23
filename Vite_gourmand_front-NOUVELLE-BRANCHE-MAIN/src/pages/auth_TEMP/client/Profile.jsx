import React from "react";
import useAuth from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <p>Chargement...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Mon profil</h1>

      <p>
        <strong>Prénom :</strong> {user.prenom}
      </p>
      <p>
        <strong>Nom :</strong> {user.nom}
      </p>
      <p>
        <strong>Email :</strong> {user.email}
      </p>
      <p>
        <strong>Téléphone :</strong> {user.telephone}
      </p>
    </div>
  );
}
