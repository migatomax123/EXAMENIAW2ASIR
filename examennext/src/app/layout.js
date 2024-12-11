'use client'; // Indica que este archivo se ejecuta en el cliente

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import './globals.css'; // Importa los estilos globales personalizados

import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap'; // Importa componentes de react-bootstrap
import { useState } from 'react'; // Importa el hook useState de React

// Diccionario de traducciones para diferentes idiomas
const translations = {
  es: { title: 'Aplicación Pokémon', home: 'Inicio', gen1: 'Gen 1', gen2: 'Gen 2', gen3: 'Gen 3', error404: 'Error 404' },
  en: { title: 'Pokemon App', home: 'Home', gen1: 'Gen 1', gen2: 'Gen 2', gen3: 'Gen 3', error404: 'Error 404' },
  fr: { title: 'Application Pokémon', home: 'Accueil', gen1: 'Gen 1', gen2: 'Gen 2', gen3: 'Gen 3', error404: 'Erreur 404' },
};

// Componente RootLayout que envuelve toda la aplicación
export default function RootLayout({ children }) {
  const [lang, setLang] = useState('es'); // Estado para almacenar el idioma seleccionado
  const dict = translations[lang]; // Obtiene las traducciones correspondientes al idioma seleccionado

  return (
    <html lang={lang}>
      <body>
        {/* Navbar de Bootstrap */}
        <Navbar bg="light" expand="lg">
          <Container>
            {/* Marca de la Navbar que muestra el título de la aplicación */}
            <Navbar.Brand href="/">{dict.title}</Navbar.Brand>
            <Nav className="me-auto">
              {/* Enlace de navegación a la página de inicio */}
              <Nav.Link href="/">{dict.home}</Nav.Link>
              {/* Dropdown para seleccionar la generación de Pokémon */}
              <Dropdown>
                <Dropdown.Toggle variant="success">{dict.gen1}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/gen1">{dict.gen1}</Dropdown.Item>
                  <Dropdown.Item href="/gen2">{dict.gen2}</Dropdown.Item>
                  <Dropdown.Item href="/gen3">{dict.gen3}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* Enlace a la página de error 404 */}
              <Nav.Link href="/404">{dict.error404}</Nav.Link>
            </Nav>
            <Nav>
              {/* Botones para cambiar el idioma */}
              <button onClick={() => setLang('es')}>ES</button>
              <button onClick={() => setLang('en')}>EN</button>
              <button onClick={() => setLang('fr')}>FR</button>
            </Nav>
          </Container>
        </Navbar>
        {/* Contenido principal de la página */}
        <main>{children}</main>
      </body>
    </html>


  );
}
