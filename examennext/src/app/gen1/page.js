'use client';

import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import PokemonModal from '../../components/PokemonModal';

const Gen1 = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true); // Inicia la carga
      try {
        const requests = Array.from({ length: 10 }, (_, i) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((res) => res.json())
        );
        const results = await Promise.all(requests);
        setPokemons(
          results.map((p) => ({
            id: p.id,
            name: p.name,
            image: p.sprites.other['official-artwork'].front_default,
          }))
        );
      } catch (err) {
        setError('Error al cargar los Pokémon');
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
    fetchPokemons();
  }, []);

  const handleNext = () => {
    if (currentPokemonIndex < pokemons.length - 1) {
      const newIndex = currentPokemonIndex + 1;
      setCurrentPokemonIndex(newIndex);
      setSelectedPokemon(pokemons[newIndex].id);
    }
  };

  const handlePrevious = () => {
    if (currentPokemonIndex > 0) {
      const newIndex = currentPokemonIndex - 1;
      setCurrentPokemonIndex(newIndex);
      setSelectedPokemon(pokemons[newIndex].id);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <img src="/Loading_2.gif" alt="Loading" /> {/* Muestra el GIF de loading */}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Manejo de errores
  }

  return (
    <div className="container">
      <h1>Pokémon de la Generación 1</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {pokemons.length > 0 && (
          <Card style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img
              variant="top"
              src={pokemons[currentPokemonIndex].image}
              alt={pokemons[currentPokemonIndex].name}
            />
            <Card.Body>
              <Card.Title>{pokemons[currentPokemonIndex].name}</Card.Title>
              <Card.Text>#{pokemons[currentPokemonIndex].id}</Card.Text>
              <Button onClick={() => setSelectedPokemon(pokemons[currentPokemonIndex].id)}>
                ¿Saber más?
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>

      {selectedPokemon && (
        <PokemonModal
          id={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          disableNext={currentPokemonIndex === pokemons.length - 1}
          disablePrevious={currentPokemonIndex === 0}
        />
      )}
    </div>
  );
};

export default Gen1;