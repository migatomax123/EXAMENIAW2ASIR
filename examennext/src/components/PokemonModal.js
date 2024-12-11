'use client'; // Indica que este archivo se ejecuta en el cliente

import { Modal, Button } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import { useEffect, useState } from 'react'; // Importa hooks de React
import { useRouter } from 'next/navigation'; // Importa el hook useRouter de Next.js

const PokemonModal = ({ id, onClose, onNext, onPrevious, disableNext, disablePrevious }) => {
  const [pokemon, setPokemon] = useState(null); // Estado para almacenar los datos del Pokémon
  const router = useRouter(); // Hook de Next.js para la navegación

  // useEffect para obtener los detalles del Pokémon cuando el id cambia
  useEffect(() => {
    const fetchDetails = async () => {
      // Realiza una solicitud a la API de Pokémon para obtener los detalles del Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      // Establece los datos del Pokémon en el estado
      setPokemon({
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        stats: data.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
      });
    };
    fetchDetails();
  }, [id]); // Dependencia del useEffect para que se ejecute cuando el id cambie

  // Si los datos del Pokémon no están disponibles, no renderiza nada
  if (!pokemon) return null;

  // Función para manejar el cierre del modal
  const handleClose = () => {
    onClose(); // Llama a la función onClose pasada como prop
    router.push('/'); // Navega a la página principal
  };

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pokemon.name}</Modal.Title> {/* Muestra el nombre del Pokémon */}
      </Modal.Header>
      <Modal.Body>
        <img src={pokemon.image} alt={pokemon.name} className="img-fluid" /> {/* Muestra la imagen del Pokémon */}
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.name}>
              {stat.name}: {stat.value} {/* Muestra las estadísticas del Pokémon */}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar {/* Botón para cerrar el modal */}
        </Button>
        <Button variant="primary" onClick={onPrevious} disabled={disablePrevious}>
          Anterior {/* Botón para ir al Pokémon anterior */}
        </Button>
        <Button variant="primary" onClick={onNext} disabled={disableNext}>
          Siguiente {/* Botón para ir al siguiente Pokémon */}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonModal;