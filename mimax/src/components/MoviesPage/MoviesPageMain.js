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
  const [movieAgeRating, setMovieAgeRating] = useState('');
  const [castList, setCastList] = useState([]);
  const [castImages, setCastImages] = useState([]);
  const [castLinks, setCastLinks] = useState([]);

  function setOMDBDetails(data) {
    setMovieImgLink(data.Poster);
    setMovieAgeRating(data.Rated);
  }

  function setMovieProviderDetails(name) {
    const sources = name.US.flatrate;
    if (sources.length > 0) {
      setMovieProvider(sources[0].provider_name);
    } else {
      setMovieProvider(name.US.buy[0].provider_name);
    }
  }

  function setCastDetails(data) {
    const castListData = data.cast;
    castListData.sort(function (a, b) {
      return parseFloat(b.popularity) - parseFloat(a.popularity);
    });
    const cast = ['', '', '', ''];
    const castImg = ['', '', '', ''];
    for (let i = 0; i < 4; i += 1) {
      console.log(castListData[i]);
      cast[i] = castListData[i].name;
      castImg[i] = 'https://image.tmdb.org/t/p/w500' + castListData[i].profile_path;
      castLinks[i] = 'http://localhost:3000/actors?actor=' + castListData[i].name;
    }
    setCastList(cast);
    setCastImages(castImg);
    setCastLinks(castLinks);
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
      .then((json) => setOMDBDetails(json));
  };

  const getCast = (id) => {
    const link = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9e6293836bcabd02d80d27ccca8eb072`;
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setCastDetails(json));
  };

  // set movie details with title, synopsis, overview and score
  function setMovieDetails(json) {
    setMovieTitle(json.original_title);
    setMovieSynopsis(json.overview);
    setMovieScore(`IMDB Score: ${json.vote_average}`);
    getCast(json.id);
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
        <h3>
          Rated: 
          {movieAgeRating}
        </h3>
        <h3>Cast:</h3>
        <img src={castImages[0]} alt="cast member 1" />
        <a href={castLinks[0]}>{castList[0]}</a>
        <img src={castImages[1]} alt="cast member 2" />
        <a href={castLinks[1]}>{castList[1]}</a>
        <img src={castImages[2]} alt="cast member 3" />
        <a href={castLinks[2]}>{castList[2]}</a>
        <img src={castImages[3]} alt="cast member 4" />
        <a href={castLinks[3]}>{castList[3]}</a>
      </div>
    </div>
  );
}

export default MoviesPageMain;
