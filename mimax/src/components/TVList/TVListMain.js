import { React, useEffect, useState } from 'react';
import {
  Row, Col, Form, Card,
} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

// movies page where main code/functionality happens
function TVListMain() {
  const [term, setTerm] = useState('');
  const [searchType, setSearchType] = useState('tvshows');

  function setSearch(e) {
    setTerm(e.target.value);
  }

  function setSearchTypeForm(e) {
    setSearchType(e.target.value);
  }

  function handlePress(e) {
    let url = '';
    if (searchType === 'movies') {
      url = 'https://sdd-mimax.netlify.app/movies?movie=';
    } else if (searchType === 'people') {
      url = 'https://sdd-mimax.netlify.app/actors?actor=';
    } else {
      url = 'https://sdd-mimax.netlify.app/tvshows?show=';
    }
    
    if (e.keyCode === 13) {
      if (term.length > 0) {
        window.open(url + term, '_blank', 'noopener,noreferrer');
      } else {
        window.alert('Please enter a valid search'); // eslint-disable-line no-alert
      }
    }
  }

  const [TVTitle, setTVTitle] = useState([]);
  const [TVSynopsis, setTVSynopsis] = useState([]);
  const [TVScore, setTVScore] = useState([]);
  const [searchParams] = useSearchParams();
  const [TVImgLinks, setTVImgLinks] = useState([]);

  // set movie details with title, synopsis, overview and score
  function setTVDetails(json) {
    for (let i = 0; i < json.length; i += 1) {
      TVTitle.push(json[i].name);
      TVSynopsis.push(json[i].overview);

      if (json[i].vote_count === 0) {
        TVScore.push('Score N/A');
      } else {
        TVScore.push(`Score ${json[i].vote_average}`);
      }
      TVImgLinks.push('https://image.tmdb.org/t/p/original' + json[i].poster_path);
    }
    setTVTitle(TVTitle);
    setTVSynopsis(TVSynopsis);
    setTVScore(TVScore);
    setTVImgLinks(TVImgLinks);
  }

  // API call to TMDB
  const callAPI = (genres) => {
    const link = `https://api.themoviedb.org/3/tv/top_rated?api_key=9e6293836bcabd02d80d27ccca8eb072&with_original_language=en&with_genres=${genres}`;
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setTVDetails(json.results));
  };

  function setGenreFilterOption(e) {
    window.location.href = 'https://sdd-mimax.netlify.app/tvlist?genre=' + e.target.value;
  }

  useEffect(() => {
    setTVTitle([]);
    setTVSynopsis([]);
    setTVScore([]);
    callAPI(searchParams.get('genre'));
  }, []);

  // generates a single top TV show card
  function displayTopTVShows(num) {
    return (          
      <Col>
        <Card className="top-card" style={{ background: '#3E8943' }}>
          <a href={`https://sdd-mimax.netlify.app/tvshows?show=${TVTitle[num]}`} target="_blank" rel="noopener noreferrer">
            <Card.Img
              className="top-img"
              src={TVImgLinks[num]}
              alt="TVShow-poster"
            />
          </a>
          <Card.Body>
            <Card.Title className="top-title">
              <h3>{TVTitle[num]}<br />({TVScore[num]})</h3>
            </Card.Title>
            <br />
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return (
    <div className="main">
      <div className="movie-display-section">
        <br />
        <h1 style={{ fontSize: '45px', fontWeight: 'bold', margin: '0px' }}>TV Shows Page</h1>
        <div className="search-field">
          <Form>
            <Row>
              <Col xs={2}>
                {/* <Form.Group className="search-field"> */}
                <Form.Select onChange={setSearchTypeForm}>
                  <option value="movies">Movies</option>
                  <option value="people">People</option>
                  <option selected value="tvshows">TV Shows</option>
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
                    <option value="10759">Action & Adventure</option>
                    <option value="16">Animation</option>
                    <option value="35">Comedy</option>
                    <option value="80">Crime</option>
                    <option value="99">Documentary</option>
                    <option value="18">Drama</option>
                    <option value="10751">Family</option>
                    <option value="10762">Kids</option>
                    <option value="9648">Mystery</option>
                    <option value="10763">News</option>
                    <option value="10764">Reality</option>
                    <option value="10765">Sci-Fi & Fantasy</option>
                    <option value="10766">Soap</option>
                    <option value="10767">Talk</option>
                    <option value="10768">War & Politics</option>
                    <option value="37">Western</option>
                  </Form.Select>
                </Form>
              </Col>
            </Row>
          </Form>
        </div>
        <br />
        <br />
        
        <Row>
          {displayTopTVShows(1)}
          {displayTopTVShows(2)}
          {displayTopTVShows(3)}
          {displayTopTVShows(4)}
          {displayTopTVShows(5)}
        </Row>

        <Row>
          {displayTopTVShows(6)}
          {displayTopTVShows(7)}
          {displayTopTVShows(8)}
          {displayTopTVShows(9)}
          {displayTopTVShows(10)}
        </Row>

      </div>
    </div>
  );
}

export default TVListMain;
