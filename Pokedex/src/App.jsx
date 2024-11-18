import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';



function App() {
  return (

          <BrowserRouter>
              <NavBar/>
              <Routes>
                  
              </Routes>
          </BrowserRouter>

  );
}

export default App;
