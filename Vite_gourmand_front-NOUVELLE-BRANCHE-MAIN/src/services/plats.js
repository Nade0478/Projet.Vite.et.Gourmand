import api from "./api";

export function getPlats() {
  return api.get("/plats");
}

export function getPlat(id) {
  return api.get(`/plats/${id}`);
}

export function createPlat(form) {
  return api.post("/plats", form);
}

export function updatePlat(id, form) {
  return api.put(`/plats/${id}`, form);
}

export function deletePlat(id) {
  return api.delete(`/plats/${id}`);
}
