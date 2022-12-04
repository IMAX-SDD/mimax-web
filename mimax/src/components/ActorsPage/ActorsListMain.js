import { React, useEffect, useState } from 'react';
import {
  Row, Col, Form, Card,
} from 'react-bootstrap';
import noImageAvailable from '../Images/Misc/no_image_available.jpg';

// actors list where main code/functionality happens
function ActorsListMain() {
  const [actorsList, setActorsList] = useState([]);
  const [filled, setFilled] = useState(false);

  const [term, setTerm] = useState('');
  const [searchType, setSearchType] = useState('people');

  function setSearch(e) {
    setTerm(e.target.value);
  }

  function setSearchTypeForm(e) {
    setSearchType(e.target.value);
  }

  function handlePress(e) {
    let url = '';
    if (searchType === 'movies') {
      url = 'https://imax-sdd.github.io/mimax-web/movies?movie=';
    } else if (searchType === 'people') {
      url = 'https://imax-sdd.github.io/mimax-web/actors?actor=';
    } else {
      url = 'https://imax-sdd.github.io/mimax-web/tvshows?show=';
    }
    
    if (e.keyCode === 13) {
      if (term.length > 0) {
        window.open(url + term, '_blank', 'noopener,noreferrer');
      } else {
        window.alert('Please enter a valid search'); // eslint-disable-line no-alert
      }
    }
  }

  // function to parse featured work
  function parseWork(input) {
    const inputLength = input.length; 
    const result = []; 
    for (let index = 0; index < inputLength; index += 1) {
      if (!input[index].original_title) { 
        result.push(input[index].original_name);
      } else {
        result.push(input[index].original_title);
      }
    }

    for (let index = 0; index < inputLength - 1; index += 1) {
      result[index] = `${result[index]}, `;
    }
    return result;
  }

  // set movie details with name, popularity, overview and score
  function setActorDetails(json) {
    const tmpList = []; 
    for (let index = 0; index < 12; index += 1) {
      const tmpObj = {
        name: json[index].name, 
        popularity: parseInt(json[index].popularity, 10),
        work: parseWork(json[index].known_for),
        imgLink: 'https://image.tmdb.org/t/p/original' + json[index].profile_path,
      }; 
      if (json[index].profile_path === null) {
        tmpObj.imgLink = noImageAvailable;
      }
      tmpList.push(tmpObj);
    }
    setActorsList(tmpList);
    setFilled(true); 
  }
  // API call to TMDB
  const callAPI = () => {
    const link = 'https://api.themoviedb.org/3/person/popular?api_key=9e6293836bcabd02d80d27ccca8eb072&language=en-US&page=1'; 
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setActorDetails(json.results));
  };

  useEffect(() => {
    setActorsList([]);
    setFilled(false);
    callAPI();
  }, []);

  // generates a single top actor card
  function displayTopActors(num, ranking) {
    return (          
      <Col>
        <Card className="top-card" style={{ background: '#3E8943' }}>
          <a href={`https://sdd-mimax.netlify.app/actors?actor=${actorsList[num].name}`} target="_blank" rel="noopener noreferrer">
            <Card.Img
              className="top-img"
              src={actorsList[num].imgLink}
              alt="actor-poster"
            />
          </a>
          <Card.Body>
            <Card.Title className="top-title">
              <h3>{actorsList[num].name} (Popularity Ranking {ranking})</h3>
            </Card.Title>
            <br />
          </Card.Body>
        </Card>
      </Col>
    );
  }

  function formatting() {
    return (
      // formatting for top actors list 
      <div>
        <Row>
          {displayTopActors(1, 1)}
          {displayTopActors(2, 2)}
          {displayTopActors(3, 3)}
          {displayTopActors(4, 4)}
          {displayTopActors(6, 5)}
        </Row>
  
        <Row>
          {displayTopActors(7, 6)}
          {displayTopActors(8, 7)}
          {displayTopActors(9, 8)}
          {displayTopActors(10, 9)}
          {displayTopActors(11, 10)}
        </Row>
      </div>
    ); 
  }  

  return (
    <div className="main row">
      <div className="movie-display-section">
        <br />
        <h1 style={{ fontSize: '45px', fontWeight: 'bold', margin: '0px' }}>People Page</h1>
        <div className="search-field">
          <Form>
            <Row>
              <Col xs={2}>
                {/* <Form.Group className="search-field"> */}
                <Form.Select onChange={setSearchTypeForm}>
                  <option value="movies">Movies</option>
                  <option selected value="People">People</option>
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
        {filled ? formatting() : ''} 
      </div>  
    </div>
  );
}

export default ActorsListMain;
