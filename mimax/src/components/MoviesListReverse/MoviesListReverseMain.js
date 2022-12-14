import { React, useEffect, useState } from 'react';

// movies page where main code/functionality happens
function MoviesListMain() {
  const [movieTitle, setMovieTitle] = useState([]);
  const [movieSynopsis, setMovieSynopsis] = useState([]);
  const [movieScore, setMovieScore] = useState([]);

  // set movie details with title, synopsis, overview and score
  function setMovieDetails(json) {
    for (let i = 6; i > -1; i -= 1) {
      movieTitle.push(json[i].original_title);
      movieSynopsis.push(json[i].overview);
      movieScore.push(`Score ${json[i].vote_average}`);
    }
    setMovieTitle(movieTitle);
    setMovieSynopsis(movieSynopsis);
    setMovieScore(movieScore);
  }
  // API call to TMDB
  const callAPI = () => {
    const link = 'https://api.themoviedb.org/3/movie/top_rated?api_key=9e6293836bcabd02d80d27ccca8eb072&with_original_language=en';
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setMovieDetails(json.results));
  };

  useEffect(() => {
    setMovieTitle([]);
    setMovieSynopsis([]);
    setMovieScore([]);
    callAPI();
  }, []);

  const reSort = () => {
    window.open('http://localhost:3000/movieslist', '_self');
  };

  return (
    <div className="main row">
      <div className="movie-display-section">
        <h1>Top 7 Movies</h1>
        <button type="submit" onClick={() => reSort()}>Sort By Best Score</button>
        <div className="column">
          <h2>{movieTitle[0]} ({movieScore[0]})</h2>
          <p>{movieSynopsis[0]}</p>
          <br />
          <br />
          <h2>{movieTitle[1]} ({movieScore[1]})</h2>
          <p>{movieSynopsis[1]}</p>
          <br />
          <br />
          <h2>{movieTitle[2]} ({movieScore[2]})</h2>
          <p>{movieSynopsis[2]}</p>

          <br />
        </div>
        <div className="column">
          <h2>{movieTitle[3]} ({movieScore[3]})</h2>
          <p>{movieSynopsis[3]}</p>
          <br />
          <br />
          <h2>{movieTitle[4]} ({movieScore[4]})</h2>
          <p>{movieSynopsis[4]}</p>
          <br />
          <br />
          <h2>{movieTitle[5]} ({movieScore[5]})</h2>
          <p>{movieSynopsis[5]}</p>
          <br />
          <br />
          <h2>{movieTitle[6]} ({movieScore[6]})</h2>
          <p>{movieSynopsis[6]}</p>
        </div>
        <br />
      </div>
    </div>
  );
}

export default MoviesListMain;
