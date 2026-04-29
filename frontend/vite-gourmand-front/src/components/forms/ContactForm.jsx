import "./Form.css";

export default function ContactForm() {
  return (
    <form className="form">
      <label>Email</label>
      <input type="email" placeholder="Votre email" required />

      <label>Titre du message</label>
      <input type="text" placeholder="Sujet" required />

      <label>Message</label>
      <textarea placeholder="Votre message..." rows="5" required />

      <button type="submit">Envoyer le message</button>
    </form>
  );
}
