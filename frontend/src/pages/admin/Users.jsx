import React, { useState } from "react";
import UserList from "../../components/users/UserList";
import UserEditor from "../../components/users/UserEditor";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Utilisateurs</h1>
        <Button onClick={() => setOpen(true)}>Ajouter</Button>
      </div>

      <UserList />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Créer un utilisateur"
      >
        <UserEditor
          onSubmit={() => {
            setToast({ message: "Utilisateur créé", type: "success" });
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
