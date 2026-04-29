import React, { useState } from "react";
import PlatList from "../../components/plats/PlatList";
import PlatEditor from "../../components/plats/PlatEditor";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";

export default function Plats() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Plats</h1>
        <Button onClick={() => setOpen(true)}>Ajouter</Button>
      </div>

      <PlatList />

      <Modal open={open} onClose={() => setOpen(false)} title="Créer un plat">
        <PlatEditor
          onSubmit={() => {
            setToast({ message: "Plat créé", type: "success" });
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
