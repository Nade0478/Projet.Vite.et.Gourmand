import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "../../Logo-Vite-et-gourmand.png"; // <-- importe ton logo

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img src={logo} alt="Vite & Gourmand" className="h-12 w-auto" />
        </Link>

        <button className="burger" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)}>
            Accueil
          </Link>
          <Link to="/menus" onClick={() => setOpen(false)}>
            Menus
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <Link to="/register" onClick={() => setOpen(false)}>
            Register
          </Link>
          <Link to="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
