import React, { useState } from "react";
import RegimeList from "../../components/regimes/RegimeList";
import RegimeEditor from "../../components/regimes/RegimeEditor";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";

export default function Regimes() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Régimes</h1>
        <Button onClick={() => setOpen(true)}>Ajouter</Button>
      </div>

      <RegimeList />

      <Modal open={open} onClose={() => setOpen(false)} title="Créer un régime">
        <RegimeEditor
          onSubmit={() => {
            setToast({ message: "Régime créé", type: "success" });
            setOpen(false);
          }}
        />
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
