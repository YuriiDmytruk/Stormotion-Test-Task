import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../component_Header/Header';
import Footer from '../component_Footer/Footer';

import Home from '../component_Home/Home';
import Game from '../component_Game/Game';

import './style/app-style.css';

function App() {
  return (
    <div className="app">

      <Header />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>

      <Footer />

    </div>
  );
}

export default App;
