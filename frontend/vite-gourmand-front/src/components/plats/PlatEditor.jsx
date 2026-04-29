import React, { useState, useEffect } from "react";
import FormInput from "../forms/FormInput";
import FormTextarea from "../forms/FormTextarea";
import FormSelect from "../forms/FormSelect";

export default function PlatEditor({
  initialData = null,
  allergenes = [],
  regimes = [],
  onSubmit,
}) {
  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix: "",
    regime_id: "",
    allergenes_ids: [],
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nom: initialData.nom,
        description: initialData.description,
        prix: initialData.prix,
        regime_id: initialData.regime_id,
        allergenes_ids: initialData.allergenes?.map((a) => a.id) || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAllergeneChange = (e) => {
    const id = parseInt(e.target.value);
    const updated = form.allergenes_ids.includes(id)
      ? form.allergenes_ids.filter((a) => a !== id)
      : [...form.allergenes_ids, id];

    setForm({ ...form, allergenes_ids: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <FormInput
        label="Nom du plat"
        name="nom"
        value={form.nom}
        onChange={handleChange}
      />

      <FormTextarea
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <FormInput
        label="Prix (€)"
        name="prix"
        type="number"
        value={form.prix}
        onChange={handleChange}
      />

      <FormSelect
        label="Régime"
        name="regime_id"
        value={form.regime_id}
        onChange={handleChange}
        options={regimes.map((r) => ({ value: r.id, label: r.nom }))}
      />

      <div className="mt-4">
        <label className="block font-medium mb-1">Allergènes</label>

        <div className="grid grid-cols-2 gap-2">
          {allergenes.map((a) => (
            <label key={a.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={a.id}
                checked={form.allergenes_ids.includes(a.id)}
                onChange={handleAllergeneChange}
              />
              {a.nom}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {initialData ? "Mettre à jour" : "Créer le plat"}
      </button>
    </form>
  );
}
