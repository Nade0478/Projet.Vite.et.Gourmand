import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";

export default function CommandeCreate() {
  const { data: menus, get, post } = useFetch();
  const [menuId, setMenuId] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    get("/menus");
  }, []);

  const handleSubmit = async () => {
    const res = await post("/commandes", { menu_id: menuId });

    if (res) {
      setToast({ message: "Commande créée", type: "success" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Passer une commande</h1>

      <select
        className="w-full border p-2 rounded mb-3"
        value={menuId}
        onChange={(e) => setMenuId(e.target.value)}
      >
        <option value="">Choisir un menu</option>
        {menus?.map((m) => (
          <option key={m.id} value={m.id}>
            {m.nom} — {m.prix} €
          </option>
        ))}
      </select>

      <Button className="w-full" onClick={handleSubmit}>
        Commander
      </Button>

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
