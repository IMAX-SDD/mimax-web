import { React, useEffect, useState } from 'react';
import {
  Row, Col, Form,
} from 'react-bootstrap';

// movies page where main code/functionality happens
function MoviesListMain() {
  const [term, setTerm] = useState('');
  const [searchType, setSearchType] = useState('movies');

  function setSearch(e) {
    setTerm(e.target.value);
  }

  function setSearchTypeForm(e) {
    setSearchType(e.target.value);
  }

  function handlePress(e) {
    let url = '';
    if (searchType === 'movies') {
      url = 'http://localhost:3000/movies?movie=';
    } else if (searchType === 'actors') {
      url = 'http://localhost:3000/actors?actor=';
    } else {
      url = 'http://localhost:3000/tvshows?show=';
    }
    
    if (e.keyCode === 13) {
      if (term.length > 0) {
        window.open(url + term, '_blank', 'noopener,noreferrer');
      } else {
        window.alert('Please enter a valid search'); // eslint-disable-line no-alert
      }
    }
  }

  const [movieTitle, setMovieTitle] = useState([]);
  const [movieSynopsis, setMovieSynopsis] = useState([]);
  const [movieScore, setMovieScore] = useState([]);
  const [searchedMovieTitle, setSearchedMovieTitle] = useState('');
  const [searchedMovieSynopsis, setSearchedMovieSynopsis] = useState('');
  const [searchedMovieScore, setSearchedMovieScore] = useState('');
  const [searchCheck, setSearchCheck] = useState(false);

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

  function setSearchMovieDetails(json) {
    setSearchedMovieTitle(json.original_title);
    setSearchedMovieSynopsis(json.overview);
    setSearchedMovieScore(`IMDB Score: ${json.vote_average}`);
  }

  // API call to TMDB
  const callAPI = (flag) => {
    if (flag) {
      const link = 'https://api.themoviedb.org/3/movie/top_rated?api_key=9e6293836bcabd02d80d27ccca8eb072&with_original_language=en';
      fetch(link, { method: 'GET' })
        // Parsing the data into a JavaScript object
        .then((data) => data.json())
        // Displaying the stringified data in an alert popup
        .then((json) => setMovieDetails(json.results));
    } else {
      const link = `https://api.themoviedb.org/3/search/movie?api_key=9e6293836bcabd02d80d27ccca8eb072&query='${term}'`;
      fetch(link, { method: 'GET' })
        // Parsing the data into a JavaScript object
        .then((data) => data.json())
        // Displaying the stringified data in an alert popup
        .then((json) => setSearchMovieDetails(json.results[0]));
      setSearchCheck(true);
    }
  };

  useEffect(() => {
    setMovieTitle([]);
    setMovieSynopsis([]);
    setMovieScore([]);
    callAPI(true);
  }, []);

  const reSort = () => {
    window.open('http://localhost:3000/movieslistreverse', '_self');
  };

  return (
    <div className="main row">
      <div className="movie-display-section">
        <br />
        <h1 style={{ fontSize: '45px', fontWeight: 'bold', margin: '0px' }}>Movies Page</h1>
        <div className="search-field">
          <Form>
            <Row>
              <Col xs={2}>
                {/* <Form.Group className="search-field"> */}
                <Form.Select onChange={setSearchTypeForm}>
                  <option value="movies">Movies</option>
                  <option value="actors">Actors</option>
                  <option value="tvshows">TV Shows</option>
                </Form.Select>
                {/* </Form.Group> */}
              </Col>
              <Col>
                <Form.Control id="search-bar" type="search" placeholder="Search..." onKeyDown={(e) => handlePress(e)} onChange={setSearch} />
              </Col>
            </Row>
          </Form>
        </div>
        <div>
          {searchCheck
            ? [
              <h2>{searchedMovieTitle}</h2>,
              <p style={{ marginBottom: '5px' }}>{searchedMovieSynopsis}</p>,
              <h3 style={{ fontSize: '20px' }}>{searchedMovieScore}</h3>,
            ]
            : null }
        </div>
        <br />
        <h1 style={{ fontWeight: 'bolder' }}>Top Movies</h1>
        <button type="submit" onClick={() => reSort()}>Sort By Worst Score</button>
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
