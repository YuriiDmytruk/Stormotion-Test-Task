import { BrowserRouter as HashRouter, Routes, Route } from 'react-router-dom';

import Header from '../component_Header/Header';
import Footer from '../component_Footer/Footer';

import Home from '../component_Home/Home';
import Game from '../component_Game/Game';
import Create from '../component_Create/Create'

import './style/app-style.css';

function App() {
  return (
    <div className="app">

      <Header />

      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/create" element={<Create />} />


          <Route path="*" element={<Home />} />
        </Routes>
      </HashRouter>

      <Footer />

    </div>
  );
}

export default App;
