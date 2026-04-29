import React, { useEffect, useState } from "react";
import CardMenu from "./CardMenu";
import MenuEditor from "./MenuEditor";

export default function MenuList() {
  const [menus, setMenus] = useState([]);
  const [regimes, setRegimes] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);

  const token = localStorage.getItem("auth_token");

  const fetchMenus = async () => {
    const response = await fetch("http://localhost:8000/api/menus", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setMenus(data);
  };

  const fetchRegimes = async () => {
    const response = await fetch("http://localhost:8000/api/regimes", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setRegimes(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/api/menus/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchMenus();
  };

  const handleUpdate = async (form) => {
    await fetch(`http://localhost:8000/api/menus/${editingMenu.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setEditingMenu(null);
    fetchMenus();
  };

  useEffect(() => {
    fetchMenus();
    fetchRegimes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Liste des menus</h2>

      {editingMenu && (
        <MenuEditor
          initialData={editingMenu}
          regimes={regimes}
          onSubmit={handleUpdate}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {menus.map((menu) => (
          <CardMenu
            key={menu.id}
            menu={menu}
            onEdit={setEditingMenu}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
