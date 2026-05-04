import React, { useState } from "react";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";
import AllergeneList from "../../components/allergenes/AllergeneList";
import AllergeneEditor from "../../components/allergenes/AllergeneEditor";

export default function Allergenes() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Allergènes</h1>
        <Button onClick={() => setOpen(true)}>Ajouter</Button>
      </div>

      <AllergeneList />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Ajouter un allergène"
      >
        <AllergeneEditor
          onSubmit={() => {
            setToast({ message: "Allergène ajouté", type: "success" });
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
