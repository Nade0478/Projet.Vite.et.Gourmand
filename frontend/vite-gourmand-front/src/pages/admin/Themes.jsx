import React, { useState } from "react";
import ThemeList from "../../components/themes/ThemeList";
import ThemeEditor from "../../components/themes/ThemeEditor";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";

export default function Themes() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Thèmes</h1>
        <Button onClick={() => setOpen(true)}>Ajouter</Button>
      </div>

      <ThemeList />

      <Modal open={open} onClose={() => setOpen(false)} title="Créer un thème">
        <ThemeEditor
          onSubmit={() => {
            setToast({ message: "Thème créé", type: "success" });
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
