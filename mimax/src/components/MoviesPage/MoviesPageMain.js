import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// movies page where main code/functionality happens
function MoviesPageMain() {
  const [movieTitle, setMovieTitle] = useState('');
  const [movieSynopsis, setMovieSynopsis] = useState('');
  const [movieScore, setMovieScore] = useState('');
  const [movieProvider, setMovieProvider] = useState('');
  const [searchParams] = useSearchParams();
  const [movieImgLink, setMovieImgLink] = useState('');

  function setPosterDetails(data) {
    console.log(data);
    setMovieImgLink(data.Poster);
    console.log(movieImgLink);
  }

  function setMovieProviderDetails(name) {
    const sources = name.US.flatrate;
    if (sources.length > 0) {
      setMovieProvider(sources[0].provider_name);
    } else {
      setMovieProvider(name.US.buy[0].provider_name);
    }
  }

  const getProvider = (id) => {
    const link = `https://api.themoviedb.org/3/movie/${id.toString()}/watch/providers?api_key=9e6293836bcabd02d80d27ccca8eb072`;
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setMovieProviderDetails(json.results));
  };

  const getPoster = (name) => {
    const link = `http://www.omdbapi.com/?t=${name}&apikey=acae3f03`;
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setPosterDetails(json));
  };

  // set movie details with title, synopsis, overview and score
  function setMovieDetails(json) {
    setMovieTitle(json.original_title);
    setMovieSynopsis(json.overview);
    setMovieScore(`IMDB Score: ${json.vote_average}`);
    getProvider(json.id);
    getPoster(json.original_title);
  }

  // API call to TMDB
  const callAPI = (term) => {
    const link = `https://api.themoviedb.org/3/search/movie?api_key=9e6293836bcabd02d80d27ccca8eb072&query='${term}'`;
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setMovieDetails(json.results[0]));
  };

  useEffect(() => {
    callAPI(searchParams.get('movie'));
  }, []);

  return (
    <div className="main">
      <div className="movie-display-section">
        <h1>Movie Page</h1>
        <h2>{movieTitle}</h2>
        <img alt="movie poster" src={movieImgLink} />
        <p>{movieSynopsis}</p>
        <h3>{movieScore}</h3>
        <h3>
          Provider: 
          {movieProvider}
        </h3>
      </div>
    </div>
  );
}

export default MoviesPageMain;
