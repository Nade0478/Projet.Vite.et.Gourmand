import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

jest.mock("../hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({
    login: jest.fn().mockResolvedValue({ success: true }),
  }),
}));

describe("Authentification", () => {
  afterEach(() => jest.clearAllMocks());

  test("Connexion – le formulaire de connexion s'affiche correctement", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /se connecter/i })
    ).toBeInTheDocument();
  });

  test("Connexion – l'utilisateur peut saisir son email et mot de passe", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "user@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/mot de passe/i), {
      target: { value: "motdepasse123" },
    });

    expect(screen.getByPlaceholderText(/email/i).value).toBe("user@test.com");
    expect(screen.getByPlaceholderText(/mot de passe/i).value).toBe(
      "motdepasse123"
    );
  });

  test("Inscription – le formulaire d'inscription s'affiche correctement", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^nom$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/téléphone/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /s'inscrire/i })
    ).toBeInTheDocument();
  });

  test("Inscription – affiche un message de succès après soumission", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: "Inscription réussie" }),
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/prénom/i), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByPlaceholderText(/^nom$/i), {
      target: { value: "Dupont" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "alice@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/mot de passe/i), {
      target: { value: "pass123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/téléphone/i), {
      target: { value: "0600000000" },
    });

    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    await waitFor(() => {
      expect(screen.getByText(/inscription réussie/i)).toBeInTheDocument();
    });

    global.fetch = undefined;
  });
});
