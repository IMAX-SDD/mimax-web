import { React, useState } from 'react';

// movies page where main code/functionality happens
function MoviesPageMain() {
  const [term, setTerm] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [movieSynopsis, setMovieSynopsis] = useState('');
  const [movieScore, setMovieScore] = useState('');

  function setSearch(e) {
    setTerm(e.target.value);
  }

  // set movie details with title, synopsis, overview and score
  function setMovieDetails(json) {
    setMovieTitle(json.original_title);
    setMovieSynopsis(json.overview);
    setMovieScore(`Score ${json.vote_average}`);
  }

  // API call to TMDB
  const callAPI = () => {
    const link = `https://api.themoviedb.org/3/search/movie?api_key=9e6293836bcabd02d80d27ccca8eb072&query='${term}'`;
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setMovieDetails(json.results[0]));
  };

  return (
    <div className="main">
      <div className="movie-display-section">
        <h1>Movie Page</h1>
        <input type="search" placeholder="Search Movies" onChange={setSearch} className="search-field" />
        <button type="submit" onClick={callAPI}>
          <i className="fa fa-search fa-lg" />
        </button>
        <h2>{movieTitle}</h2>
        <p>{movieSynopsis}</p>
        <h3>{movieScore}</h3>
      </div>
    </div>
  );
}

export default MoviesPageMain;
