import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import {Container, Carousel, Row, Col, Card} from 'react-bootstrap'
import { useState } from "react";
import HorrorMovies from "./PopularMoviesData/HorrorMovieData";
import ActionMovies from "./PopularMoviesData/ActionMovieData";
import ComedyMovies from "./PopularMoviesData/ComedyMovieData";
import DramaMovies from "./PopularMoviesData/DramaMovieData";

const Main = () => {

    const [term, setTerm] = useState("");
    const [movieTitle, setMovieTitle] = useState("");
    const [movieSynopsis, setMovieSynopsis] = useState("");
    const [movieScore, setMovieScore] = useState("");

    function setSearch(e) {
        setTerm(e.target.value);
    }

    function setMovieDeets(json) {
        setMovieTitle(json["original_title"]);
        setMovieSynopsis(json["overview"]);
        setMovieScore("Score " + json["vote_average"]);
    }

    const callAPI = () => {
        console.log(term);
        var link = "https://api.themoviedb.org/3/search/movie?api_key=9e6293836bcabd02d80d27ccca8eb072&query='" + term + "'"
        fetch(link, { method: 'GET' })
        .then(data => data.json()) // Parsing the data into a JavaScript object
        .then(json => setMovieDeets(json["results"][0])) // Displaying the stringified data in an alert popup
    }

    function movies(movieData) {
        return (
         <div className="movie-card">   
            <Carousel>
                {movieData.map(item => (
                    <Carousel.Item key={item.id}>
                        <Card style={{background: '#3E8943'}}>
                            <Card.Img 
                                className="movie-img" 
                                src={require(`../img/${item.img}`)} 
                                alt='movie-poster' 
                            />
                            <Card.Body> 
                                <Card.Title className="movie-title">{item.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
        )
    }

    return (
        <div className="main">
            <div className="movie-display-section">
                <input type="search" placeholder="Search Movies" onChange={setSearch} class="search-field"/>
                <button type="submit" onClick={callAPI}>
                    <i class="fa fa-search fa-lg"/>
                </button>
                <h2>{movieTitle}</h2>
                <p>{movieSynopsis}</p>
                <h3>{movieScore}</h3>
               
                <section className="movie-list">
                    <Container>
                        <Row>
                            <Col>
                                <p className="genre-title">Horror</p>
                                {movies(HorrorMovies)}
                            </Col>

                            <Col>
                                <p className="genre-title">Action</p>
                                {movies(ActionMovies)}
                            </Col>

                            <Col>
                                <p className="genre-title">Comedy</p>
                                {movies(ComedyMovies)}
                            </Col>

                            <Col>
                                <p className="genre-title">Drama</p>
                                {movies(DramaMovies)}
                            </Col>
                        </Row>
                    </Container>
                </section>
        
               
            </div>

            <div className="director-actor-bio-section">
                
            </div>
        </div>
        
    )
}

export default Main