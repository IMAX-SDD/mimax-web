import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import noImageAvailable from '../Images/Misc/no_image_available.jpg';

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
    if (data.Poster === undefined) {
      setMovieImgLink(noImageAvailable);
    } else {
      setMovieImgLink(data.Poster);
    }
    
    if (data.Rated === undefined) {
      setMovieAgeRating('N/A');
    } else {
      setMovieAgeRating(data.Rated);
    }
  }

  function setMovieProviderDetails(name) {
    if (name.US === undefined || name.US.flatrate === undefined) {
      setMovieProvider('N/A');
    } else {
      const sources = name.US.flatrate;
      if (sources.length > 0) {
        setMovieProvider(sources[0].provider_name);
      } else {
        setMovieProvider(name.US.buy[0].provider_name);
      }
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
      if (castListData[i] === undefined) {
        cast[i] = 'Unavailable';
        castImg[i] = noImageAvailable;
      } else {
        cast[i] = castListData[i].name;
        if (castListData[i].profile_path === null || castListData[i].profile_path === undefined) {
          castImg[i] = noImageAvailable;
        } else {
          castImg[i] = 'https://image.tmdb.org/t/p/w500' + castListData[i].profile_path;
        }
        castLinks[i] = 'http://localhost:3000/actors?actor=' + castListData[i].name;
      }
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
    if (name.includes(' ')) {
      const spaceCheck = name.replace(/\s/g, '+');
      const onceUponCheck = spaceCheck.replace('…', '');
      const link = `http://www.omdbapi.com/?t=${onceUponCheck}&apikey=acae3f03`;
      fetch(link, { method: 'GET' })
        // Parsing the data into a JavaScript object
        .then((data) => data.json())
        // Displaying the stringified data in an alert popup
        .then((json) => setOMDBDetails(json));
    } else {
      const link = `http://www.omdbapi.com/?t=${name}&apikey=acae3f03`;
      fetch(link, { method: 'GET' })
        // Parsing the data into a JavaScript object
        .then((data) => data.json())
        // Displaying the stringified data in an alert popup
        .then((json) => setOMDBDetails(json));
    }
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
    setMovieScore(json.vote_average);
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

  // Displays a movie's title,poster,IMDB score, rating, provider,
  // and cast members
  return (
    <div className="movie-page-main">
      <div className="movie-display-section">
        <div className="container">
          <div className="row">
            
            <div className="col">
              <h2>{movieTitle}</h2>
              <img alt="movie poster" src={movieImgLink} />
            </div>
            <div className="col">
              <h2>Synopsis</h2>
              <p className="movie-page-synopsis">{movieSynopsis}</p>
              <h3>
                <h2>IMDB Score</h2>
                {movieScore}
              </h3>
              <h3>
                <h2>Provider</h2>
                {movieProvider}
              </h3>
              <h3>
                <h2>Rated</h2> 
                {movieAgeRating}
              </h3> 
            </div>
          </div>
          
          <div className="row">
            <h2 style={{ marginTop: 30 }}>Cast:</h2>

            <div className="col">
              <h3>
                <a href={castLinks[0]} target="_blank" rel="noopener noreferrer">{castList[0]}</a>
              </h3>
              <img className="cast-photo" src={castImages[0]} alt="cast member 1" />
            </div>

            <div className="col">
              <h3>
                <a href={castLinks[1]} target="_blank" rel="noopener noreferrer">{castList[1]}</a>
              </h3>
              <img className="cast-photo" src={castImages[1]} alt="cast member 2" />
            </div>

            <div className="col">
              <h3>
                <a href={castLinks[2]} target="_blank" rel="noopener noreferrer">{castList[2]}</a>
              </h3>
              <img className="cast-photo" src={castImages[2]} alt="cast member 3" />
            </div>

            <div className="col">
              <h3>
                <a href={castLinks[3]} target="_blank" rel="noopener noreferrer">{castList[3]}</a>
              </h3>
              <img className="cast-photo" src={castImages[3]} alt="cast member 4" />
            </div>

          </div> 
        </div>
      </div>
    </div>
  );
}

export default MoviesPageMain;
