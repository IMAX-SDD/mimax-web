import { React, useEffect, useState } from 'react';
import {
  Row, Col, Form,
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
      TVScore.push(`Score ${json[i].vote_average}`);
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
    window.location.href = 'http://localhost:3000/tvlist?genre=' + e.target.value;
  }

  useEffect(() => {
    setTVTitle([]);
    setTVSynopsis([]);
    setTVScore([]);
    callAPI(searchParams.get('genre'));
  }, []);

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
                  <option value="actors">Actors</option>
                  <option selected value="tvshows">TV Shows</option>
                </Form.Select>
                {/* </Form.Group> */}
              </Col>
              <Col>
                <Form.Control id="search-bar" type="search" placeholder="Search..." onKeyDown={(e) => handlePress(e)} onChange={setSearch} />
              </Col>
            </Row>
          </Form>
        </div>
        <br />
        <br />
        <h1 style={{ fontWeight: 'bolder' }}>Top TV Shows</h1>
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
        <div className="column">
          <h2>{TVTitle[0]}</h2>
          <img className="cast-photo" src={TVImgLinks[0]} alt="TV poster" />
          <p>{TVSynopsis[0]}</p>
          <h3>{TVScore[0]}</h3>
          <br />
          <br />
          <h2>{TVTitle[1]}</h2>
          <img className="cast-photo" src={TVImgLinks[1]} alt="TV poster" />
          <p>{TVSynopsis[1]}</p>
          <h3>{TVScore[1]}</h3>
          <br />
          <br />
          <h2>{TVTitle[2]}</h2>
          <img className="cast-photo" src={TVImgLinks[2]} alt="TV poster" />
          <p>{TVSynopsis[2]}</p>
          <h3>{TVScore[2]}</h3>
          <br />
          <br />
          <h2>{TVTitle[3]}</h2>
          <img className="cast-photo" src={TVImgLinks[3]} alt="TV poster" />
          <p>{TVSynopsis[3]}</p>
          <h3>{TVScore[3]}</h3>
        </div>
        <div className="column">
          <h2>{TVTitle[4]}</h2>
          <img className="cast-photo" src={TVImgLinks[4]} alt="TV poster" />
          <p>{TVSynopsis[4]}</p>
          <h3>{TVScore[4]}</h3>
          <br />
          <br />
          <h2>{TVTitle[5]}</h2>
          <img className="cast-photo" src={TVImgLinks[5]} alt="TV poster" />
          <p>{TVSynopsis[5]}</p>
          <h3>{TVScore[5]}</h3>
          <br />
          <br />
          <h2>{TVTitle[6]}</h2>
          <img className="cast-photo" src={TVImgLinks[6]} alt="TV poster" />
          <p>{TVSynopsis[6]}</p>
          <h3>{TVScore[6]}</h3>
        </div>
        <br />
      </div>
    </div>
  );
}

export default TVListMain;
