import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MenusPage from "../src/pages/MenusPage";
import MenuDetail from "../src/pages/MenuDetail";
import AdminMenuForm from "../src/pages/AdminMenuForm";

jest.mock("axios");

// Données fictives représentant deux menus
const fakeMenus = [
  {
    id: 1,
    nom: "Menu Midi Express",
    description: "Entrée + plat + dessert",
    prix: 12.5,
  },
  {
    id: 2,
    nom: "Menu Cocktail",
    description: "Buffet froid et chaud",
    prix: 25.0,
  },
];

// ─────────────────────────────────────────────
// 2. TESTS DES MENUS
// ─────────────────────────────────────────────
describe("Menus", () => {
  afterEach(() => jest.clearAllMocks());

  // ── Affichage de la liste ──
  test("Affichage – la liste des menus est visible", async () => {
    // Simule GET /menus
    axios.get.mockResolvedValueOnce({ data: fakeMenus });

    render(
      <MemoryRouter>
        <MenusPage />
      </MemoryRouter>
    );

    // Les deux menus doivent apparaître dans le DOM
    await waitFor(() => {
      expect(screen.getByText("Menu Midi Express")).toBeInTheDocument();
      expect(screen.getByText("Menu Cocktail")).toBeInTheDocument();
    });
  });

  // ── Détail d'un menu ──
  test("Détail – les informations du menu sont affichées au clic", async () => {
    axios.get.mockResolvedValueOnce({ data: fakeMenus[0] });

    render(
      // On simule la route /menus/1
      <MemoryRouter initialEntries={["/menus/1"]}>
        <MenuDetail />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Menu Midi Express")).toBeInTheDocument();
      expect(screen.getByText("Entrée + plat + dessert")).toBeInTheDocument();
      expect(screen.getByText(/12,50/)).toBeInTheDocument();
    });
  });

  // ── Ajout d'un menu (admin) ──
  test("Ajout (admin) – un menu est ajouté après validation du formulaire", async () => {
    const newMenu = {
      id: 3,
      nom: "Menu Végétarien",
      description: "100% végétal",
      prix: 14.0,
    };

    // Simule POST /menus
    axios.post.mockResolvedValueOnce({ data: newMenu });

    render(
      <MemoryRouter>
        <AdminMenuForm />
      </MemoryRouter>
    );

    // Remplit le formulaire
    fireEvent.change(screen.getByLabelText(/nom/i), {
      target: { value: "Menu Végétarien" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "100% végétal" },
    });
    fireEvent.change(screen.getByLabelText(/prix/i), {
      target: { value: "14" },
    });
    fireEvent.click(screen.getByRole("button", { name: /valider|ajouter/i }));

    // L'API doit avoir été appelée avec les bonnes données
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/menus"),
        { nom: "Menu Végétarien", description: "100% végétal", prix: "14" }
      );
    });

    // Un message de confirmation doit apparaître
    await waitFor(() => {
      expect(screen.getByText(/menu ajouté|succès/i)).toBeInTheDocument();
    });
  });

  // ── Modification d'un menu ──
  test("Modification – un menu est mis à jour après modification d'un champ", async () => {
    // Simule GET puis PUT
    axios.get.mockResolvedValueOnce({ data: fakeMenus[0] });
    axios.put.mockResolvedValueOnce({
      data: { ...fakeMenus[0], nom: "Menu Midi Premium" },
    });

    render(
      <MemoryRouter initialEntries={["/admin/menus/1/edit"]}>
        <AdminMenuForm />
      </MemoryRouter>
    );

    // Attend le chargement, puis modifie le nom
    await waitFor(() => screen.getByDisplayValue("Menu Midi Express"));
    fireEvent.change(screen.getByLabelText(/nom/i), {
      target: { value: "Menu Midi Premium" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /enregistrer|modifier/i })
    );

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining("/menus/1"),
        expect.objectContaining({ nom: "Menu Midi Premium" })
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/mis à jour|modifié/i)).toBeInTheDocument();
    });
  });

  // ── Suppression d'un menu ──
  test("Suppression – un menu est supprimé après clic sur Supprimer", async () => {
    axios.get.mockResolvedValueOnce({ data: fakeMenus });
    axios.delete.mockResolvedValueOnce({ data: { message: "Menu supprimé" } });

    render(
      <MemoryRouter>
        <MenusPage />
      </MemoryRouter>
    );

    // Attend la liste, puis clique sur le bouton Supprimer du premier menu
    await waitFor(() => screen.getByText("Menu Midi Express"));

    const deleteButtons = screen.getAllByRole("button", { name: /supprimer/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        expect.stringContaining("/menus/1")
      );
    });

    // Le menu supprimé ne doit plus apparaître
    await waitFor(() => {
      expect(screen.queryByText("Menu Midi Express")).not.toBeInTheDocument();
    });
  });
});
