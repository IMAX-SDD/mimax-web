import { React, useState } from 'react';
import {
  Container, Carousel, Row, Col, Card,
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import ActionMovies from './PopularMoviesData/ActionMovieData';
import ComedyMovies from './PopularMoviesData/ComedyMovieData';
import DramaMovies from './PopularMoviesData/DramaMovieData';
import HorrorMovies from './PopularMoviesData/HorrorMovieData';

// main part of the code for the home page
function HomePageMain() {
  // set up variables for movie title, synopsis and score
  const [term, setTerm] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [movieSynopsis, setMovieSynopsis] = useState('');
  const [movieScore, setMovieScore] = useState('');

  function setSearch(e) {
    setTerm(e.target.value);
  }


  const open = (url) => {
    window.open(url + term, '_blank', 'noopener,noreferrer');
  }

  // display of movies function with a carousel-like viewing
  function displayMovies(movieData) {
    return (
      <div className="movie-card">
        <Carousel>
          {movieData.map((item) => (
            <Carousel.Item key={item.id}>
              <Card style={{ background: '#3E8943' }}>
                <Card.Img
                  className="movie-img"
                  src={require(`/src/components/Images/MoviePosters/${item.img}`)}
                  alt="movie-poster"
                />
                <Card.Body>
                  <Card.Title className="movie-title">{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }

  // displays movie posters as well as their title, synopsis, score
  // must do: director/actor bio section (line 103)
  return (
    <div className="main">
      <div className="movie-display-section">
        <input type="search" placeholder="Search Movies" onChange={setSearch} className="search-field" />
        <button type="submit" onClick={() => open("http://localhost:3000/movies?movie=")}>
            <i class="fa fa-search fa-lg"/>
        </button>

        <section className="movie-list">
          <Container>
            <Row>
              <Col>
                <p className="genre-title">Horror</p>
                {displayMovies(HorrorMovies)}
              </Col>

              <Col>
                <p className="genre-title">Action</p>
                {displayMovies(ActionMovies)}
              </Col>

              <Col>
                <p className="genre-title">Comedy</p>
                {displayMovies(ComedyMovies)}
              </Col>

              <Col>
                <p className="genre-title">Drama</p>
                {displayMovies(DramaMovies)}
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <div className="director-actor-bio-section" />
    </div>

  );
}

export default HomePageMain;
