import React, { useState, useEffect } from "react";
import FormInput from "../forms/FormInput";
import FormTextarea from "../forms/FormTextarea";
import FormSelect from "../forms/FormSelect";

export default function MenuEditor({
  initialData = null,
  regimes = [],
  onSubmit,
}) {
  const [form, setForm] = useState({
    nom: "",
    description: "",
    prix: "",
    regime_id: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nom: initialData.nom,
        description: initialData.description,
        prix: initialData.prix,
        regime_id: initialData.regime_id,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <FormInput
        label="Nom du menu"
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
        options={regimes.map((r) => ({
          value: r.id,
          label: r.nom,
        }))}
      />

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        {initialData ? "Mettre à jour" : "Créer le menu"}
      </button>
    </form>
  );
}
