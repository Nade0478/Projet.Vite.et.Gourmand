import React, { useState } from "react";
import FormInput from "../components/forms/FormInput";
import FormSelect from "../components/forms/FormSelect";
import FormTextarea from "../components/forms/FormTextarea";

export default function RegisterForm() {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
    telephone: "",
    role_id: "",
    bio: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <FormInput
        label="Prénom"
        name="prenom"
        value={form.prenom}
        onChange={handleChange}
      />

      <FormInput
        label="Nom"
        name="nom"
        value={form.nom}
        onChange={handleChange}
      />

      <FormInput
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <FormInput
        label="Mot de passe"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <FormSelect
        label="Rôle"
        name="role_id"
        value={form.role_id}
        onChange={handleChange}
        options={[
          { value: 1, label: "Admin" },
          { value: 2, label: "Client" },
        ]}
      />

      <FormTextarea
        label="Bio"
        name="bio"
        value={form.bio}
        onChange={handleChange}
      />
    </form>
  );
}
