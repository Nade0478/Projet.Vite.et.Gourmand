import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Menus from "../pages/public/Menus";
import Contact from "../pages/public/Contact";
import MenuDetails from "../pages/public/MenuDetails";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/menus/:id" element={<MenuDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
