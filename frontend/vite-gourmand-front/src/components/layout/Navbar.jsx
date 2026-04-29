import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "../../Logo-Vite-et-gourmand.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="Vite & Gourmand" className="logo-img" />
        </Link>

        {/* Burger */}
        <button className="burger" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {/* Navigation */}
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {/* GAUCHE : Accueil / Menus / Contact */}
          <div className="nav-left">
            <Link to="/" onClick={() => setOpen(false)}>
              Accueil
            </Link>
            <Link to="/menus" onClick={() => setOpen(false)}>
              Menus
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>

          {/* DROITE : Login / Register */}
          <div className="nav-right">
            <Link to="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
            <Link to="/register" onClick={() => setOpen(false)}>
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
