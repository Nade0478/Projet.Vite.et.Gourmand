import api from "./api";

export async function login(email, password) {
  const data = await api.post("/login", { email, password });

  localStorage.setItem("auth_token", data.token);
  localStorage.setItem("auth_user", JSON.stringify(data.user));

  return data;
}

export async function register(form) {
  return api.post("/register", form);
}

export async function me() {
  return api.get("/me");
}

export function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}
