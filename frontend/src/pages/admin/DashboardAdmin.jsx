import React from "react";

export default function DashboardAdmin() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Menus</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Plats</h2>
          <p className="text-3xl font-bold mt-2">34</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Commandes</h2>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>
      </div>
    </div>
  );
}
