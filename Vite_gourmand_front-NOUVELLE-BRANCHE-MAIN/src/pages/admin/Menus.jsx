import React, { useState } from "react";
import MenuList from "../../components/menus/MenuList";
import MenuEditor from "../../components/menus/MenuEditor";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";

export default function Menus() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menus</h1>
        <Button onClick={() => setOpen(true)}>Ajouter</Button>
      </div>

      <MenuList />

      <Modal open={open} onClose={() => setOpen(false)} title="Créer un menu">
        <MenuEditor
          onSubmit={() => {
            setToast({ message: "Menu créé", type: "success" });
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
