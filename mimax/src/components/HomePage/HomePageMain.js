import { React, useState } from 'react';
import {
  Container, Carousel, Row, Col, Card, Form,
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import ActionMovies from './PopularMoviesData/ActionMovieData';
import ComedyMovies from './PopularMoviesData/ComedyMovieData';
import DramaMovies from './PopularMoviesData/DramaMovieData';
import HorrorMovies from './PopularMoviesData/HorrorMovieData';
import FeaturedActor from './FeaturedActorDirectorData/ActorData';
import FeaturedDirector from './FeaturedActorDirectorData/DirectorData';

// main part of the code for the home page
function HomePageMain() {
  // set up variables for movie title, synopsis and score
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
      window.open(url + term, '_blank', 'noopener,noreferrer');
    }
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

        <section className="movie-list">
          <Container>
            <Row>
              <Col>
                <p className="genre-title">Horror </p>
                {displayMovies(HorrorMovies) }
              </Col>

              <Col>
                <p className="genre-title">Action </p>
                { displayMovies(ActionMovies) }
              </Col>

              <Col>
                <p className="genre-title">Comedy </p>
                { displayMovies(ComedyMovies) }
              </Col>
              <Col>
                <p className="genre-title">Drama </p>
                { displayMovies(DramaMovies) }
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      
      <div className="director-actor-bio-section">
        <div className="actor-list">
          <Container>
            <Row>
              <Col>
                <p className="actor-name">{FeaturedActor[0].Name}</p>
                <Card className="actor-card" style={{ background: '#312828' }}>
                  <Card.Img
                    className="home-actor-img1"
                    src={require(`../Images/ActorImgs/${FeaturedActor[0].img}`)}
                    alt="actor-img"
                  />
                  <Card.Body>
                    <Card.Title className="home-actor-text">{FeaturedActor[0].description}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <p className="actor-name">{FeaturedDirector[0].Name}</p>
                <Card className="actor-card" style={{ background: '#312828' }}>
                  <Card.Img
                    className="home-actor-img2"
                    src={require(`../Images/ActorImgs/${FeaturedDirector[0].img}`)}
                    alt="actor-img"
                  />
                  <Card.Body>
                    <Card.Title className="home-actor-text">{FeaturedDirector[0].description}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default HomePageMain;
