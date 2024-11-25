import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TypeService from '../Services/TypeService';
import NavDropdown from 'react-bootstrap/NavDropdown';
import GenerationService from "../Services/GenerationService";

const NavBar = () => {
  const [AllTypes, setAllTypes] = useState([]);  
  const [AllGenerations, setAllGenerations] = useState([]);  
  const navigate = useNavigate();  

  const fetchAllTypes = async () => {
    try {
      const response = await TypeService.getAllType();
      setAllTypes(response.data.results);  // Remplissage de AllTypes avec les résultats

    } catch (error) {
      
    }
  };
  const fetchAllGenerations = async () => {

    try {
        const response = await GenerationService.getAllGeneration();
        setAllGenerations(response.data.results);  
        console.log(response.data.results); 
    } catch (error) {
        
    }
}
  useEffect(() => {
    fetchAllTypes();
    fetchAllGenerations();
  }, []);

  const handleTypeClick = (typeName) => {
    // Navigation vers la route spécifique pour le type, avec le nom du type dans l'état
    navigate(`/type/${typeName}`, { state: typeName });
  };

  const handleGenerationClick = (generationName) => {
    // Navigation vers la route spécifique pour la génération, avec le nom de la génération dans l'état
    navigate(`/generation/${generationName}`, { state: generationName });
  };

  

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to={'/pokemons'}>
            <img
              style={{ width: "200px", position: "relative", top: "5px", left: "-10px" }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1024px-International_Pokémon_logo.svg.png"
              alt="Pokémon Logo"
              className='hoverPokemon'
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Types" id="basic-nav-dropdown">
              {AllTypes.map((type) => (
                <NavDropdown.Item 
                  key={type.name} 
                  onClick={() => handleTypeClick(type.name)}  // Ajout de la navigation sur click
                >
                  {type.name.charAt(0).toUpperCase() + type.name.slice(1)}  {/* Mise en majuscule de la première lettre */}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title="Generation" id="basic-nav-dropdown">
              {AllGenerations.map((generation) => (
                <NavDropdown.Item 
                  key={generation.name} 
                  onClick={() => handleGenerationClick(generation.name)}  // Ajout de la navigation sur click
                >
                  {generation.name.charAt(0).toUpperCase() + generation.name.slice(1).replace("-", " ")}  {/* Mise en majuscule de la première lettre */}
                </NavDropdown.Item>
              ))}
            </NavDropdown>


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
