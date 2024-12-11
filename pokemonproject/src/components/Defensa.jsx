import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import noticiasData from '../Noticia.json';  
import './MyCard.css';
import "bootstrap/dist/css/bootstrap.min.css"; // Cambié "Import" a "import"

function Defensa() {
  const [cardsData, setCardsData] = useState([]);

  // Asignar los datos directamente al estado
  useEffect(() => {
    setCardsData(noticiasData);
  }, []);

  return (
    <section className="section-content">
      <div className="container mt-4">
        <div className="row">
          {cardsData.map((card, index) => (
            <div className="col" key={index}>
              <Card className={`h-100 azul`} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`/images/${card.imagen}`} /> 
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-body-secondary">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Defensa;
