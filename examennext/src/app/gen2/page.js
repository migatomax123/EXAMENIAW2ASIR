'use client'; // Indica que este archivo se ejecuta en el cliente

import { useEffect, useState } from 'react'; // Importa hooks de React
import { Card, Button } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import PokemonModal from '../../components/PokemonModal'; // Importa el componente PokemonModal

const Gen2 = () => {
  const [pokemons, setPokemons] = useState([]); // Estado para almacenar la lista de Pokémon
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para almacenar el Pokémon seleccionado

  // useEffect para obtener los datos de los Pokémon cuando el componente se monta
  useEffect(() => {
    const fetchPokemons = async () => {
      // Crea una lista de promesas para obtener los datos de 10 Pokémon aleatorios de la generación 2
      const requests = Array.from({ length: 10 }, () =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 100) + 152}`).then((res) => res.json())
      );
      // Espera a que todas las promesas se resuelvan
      const results = await Promise.all(requests);
      // Mapea los resultados para extraer la información necesaria y actualiza el estado
      setPokemons(
        results.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.sprites.other['official-artwork'].front_default,
        }))
      );
    };
    fetchPokemons(); // Llama a la función para obtener los datos de los Pokémon
  }, []); // El array vacío como dependencia asegura que esto solo se ejecute una vez al montar el componente

  return (
    <div className="container">
      <h1>Pokémon de la Generación 2</h1>
      <div className="d-flex flex-wrap">
        {pokemons.map((p) => (
          <Card key={p.id} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img variant="top" src={p.image} /> {/* Muestra la imagen del Pokémon */}
            <Card.Body>
              <Card.Title>{p.name}</Card.Title> {/* Muestra el nombre del Pokémon */}
              <Card.Text>#{p.id}</Card.Text> {/* Muestra el ID del Pokémon */}
              <Button onClick={() => setSelectedPokemon(p.id)}>¿Saber más?</Button> {/* Botón para saber más */}
            </Card.Body>
          </Card>
        ))}
      </div>
      {selectedPokemon && (
        <PokemonModal id={selectedPokemon} onClose={() => setSelectedPokemon(null)} /> /* Muestra el modal si hay un Pokémon seleccionado */
      )}
    </div>
  );
};

export default Gen2;