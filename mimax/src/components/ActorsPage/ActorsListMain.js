import { React, useEffect, useState } from 'react';

function formatting(actorsList) {
  return (
    // formatting for top actors list 
    <div className="movie-display-section">
      <br />
      <h1 style={{ fontWeight: 'bolder' }}>Top Actors/Actresses</h1>
      <div className="column">
        <h2>{actorsList[0].name} (Popularity {actorsList[0].popularity})</h2>
        <p>{actorsList[0].work}</p>
        <br />
        <br />
        <h2>{actorsList[1].name} (Popularity {actorsList[1].popularity})</h2>
        <p>{actorsList[1].work}</p>
        <br />
        <br />
        <h2>{actorsList[2].name} (Popularity {actorsList[2].popularity})</h2>
        <p>{actorsList[2].work}</p>
        
        <br />
      </div>
      <div className="column">
        <h2>{actorsList[3].name} (Popularity {actorsList[3].popularity})</h2>
        <p>{actorsList[3].work}</p>
        <br />
        <br />
        <h2>{actorsList[4].name} (Popularity {actorsList[4].popularity})</h2>
        <p>{actorsList[4].work}</p>
        <br />
        <br />
        <h2>{actorsList[5].name} (Popularity {actorsList[5].popularity})</h2>
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
  const [actorName, setActorName] = useState('');
  const [actorPopularity, setActorPopularity] = useState('');
  const [actorKnownFor, setActorKnownFor] = useState('');
  const [term, setTerm] = useState('');
  const [actorsList, setActorsList] = useState([]);
  const [filled, setFilled] = useState(false);
  const [searchCheck, setSearchCheck] = useState(false);

  function setSearch(e) {
    setTerm(e.target.value);
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

  function setActorDetailsAlt(json) {
    setActorName(json.name);
    setActorPopularity(parseInt(json.popularity, 10));

    const numOfWorks = json.known_for.length; 
    const popularWorks = []; 
    for (let index = 0; index < numOfWorks; index += 1) {
      if (!json.known_for[index].original_title) { 
        popularWorks.push(json.known_for[index].original_name);
      } else {
        popularWorks.push(json.known_for[index].original_title);
      }
    }

    for (let index = 0; index < numOfWorks - 1; index += 1) {
      popularWorks[index] = `${popularWorks[index]}, `; 
    }
    setActorKnownFor(popularWorks);
  } 

  // set movie details with name, popularity, overview and score
  function setActorDetails(json) {
    const tmpList = []; 
    for (let index = 0; index < 6; index += 1) {
      const tmpObj = {
        name: json[index].name, 
        popularity: parseInt(json[index].popularity, 10),
        work: parseWork(json[index].known_for),
      }; 
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

  // API call to TMDB
  const callAPIAlt = () => {
    const link = `https://api.themoviedb.org/3/search/person?api_key=9e6293836bcabd02d80d27ccca8eb072&query=${term}`; 
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setActorDetailsAlt(json.results[0]));
    setSearchCheck(true);
  };

  useEffect(() => {
    setActorsList([]);
    setFilled(false);
    callAPI();
  }, []);

  return (
    <div className="main row">
      <div className="movie-display-section">
        <h1 style={{ fontSize: '45px', fontWeight: 'bold', margin: '0px' }}>Actors Page</h1>
        <input type="search" placeholder="Search Actors/Actresses" onChange={setSearch} className="search-field" />
        <button type="submit" onClick={callAPIAlt}>
          <i className="fa fa-search fa-lg" />
        </button>
        <div>
          {searchCheck
            ? [
              <h2>{actorName}</h2>,
              <h3 style={{ marginBottom: '0px', fontSize: '20px' }}>Popular Works: {actorKnownFor}</h3>,
              <p style={{ fontSize: '15px' }}>Actor Popularity: {actorPopularity}</p>,
            ]
            : null }
        </div>
      </div>
      {filled ? formatting(actorsList) : ''}
    </div>
  );
}

export default ActorsListMain;
