import './styles/index.scss';
import {Fragment} from 'React';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// Views
import Start from './views/Start';
import Play from './views/Play';
import GameOver from './views/GameOver';
import React from 'react';

function App() {
  return (
    <>
        <aside>Sidebar</aside>
     
        <Router>
          <Routes>
              <Route path="/" element={<Start/>} />
              <Route path="/play" element={<Play/>} />
              <Route path="/game-over" element={<GameOver/>} />
          </Routes>
        </Router>
       
    </>
  );
}

export default App;
