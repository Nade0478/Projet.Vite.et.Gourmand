import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Toast from "../../components/ui/Toast";
import Loader from "../../components/ui/Loader";

export default function PageName() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Titre de la page</h1>

        <Button onClick={() => setOpen(true)}>Ajouter</Button>
      </div>

      {/* Liste */}
      <ListComponent />

      {/* Modale */}
      <Modal open={open} onClose={() => setOpen(false)} title="Ajouter">
        <EditorComponent
          onSubmit={() => {
            setToast({ message: "Créé avec succès", type: "success" });
            setOpen(false);
          }}
        />
      </Modal>

      {/* Toast */}
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
