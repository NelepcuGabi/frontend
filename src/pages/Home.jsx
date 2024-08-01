import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Bine ati venit pe CodeNetHub</h1>
        <p>Explorati o multime de cursuri pentru a va imbunatati cunostintele</p>
       
      </section>
      
      {/* Hub Description Section */}
      <section className="hub-description-section">
        <div className="hub-description-content">
          <h2>Despre CodeNetHub</h2>
          <p>
            CodeNetHub este platforma ta dedicata pentru invatarea si perfectionarea cunostintelor
            in programare si tehnologia informatiei. Oferim o gama variata de cursuri si resurse
            care te vor ajuta sa iti dezvolti abilitatile si sa ramai la curent cu cele mai noi
            tendinte din domeniu. Fie ca esti incepator sau profesionist, vei gasi aici tot ce ai
            nevoie pentru a-ti atinge obiectivele.
          </p>
          <p>
            Alatura-te comunitatii noastre si incepe calatoria ta de invatare chiar astazi. Cu resurse
            interactive, suport dedicat si un mediu de invatare prietenos, CodeNetHub este locul perfect
            pentru a-ti extinde orizonturile si a-ti atinge potentialul maxim.
          </p>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 CodeNetHub. Toate drepturile rezervate.</p>
      </footer>
      {/* Footer */}
    </div>
  );
}

export default Home;
