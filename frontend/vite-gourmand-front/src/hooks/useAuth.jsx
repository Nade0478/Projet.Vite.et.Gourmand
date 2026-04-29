import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("auth_token");

  const fetchUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        localStorage.removeItem("auth_token");
      }
    } catch (error) {
      console.error("Erreur récupération user :", error);
    }

    setLoading(false);
  };

  const login = async (email, password) => {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("auth_token", data.token);
      setUser(data.user);
      return { success: true };
    }

    return { success: false, error: data.error };
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
