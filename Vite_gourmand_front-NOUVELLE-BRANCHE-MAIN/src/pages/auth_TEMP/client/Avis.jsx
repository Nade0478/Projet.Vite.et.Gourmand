import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Toast from "../../components/ui/Toast";

export default function Avis() {
  const { data: avis, get, post } = useFetch();
  const [open, setOpen] = useState(false);
  const [commentaire, setCommentaire] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    get("/avis");
  }, []);

  const handleSubmit = async () => {
    const res = await post("/avis", { commentaire });

    if (res) {
      setToast({ message: "Avis ajouté", type: "success" });
      setOpen(false);
      get("/avis");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Mes avis</h1>
        <Button onClick={() => setOpen(true)}>Ajouter un avis</Button>
      </div>

      {avis?.map((a) => (
        <div key={a.id} className="bg-white p-4 rounded shadow mb-3">
          <p>{a.commentaire}</p>
        </div>
      ))}

      <Modal open={open} onClose={() => setOpen(false)} title="Nouvel avis">
        <textarea
          className="w-full border p-2 rounded mb-3"
          placeholder="Votre avis..."
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
        />

        <Button onClick={handleSubmit}>Envoyer</Button>
      </Modal>

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
