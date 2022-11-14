import { React, useEffect, useState } from 'react';

// movies page where main code/functionality happens
function MoviesListMain() {
  const [movieTitle, setMovieTitle] = useState([]);
  const [movieSynopsis, setMovieSynopsis] = useState([]);
  const [movieScore, setMovieScore] = useState([]);

  // set movie details with title, synopsis, overview and score
  function setMovieDetails(json) {
    for (let i = 0; i < json.length; i += 1) {
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

  return (
    <div className="main">
      <div className="movie-display-section">
        <h1>Top Movies</h1>
        <h2>{movieTitle[0]}</h2>
        <p>{movieSynopsis[0]}</p>
        <h3>{movieScore[0]}</h3>
        <br />
        <br />
        <h2>{movieTitle[1]}</h2>
        <p>{movieSynopsis[1]}</p>
        <h3>{movieScore[1]}</h3>
        <br />
        <br />
        <h2>{movieTitle[2]}</h2>
        <p>{movieSynopsis[2]}</p>
        <h3>{movieScore[2]}</h3>
        <br />
        <br />
        <h2>{movieTitle[3]}</h2>
        <p>{movieSynopsis[3]}</p>
        <h3>{movieScore[3]}</h3>
        <br />
        <br />
        <h2>{movieTitle[4]}</h2>
        <p>{movieSynopsis[4]}</p>
        <h3>{movieScore[4]}</h3>
        <br />
        <br />
        <h2>{movieTitle[5]}</h2>
        <p>{movieSynopsis[5]}</p>
        <h3>{movieScore[5]}</h3>
        <br />
        <br />
        <h2>{movieTitle[6]}</h2>
        <p>{movieSynopsis[6]}</p>
        <h3>{movieScore[6]}</h3>
      </div>
    </div>
  );
}

export default MoviesListMain;
