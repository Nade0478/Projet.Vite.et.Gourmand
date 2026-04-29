import "./Form.css";

export default function MenuFilters({ onFilter }) {
  return (
    <form className="form filters" onSubmit={onFilter}>
      <h3>Filtres</h3>

      <label>Prix maximum</label>
      <input type="number" name="prix" />

      <label>Thème</label>
      <select name="theme">
        <option value="">Tous</option>
      </select>

      <label>Régime</label>
      <select name="regime">
        <option value="">Tous</option>
      </select>

      <label>Nombre minimum</label>
      <input type="number" name="min" />

      <button type="submit">Valider</button>
    </form>
  );
}
