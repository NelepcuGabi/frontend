import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Home.css';

function Home() {
  const teamMembers = [
    { name: 'Luiza David', role: 'Programator' },
    { name: 'Mihai Ciungu', role: 'Programator'},
    { name: 'Ionut Volintiru', role: 'Web Developer' },
    { name: 'Gabriel Nelepcu', role: 'Web Developer' },
    { name: 'Ana Georgescu', role: 'Programator' },
    { name: 'Moise Mihai-Vlad', role: 'Retelistica' },
    { name: 'Marin Florina-Denisa', role: 'Retelistica' },
    { name: 'Barbu Andreea-Maria', role: 'Retelistica' },
    { name: 'Serban Valentina-Andreea', role: 'Retelistica' },
    { name: 'Ionescu Mihai-Cristian', role: 'Retelistica' },
    { name: 'Țipluică Maria-Anisia', role: 'Retelistica' },
    { name: 'Guramba Elena- Georgiana', role: 'Retelistica' },
    { name: 'Stan Rareș-Gabriel', role: 'Programator' },
    
      
    

 



  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

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
            in programare si retelistica. Aici iti poti incarca proiectele personale, sa primesti feedback 
            si chiar sa contribui la alte proiecte ale colegilor tai. 
          </p>
          <p>
            Alatura-te comunitatii noastre si incepe calatoria ta de invatare chiar astazi. Cu resurse
            interactive, suport dedicat si un mediu de invatare prietenos, CodeNetHub este locul perfect
            pentru a-ti extinde orizonturile si a-ti atinge potentialul maxim.
          </p>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="hub-people">
        <h2>Echipa noastra</h2>
        <Slider {...settings}>
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card">
              <div className="card-content">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 CodeNetHub. Toate drepturile rezervate.</p>
        <p>Powered by: Telecom Academy</p>
      </footer>
    </div>
  );
}

export default Home;
