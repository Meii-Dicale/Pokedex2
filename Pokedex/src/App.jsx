import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import PokemonPage from './Pages/Pokemons';
import PokedexPage from './Pages/Pokedex';
import TypePage from './Pages/Types';



function App() {
  return (

          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
              <NavBar/>
              <Routes >
              <Route path="/pokemons" element={<PokemonPage />} />
              <Route path="/pokemon/:name" element={<PokedexPage />} />
              <Route path="/type/:type" element={<TypePage/>} />
              
              </Routes>
          </BrowserRouter >

  );
}

export default App;
