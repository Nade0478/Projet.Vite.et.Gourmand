import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/ui/Loader";

export default function DashboardSalarie() {
  const { data, loading, get } = useFetch();

  useEffect(() => {
    get("/salarie/dashboard");
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord salarié</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Commandes du jour</h2>
          <p className="text-3xl font-bold mt-2">{data?.commandes_du_jour}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Menus préparés</h2>
          <p className="text-3xl font-bold mt-2">{data?.menus_prepares}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Heures travaillées</h2>
          <p className="text-3xl font-bold mt-2">{data?.heures_travaillees}</p>
        </div>
      </div>
    </div>
  );
}
