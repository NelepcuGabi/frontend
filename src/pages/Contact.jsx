import React from 'react';
import '../styles/Contact.css';

function Contact() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Contacteaza-ne</h1>
        <p>Suntem aici pentru a te ajuta. Trimite-ne un mesaj si iti vom raspunde cat mai curand posibil.</p>
      </section>
      
      {/* Contact Form Section */}
      <section className="contact-form-section">
        <h2>Formular de Contact</h2>
        <form className="contact-form">
          <label htmlFor="name">Nume</label>
          <input type="text" id="name" name="name" placeholder="Numele tau.." required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Emailul tau.." required />

          <label htmlFor="subject">Subiect</label>
          <input type="text" id="subject" name="subject" placeholder="Subiectul.." required />

          <label htmlFor="message">Mesaj</label>
          <textarea id="message" name="message" placeholder="Scrie mesajul tau.." required></textarea>

          <button type="submit">Trimite</button>
        </form>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 CodeNetHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Contact;
