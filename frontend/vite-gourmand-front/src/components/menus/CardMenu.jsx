import React from "react";

export default function CardMenu({ menu, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      {menu.image && (
        <img
          src={menu.image}
          alt={menu.nom}
          className="w-full h-40 object-cover rounded"
        />
      )}

      <h3 className="text-xl font-semibold mt-3">{menu.nom}</h3>

      <p className="text-gray-600 mt-1">{menu.description}</p>

      <p className="text-lg font-bold mt-2">{menu.prix} €</p>

      {menu.regime && (
        <p className="text-sm text-green-700 mt-1">
          Régime : {menu.regime.nom}
        </p>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(menu)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Modifier
        </button>

        <button
          onClick={() => onDelete(menu.id)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
