import React from "react";

export default function AllergeneEditor({ onSubmit }) {
  return (
    <div>
      <p>Formulaire allergène (à compléter)</p>
      <button onClick={onSubmit}>Valider</button>
    </div>
  );
}
