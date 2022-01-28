import './styles/index.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// Views
import Start from './views/Start';
import Play from './views/Play';
import GameOver from './views/GameOver';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Start/>} />
          <Route path="/play" element={<Play/>} />
          <Route path="/game-over" element={<GameOver/>} />
      </Routes>
    </Router>
  );
}

export default App;
