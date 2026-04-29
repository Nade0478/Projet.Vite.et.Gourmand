import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/ui/Loader";
import Footer from "../../components/layout/Footer";

export default function Horaires() {
  const { data: horaires, loading, get } = useFetch();

  useEffect(() => {
    get("/salarie/horaires");
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Mes horaires</h1>

      {horaires?.map((h) => (
        <div key={h.id} className="bg-white p-4 rounded shadow mb-3">
          <p>
            <strong>Jour :</strong> {h.jour}
          </p>
          <p>
            <strong>Début :</strong> {h.debut}
          </p>
          <p>
            <strong>Fin :</strong> {h.fin}
          </p>
        </div>
      ))}
      <Footer/>
    </div>
  );
}
