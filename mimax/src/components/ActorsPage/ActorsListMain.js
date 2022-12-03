import { React, useEffect, useState } from 'react';
import {
  Row, Col, Form,
} from 'react-bootstrap';
import noImageAvailable from '../Images/Misc/no_image_available.jpg';

function formatting(actorsList) {
  return (
    // formatting for top actors list 
    <div className="movie-display-section">
      <h1 style={{ fontWeight: 'bolder' }}>Top Actors/Actresses</h1>
      <div className="column">
        <h2>{actorsList[0].name} (Popularity {actorsList[0].popularity})</h2>
        <a href={`http://localhost:3000/actors?actor=${actorsList[0].name}`} target="_blank" rel="noopener noreferrer">
          <img src={actorsList[0].imgLink} className="cast-photo" alt="actor poster" />
        </a>
        <p>{actorsList[0].work}</p>
        <br />
        <br />
        <h2>{actorsList[1].name} (Popularity {actorsList[1].popularity})</h2>
        <a href={`http://localhost:3000/actors?actor=${actorsList[1].name}`} target="_blank" rel="noopener noreferrer">
          <img src={actorsList[1].imgLink} className="cast-photo" alt="actor poster" />
        </a>
        <p>{actorsList[1].work}</p>
        <br />
        <br />
        <h2>{actorsList[2].name} (Popularity {actorsList[2].popularity})</h2>
        <a href={`http://localhost:3000/actors?actor=${actorsList[2].name}`} target="_blank" rel="noopener noreferrer">
          <img src={actorsList[2].imgLink} className="cast-photo" alt="actor poster" />
        </a>
        <p>{actorsList[2].work}</p>
        
        <br />
      </div>
      <div className="column">
        <h2>{actorsList[3].name} (Popularity {actorsList[3].popularity})</h2>
        <a href={`http://localhost:3000/actors?actor=${actorsList[3].name}`} target="_blank" rel="noopener noreferrer">
          <img src={actorsList[3].imgLink} className="cast-photo" alt="actor poster" />
        </a>
        <p>{actorsList[3].work}</p>
        <br />
        <br />
        <h2>{actorsList[4].name} (Popularity {actorsList[4].popularity})</h2>
        <a href={`http://localhost:3000/actors?actor=${actorsList[4].name}`} target="_blank" rel="noopener noreferrer">
          <img src={actorsList[4].imgLink} className="cast-photo" alt="actor poster" />
        </a>
        <p>{actorsList[4].work}</p>
        <br />
        <br />
        <h2>{actorsList[5].name} (Popularity {actorsList[5].popularity})</h2>
        <a href={`http://localhost:3000/actors?actor=${actorsList[5].name}`} target="_blank" rel="noopener noreferrer">
          <img src={actorsList[5].imgLink} className="cast-photo" alt="actor poster" />
        </a>
        <p>{actorsList[5].work}</p>
        <br />
        <br />
      </div>
      <br />
    </div>
  ); 
}

// actors list where main code/functionality happens
function ActorsListMain() {
  const [actorsList, setActorsList] = useState([]);
  const [filled, setFilled] = useState(false);

  const [term, setTerm] = useState('');
  const [searchType, setSearchType] = useState('actors');

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
    for (let index = 0; index < 6; index += 1) {
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
      </div>
      {filled ? formatting(actorsList) : ''}
    </div>
  );
}

export default ActorsListMain;
