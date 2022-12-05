import { React, useEffect, useState } from 'react';
import {
  Row, Col, Form, Card,
} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import noImageAvailable from '../Images/Misc/no_image_available.jpg';

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
    } else if (searchType === 'people') {
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
  /* const [movieSynopsis, setMovieSynopsis] = useState([]); */
  const [movieScore, setMovieScore] = useState([]);
  const [searchParams] = useSearchParams();
  const [movieImgLinks, setMovieImgLinks] = useState([]);

  // set movie details with title, synopsis, overview and score
  function setMovieDetails(json) {
    const mt = [];
    const ms = [];
    const mss = [];
    const mil = [];
    setMovieImgLinks([]);
    for (let i = 0; i < json.length; i += 1) {
      mt.push(json[i].original_title);
      ms.push(json[i].overview);

      if (json[i].vote_count === 0) {
        mss.push('Score N/A');
      } else {
        mss.push(`Score ${json[i].vote_average}`);
      }
      
      if (json[i].poster_path == null) {
        mil.push(noImageAvailable);
      } else {
        mil.push('https://image.tmdb.org/t/p/original' + json[i].poster_path);
      }
    }
    setMovieTitle(mt);
    // setMovieSynopsis(ms);
    setMovieScore(mss);
    setMovieImgLinks(mil);
  }

  // API call to TMDB
  const callAPI = (genre) => {
    const link = `https://api.themoviedb.org/3/movie/top_rated?api_key=9e6293836bcabd02d80d27ccca8eb072&with_original_language=en&with_genres=${genre}`;
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setMovieDetails(json.results));
  };

  function setGenreFilterOption(e) {
    window.location.href = 'http://localhost:3000/movieslist?genre=' + e.target.value;
  }

  // generates a single top movie card
  function displayTopMovies(num) {
    return (          
      <Col>
        <Card className="top-card" style={{ background: '#3E8943' }}>
          <a href={`http://localhost:3000/movies?movie=${movieTitle[num]}`} target="_blank" rel="noopener noreferrer">
            <Card.Img
              className="top-img"
              src={movieImgLinks[num]}
              alt="movie-poster"
            />
          </a>
          <Card.Body>
            <Card.Title className="top-title">
              <h3>{movieTitle[num]}<br />({movieScore[num]})</h3>
            </Card.Title>
            <br />
          </Card.Body>
        </Card>
      </Col>
    );
  }
  
  useEffect(() => {
    setMovieTitle([]);
    // setMovieSynopsis([]);
    setMovieScore([]);
    setMovieImgLinks([]);
    callAPI(searchParams.get('genre'));
  }, []);

  /* 
  const reSort = () => {
    window.open('http://localhost:3000/movieslistreverse', '_self');
  };
  */

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
                  <option value="people">People</option>
                  <option value="tvshows">TV Shows</option>
                </Form.Select>
                {/* </Form.Group> */}
              </Col>
              <Col>
                <Form.Control id="search-bar" type="search" placeholder="Search..." onKeyDown={(e) => handlePress(e)} onChange={setSearch} />
              </Col>
              <Col xs={2}>
                <Form>
                  <Form.Select onChange={setGenreFilterOption} value={searchParams.get('genre')}>
                    <option value="">All Genres</option>
                    <option value="28">Action</option>
                    <option value="12">Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    {/* <option value="99">Documentary</option> */}
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="14">Fantasy</option>
                    <option value="36">History</option>
                    <option value="27">Horror</option>
                    <option value="10402">Music</option>
                    <option value="9648">Mystery</option>
                    <option value="10749">Romance</option>
                    <option value="878">Sci-Fi</option>
                    <option value="10770">TV Movie</option>
                    <option value="53">Thriller</option>
                    <option value="10752">War</option>
                    <option value="37">Western</option>
                  </Form.Select>
                </Form>
              </Col>
            </Row>
          </Form>
        </div>
        <br />

        <Row>
          {displayTopMovies(1)}
          {displayTopMovies(2)}
          {displayTopMovies(3)}
          {displayTopMovies(4)}
          {displayTopMovies(5)}
        </Row>

        <Row>
          {displayTopMovies(6)}
          {displayTopMovies(7)}
          {displayTopMovies(8)}
          {displayTopMovies(9)}
          {displayTopMovies(10)}
        </Row>
      </div>
    </div>
  );
}

export default MoviesListMain;
