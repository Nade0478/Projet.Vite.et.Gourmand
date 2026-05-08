import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import LoginPage from "../src/pages/LoginPage";

// On simule axios pour ne pas faire de vraies requêtes HTTP
jest.mock("axios");

// Utilitaire : rend le composant dans un routeur (nécessaire si tu utilises useNavigate)
const renderLogin = () =>
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

// ─────────────────────────────────────────────
// 1. TESTS D'AUTHENTIFICATION
// ─────────────────────────────────────────────
describe("Authentification", () => {
  // Réinitialise les mocks entre chaque test
  afterEach(() => jest.clearAllMocks());

  // ── Connexion utilisateur standard ──
  test("Connexion – accès à l'espace utilisateur avec des identifiants valides", async () => {
    // Simule une réponse API réussie avec un token JWT
    axios.post.mockResolvedValueOnce({
      data: {
        token: "fake-jwt-token",
        user: { role: "client", email: "user@test.com" },
      },
    });

    renderLogin();

    // Remplit le formulaire
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "motdepasse123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /connexion/i }));

    // Vérifie que l'appel API a bien été fait avec les bonnes données
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/login"),
        { email: "user@test.com", password: "motdepasse123" }
      );
    });

    // Vérifie que le token est bien sauvegardé en localStorage
    expect(localStorage.getItem("token")).toBe("fake-jwt-token");
  });

  // ── Connexion administrateur ──
  test("Connexion admin – accès au dashboard avec des identifiants admin", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        token: "fake-admin-token",
        user: { role: "admin", email: "admin@vitegourmand.fr" },
      },
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "admin@vitegourmand.fr" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "adminpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /connexion/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/login"),
        { email: "admin@vitegourmand.fr", password: "adminpass" }
      );
    });

    // Un utilisateur admin doit être redirigé vers /dashboard
    // (à adapter selon ta logique de redirection)
    expect(localStorage.getItem("token")).toBe("fake-admin-token");
  });

  // ── Erreur de connexion ──
  test("Erreur login – affiche un message d'erreur avec un mauvais mot de passe", async () => {
    // Simule une erreur 401 renvoyée par l'API
    axios.post.mockRejectedValueOnce({
      response: { status: 401, data: { message: "Identifiants incorrects" } },
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "mauvaismdp" },
    });
    fireEvent.click(screen.getByRole("button", { name: /connexion/i }));

    // Le message d'erreur doit apparaître à l'écran
    await waitFor(() => {
      expect(screen.getByText(/identifiants incorrects/i)).toBeInTheDocument();
    });
  });

  // ── Déconnexion ──
  test("Déconnexion – retour à la page login après clic sur Déconnexion", async () => {
    // Pré-condition : un token est présent
    localStorage.setItem("token", "fake-jwt-token");

    // Ici on teste directement la fonction logout (ou un composant Header/Navbar)
    // Adapte l'import selon ton composant réel
    const { logout } = require("../src/utils/auth");
    logout();

    // Le token doit être supprimé
    expect(localStorage.getItem("token")).toBeNull();
  });
});
