import api from "./api";

export function getMenus() {
  return api.get("/menus");
}

export function getMenu(id) {
  return api.get(`/menus/${id}`);
}

export function createMenu(form) {
  return api.post("/menus", form);
}

export function updateMenu(id, form) {
  return api.put(`/menus/${id}`, form);
}

export function deleteMenu(id) {
  return api.delete(`/menus/${id}`);
}
