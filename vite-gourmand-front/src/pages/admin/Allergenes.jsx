// src/pages/admin/Allergenes.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Toast from "../../components/ui/Toast";

export default function Allergenes() {
  const [allergenes, setAllergenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [libelle, setLibelle] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      setLoading(true);
      const { data } = await api.get("/allergenes");
      setAllergenes(data);
    } catch (err) {
      setToast("Erreur lors du chargement des allergènes");
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setEditing(null);
    setLibelle("");
    setOpenModal(true);
  }

  function openEdit(a) {
    setEditing(a);
    setLibelle(a.libelle);
    setOpenModal(true);
  }

  async function handleSave() {
    try {
      if (!libelle.trim()) {
        setToast("Le libellé est requis");
        return;
      }
      if (editing) {
        await api.put(`/allergenes/${editing.id}`, { libelle });
        setToast("Allergène mis à jour");
      } else {
        await api.post("/allergenes", { libelle });
        setToast("Allergène créé");
      }
      setOpenModal(false);
      fetchAll();
    } catch (err) {
      setToast(err?.response?.data?.message || "Erreur lors de la sauvegarde");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cet allergène ?")) return;
    try {
      await api.delete(`/allergenes/${id}`);
      setToast("Allergène supprimé");
      fetchAll();
    } catch {
      setToast("Impossible de supprimer");
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "Montserrat" }}
          >
            Allergènes
          </h1>
          <p className="text-gray-600">
            Gérer la liste des allergènes affichés sur les plats
          </p>
        </div>
        <div>
          <Button onClick={openCreate}>Nouvel allergène</Button>
        </div>
      </header>

      {loading ? (
        <div>Chargement…</div>
      ) : (
        <div className="bg-white rounded shadow">
          <table className="w-full table-auto">
            <thead className="bg-[#F5F5F5]">
              <tr>
                <th className="text-left px-4 py-2">ID</th>
                <th className="text-left px-4 py-2">Libellé</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allergenes.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="px-4 py-3">{a.id}</td>
                  <td className="px-4 py-3">{a.libelle}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" onClick={() => openEdit(a)}>
                        Éditer
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(a.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!allergenes.length && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    Aucun allergène
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={openModal}
        title={editing ? "Éditer allergène" : "Nouveau allergène"}
        onClose={() => setOpenModal(false)}
      >
        <div className="space-y-3">
          <label className="block">
            <div className="text-sm text-gray-600 mb-1">Libellé</div>
            <input
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Ex: Gluten"
            />
          </label>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              {editing ? "Mettre à jour" : "Créer"}
            </Button>
          </div>
        </div>
      </Modal>

      <Toast message={toast} />
    </div>
  );
}
