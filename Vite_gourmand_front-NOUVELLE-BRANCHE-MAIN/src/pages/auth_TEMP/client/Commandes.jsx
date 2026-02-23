import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

export default function Commandes() {
  const { data: commandes, get } = useFetch();

  useEffect(() => {
    get("/commandes");
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes commandes</h1>

      {commandes?.map((c) => (
        <div key={c.id} className="bg-white p-4 rounded shadow mb-3">
          <p>
            <strong>Menu :</strong> {c.menu?.nom}
          </p>
          <p>
            <strong>Date :</strong> {c.created_at}
          </p>
          <p>
            <strong>Status :</strong> {c.status}
          </p>
        </div>
      ))}
    </div>
  );
}
