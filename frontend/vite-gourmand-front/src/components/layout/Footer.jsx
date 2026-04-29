export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Vite & Gourmand — Tous droits réservés.
      </p>
    </footer>
  );
}
