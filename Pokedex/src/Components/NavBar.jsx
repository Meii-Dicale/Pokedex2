import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/pokemons?search=${search.trim().toLowerCase()}`);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand >
          <Link to={'/pokemons'} >
          <img
            style={{ width: "200px",
              position: "relative",
              top: "5px",
              left: "-10px"
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1024px-International_Pokémon_logo.svg.png"
            alt="Pokémon Logo"
            className='hoverPokemon'
          /></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

          </Nav>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Rechercher un Pokémon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Rechercher
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
