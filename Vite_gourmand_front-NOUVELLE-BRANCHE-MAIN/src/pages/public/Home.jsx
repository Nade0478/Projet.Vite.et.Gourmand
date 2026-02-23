import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Vite & Gourmand</h1>

      <p className="text-gray-600 max-w-xl mx-auto mb-6">
        Découvrez nos menus savoureux, préparés avec soin et adaptés à tous les
        régimes.
      </p>

      <Link to="/menus">
        <Button variant="primary">Voir les menus</Button>
      </Link>
    </div>
  );
}
