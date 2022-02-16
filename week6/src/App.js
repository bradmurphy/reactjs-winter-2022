import './sass/index.sass';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

// Views
import Home from './views/Home';
import Cart from './views/Cart';
import Shop from './views/Shop';

function App() {
  const [menuOpened, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(!menuOpened);

  const sidebarStyles = menuOpened ? 'sidebar sidebar--open' : 'sidebar';

  return (
    <>
       <Router>
          <header className="wrap">
            <ul className="nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </header>
          <aside className={sidebarStyles}>
            <ul className="mobile-nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </aside>
          {menuOpened ? (
            <button className="button button--close" onClick={() => openMenu()}>
              X
            </button>
          ) : (
            <button className="button button--hamburger" onClick={() => openMenu()}>
              Hamburger
            </button>
          )}
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/shop" element={<Shop/>} />
              <Route path="/cart" element={<Cart/>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
