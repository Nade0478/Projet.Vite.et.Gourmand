import React from "react";

export default function ThemeEditor({ onSubmit }) {
  return (
    <div>
      <p>Formulaire thème (à compléter)</p>
      <button onClick={onSubmit}>Valider</button>
    </div>
  );
}
