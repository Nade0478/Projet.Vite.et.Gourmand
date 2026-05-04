import React from "react";

export default function CardPlat({ plat, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      {plat.image && (
        <img
          src={plat.image}
          alt={plat.nom}
          className="w-full h-40 object-cover rounded"
        />
      )}

      <h3 className="text-xl font-semibold mt-3">{plat.nom}</h3>

      <p className="text-gray-600 mt-1">{plat.description}</p>

      <p className="text-lg font-bold mt-2">{plat.prix} €</p>

      {plat.allergenes?.length > 0 && (
        <p className="text-sm text-red-600 mt-2">
          Allergènes : {plat.allergenes.map((a) => a.nom).join(", ")}
        </p>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(plat)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Modifier
        </button>

        <button
          onClick={() => onDelete(plat.id)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
