import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/ui/Loader";
import Footer from "../../components/layout/Footer";

export default function Avis() {
  const { data: avis, loading, get } = useFetch();

  useEffect(() => {
    get("/avis");
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Avis des clients</h1>

      {avis?.length === 0 && <p>Aucun avis pour le moment.</p>}

      {avis?.map((a) => (
        <div key={a.id} className="bg-white p-4 rounded shadow mb-3">
          <p className="font-semibold">
            {a.user?.prenom} {a.user?.nom}
          </p>
          <p className="text-gray-700 mt-1">{a.commentaire}</p>
          <p className="text-sm text-gray-500 mt-2">{a.created_at}</p>
        </div>
      ))}
      <Footer/>
    </div>
  );
}
