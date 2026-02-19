// src/pages/admin/DashboardAdmin.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Button from "../../components/ui/Button";

export default function DashboardAdmin() {
  const [stats, setStats] = useState({
    users: 0,
    menus: 0,
    commandes: 0,
    avis: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        // Exemple d'endpoint /admin/stats (à créer côté API si besoin)
        const { data } = await api.get("/admin/stats");
        setStats(data);
      } catch (err) {
        setError("Impossible de récupérer les statistiques");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "Montserrat" }}>
          Tableau de bord
        </h1>
        <p className="text-gray-600">Vue d’ensemble rapide de l’activité</p>
      </header>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Utilisateurs</div>
          <div className="text-2xl font-semibold">
            {loading ? "…" : stats.users}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Menus</div>
          <div className="text-2xl font-semibold">
            {loading ? "…" : stats.menus}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Commandes</div>
          <div className="text-2xl font-semibold">
            {loading ? "…" : stats.commandes}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Avis</div>
          <div className="text-2xl font-semibold">
            {loading ? "…" : stats.avis}
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Actions rapides</h2>
        <div className="flex gap-3 flex-wrap">
          <Button onClick={() => (window.location.href = "/admin/menus")}>
            Gérer les menus
          </Button>
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/admin/plats")}
          >
            Gérer les plats
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/admin/commandes")}
          >
            Voir les commandes
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Dernières commandes</h2>
        <RecentCommandes />
      </section>
    </div>
  );
}

function RecentCommandes() {
  const [list, setList] = useState([]);
  useEffect(() => {
    let mounted = true;
    api
      .get("/commandes?limit=5")
      .then((res) => mounted && setList(res.data))
      .catch(() => {});
    return () => (mounted = false);
  }, []);

  if (!list.length)
    return <div className="text-gray-500">Aucune commande récente</div>;

  return (
    <div className="space-y-3">
      {list.map((c) => (
        <div
          key={c.id}
          className="bg-white p-3 rounded shadow flex justify-between items-center"
        >
          <div>
            <div className="font-medium">
              #{c.numero_commande} — {c.utilisateur?.prenom}{" "}
              {c.utilisateur?.nom}
            </div>
            <div className="text-sm text-gray-500">
              {c.date_prestation} • {c.heure_livraison}
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold">{c.prix_menu} €</div>
            <div className="text-sm text-gray-500">{c.statut}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
