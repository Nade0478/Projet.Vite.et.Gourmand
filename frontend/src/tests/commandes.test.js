import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import CommandePage from "../src/pages/CommandePage";
import MesCommandesPage from "../src/pages/MesCommandesPage";
import AdminCommandesPage from "../src/pages/AdminCommandesPage";

jest.mock("axios");

// Données fictives
const fakeCommandes = [
  {
    id: 1,
    menu: { id: 1, nom: "Menu Midi Express" },
    date_evenement: "2025-06-15",
    statut: "en attente",
    utilisateur_id: 42,
  },
  {
    id: 2,
    menu: { id: 2, nom: "Menu Cocktail" },
    date_evenement: "2025-07-20",
    statut: "confirmée",
    utilisateur_id: 42,
  },
];

// ─────────────────────────────────────────────
// 3. TESTS DES COMMANDES
// ─────────────────────────────────────────────
describe("Commandes", () => {
  afterEach(() => jest.clearAllMocks());

  // ── Création d'une commande ──
  test("Création – une commande est enregistrée après sélection du menu et de la date", async () => {
    const nouvelleCommande = {
      id: 3,
      menu: { id: 1, nom: "Menu Midi Express" },
      date_evenement: "2025-08-10",
      statut: "en attente",
    };

    // Simule GET /menus (pour le select) puis POST /commandes
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, nom: "Menu Midi Express" },
        { id: 2, nom: "Menu Cocktail" },
      ],
    });
    axios.post.mockResolvedValueOnce({ data: nouvelleCommande });

    render(
      <MemoryRouter>
        <CommandePage />
      </MemoryRouter>
    );

    // Sélectionne un menu dans le select
    await waitFor(() => screen.getByRole("combobox"));
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "1" },
    });

    // Saisit une date
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2025-08-10" },
    });

    // Valide
    fireEvent.click(screen.getByRole("button", { name: /commander|valider/i }));

    // L'API doit être appelée avec menu_id et date_evenement
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/commandes"),
        expect.objectContaining({
          menu_id: "1",
          date_evenement: "2025-08-10",
        })
      );
    });

    // Un message de confirmation doit apparaître
    await waitFor(() => {
      expect(
        screen.getByText(/commande enregistrée|succès/i)
      ).toBeInTheDocument();
    });
  });

  // ── Historique des commandes ──
  test("Historique – la liste des commandes de l'utilisateur est correctement affichée", async () => {
    // Simule GET /commandes?user=42
    axios.get.mockResolvedValueOnce({ data: fakeCommandes });

    render(
      <MemoryRouter>
        <MesCommandesPage />
      </MemoryRouter>
    );

    // Les deux commandes doivent être visibles
    await waitFor(() => {
      expect(screen.getByText("Menu Midi Express")).toBeInTheDocument();
      expect(screen.getByText("Menu Cocktail")).toBeInTheDocument();
      expect(screen.getByText("en attente")).toBeInTheDocument();
      expect(screen.getByText("confirmée")).toBeInTheDocument();
    });
  });

  // ── Changement de statut (admin) ──
  test("Changement statut – la mise à jour du statut par l'admin est visible", async () => {
    // Simule GET /admin/commandes puis PUT /commandes/1
    axios.get.mockResolvedValueOnce({ data: fakeCommandes });
    axios.put.mockResolvedValueOnce({
      data: { ...fakeCommandes[0], statut: "confirmée" },
    });

    render(
      <MemoryRouter>
        <AdminCommandesPage />
      </MemoryRouter>
    );

    // Attend le chargement de la liste
    await waitFor(() => screen.getByText("en attente"));

    // Change le statut via le select admin (première commande)
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0], { target: { value: "confirmée" } });

    // Clique sur le bouton de sauvegarde
    const saveButtons = screen.getAllByRole("button", {
      name: /enregistrer|mettre à jour/i,
    });
    fireEvent.click(saveButtons[0]);

    // L'API PUT doit avoir été appelée
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining("/commandes/1"),
        expect.objectContaining({ statut: "confirmée" })
      );
    });

    // Le nouveau statut doit être visible dans la liste
    await waitFor(() => {
      const statutElements = screen.getAllByText("confirmée");
      expect(statutElements.length).toBeGreaterThanOrEqual(1);
    });
  });
});
