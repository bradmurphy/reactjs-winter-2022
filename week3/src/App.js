import React, { useEffect, useState } from 'react';
import { useDebounce } from './utilities';
import axios from 'axios';
import './App.scss';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

const apiStuff = {
  key: '3bda19b2b236ce6c68da0751faba9abe',
  base: 'https://api.themoviedb.org/3/',
  search: 'search/movie',
  params: '&language=en-US&page=1&include_adult=false'
};

const Link1Page = () => (
  <div>Link 1 Page</div>
);

const Link2Page = () => (
  <div>Link 2 Page</div>
);

const SearchApp = () => {
  const [ searchTerm, setSearchTerm ] = useState('Search me!');
  const [ results, setResults ] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const apiKey = apiStuff.key;
  const baseURL = apiStuff.base;
  const searchPath = apiStuff.search;
  const extraParams = apiStuff.params;

  const url = `${baseURL}${searchPath}?api_key=${apiKey}${extraParams}`;

  console.log(url, axios);

  const getMovie = async (url, query) => {
    try {
      const response = await axios.get(`${url}&query=${query}`);
      setResults(response.data.results);
    } catch (err) {
      console.log(err.message, err.code);
    }
  };

  const sortMovies = (res, order) => {
    let resultsCopy = [ ...res ];

    switch(order) {
      case 'asc':
        resultsCopy = resultsCopy.sort((a, b) => a.vote_average - b.vote_average);
        setResults(resultsCopy);
        break;
      default:
        resultsCopy = resultsCopy.sort((a, b) => b.vote_average - a.vote_average);
        setResults(resultsCopy);
    }
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      getMovie(url, debouncedSearchTerm);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm, url]);

  return (
    <div>
      <h1>MY MOVIE SEARCHIN' APP</h1>
      <button onClick={() => sortMovies(results, 'asc')}>Sort ASC</button>
      <button onClick={() => sortMovies(results, 'desc')}>Sort DESC</button>
      <input type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} />
      {results.map((result, i) => (
        <figure key={`unique-${i}`}>
          {result.poster_path ? <img src={`https://image.tmdb.org/t/p/w200/${result.poster_path}`} alt={result.title} /> : null}
          <figcaption>{result.title}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function App() {
  const [ menuOpen, setMenuOpen ] = useState(false);

  const sidebarStyles = menuOpen ? 'sidebar sidebar--open' : 'sidebar';
  const overlayStyles = menuOpen ? 'overlay overlay--open' : 'overlay';

  return (
    // Establish BrowserRouter
    <BrowserRouter>
      <div className="App">
        <aside className={sidebarStyles}>
          {/* Establish link list */}
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/link-1">Link 1</a></li>
            <li><a href="/link-2">Link 2</a></li>
          </ul>
        </aside>
        <div className={overlayStyles} onClick={() => setMenuOpen(false)}></div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>Hamburger</button>
        {/* Establish Routes Wrapper */}
        <Routes>
          {/* Establish each individual route */}
          <Route path="/" element={<SearchApp/>} />
          <Route path="/link-1" element={<Link1Page />} />
          <Route path="/link-2" element={<Link2Page />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
