import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import Toast from "../../components/ui/Toast";

export default function Commandes() {
  const { data: commandes, loading, get, put } = useFetch();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    get("/salarie/commandes");
  }, []);

  const updateStatus = async (id, status) => {
    const res = await put(`/commandes/${id}`, { status });

    if (res) {
      setToast({ message: "Statut mis à jour", type: "success" });
      get("/salarie/commandes");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Commandes à préparer</h1>

      {commandes?.map((c) => (
        <div key={c.id} className="bg-white p-4 rounded shadow mb-4">
          <p>
            <strong>Client :</strong> {c.user?.prenom} {c.user?.nom}
          </p>
          <p>
            <strong>Menu :</strong> {c.menu?.nom}
          </p>
          <p>
            <strong>Status :</strong> {c.status}
          </p>

          <div className="flex gap-3 mt-3">
            <Button
              variant="primary"
              onClick={() => updateStatus(c.id, "en préparation")}
            >
              En préparation
            </Button>

            <Button
              variant="success"
              onClick={() => updateStatus(c.id, "prête")}
            >
              Prête
            </Button>

            <Button
              variant="outline"
              onClick={() => updateStatus(c.id, "livrée")}
            >
              Livrée
            </Button>
          </div>
        </div>
      ))}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
