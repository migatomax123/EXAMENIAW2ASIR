'use client'; // Indica que este archivo se ejecuta en el cliente

import { useEffect, useState } from 'react'; // Importa hooks de React
import { Card } from 'react-bootstrap'; // Importa el componente Card de react-bootstrap
import Image from 'next/image';

const Home = () => {
  const [pokemon, setPokemon] = useState(null); // Estado para almacenar los datos del Pokémon

  // useEffect para obtener los datos de un Pokémon aleatorio cuando el componente se monta
  useEffect(() => {
    const fetchPokemon = async () => {
      const id = Math.floor(Math.random() * 1000) + 1; // Genera un ID aleatorio entre 1 y 1000
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); // Realiza una solicitud a la API de Pokémon
      const data = await response.json(); // Convierte la respuesta en JSON
      // Establece los datos del Pokémon en el estado
      setPokemon({
        name: data.name,
        id: data.id,
        image: data.sprites.other['official-artwork'].front_default,
      });
    };
    fetchPokemon(); // Llama a la función para obtener los datos del Pokémon
  }, []); // El array vacío como dependencia asegura que esto solo se ejecute una vez al montar el componente

  

  return (
    <div className="container">
      <h1>Bienvenido</h1>
      <p>Pagina traducida en 3 idiomas</p>
      {pokemon && ( // Si los datos del Pokémon están disponibles, renderiza la tarjeta
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={pokemon.image} /> {/* Muestra la imagen del Pokémon */}
          <Card.Body>
            <Card.Title>{pokemon.name}</Card.Title> {/* Muestra el nombre del Pokémon */}
            <Card.Text>Número: {pokemon.id}</Card.Text> {/* Muestra el ID del Pokémon */}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Home;

