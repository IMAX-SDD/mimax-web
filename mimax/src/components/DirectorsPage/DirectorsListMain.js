import { React, useEffect, useState } from 'react';

// NOT IN USE RIGHT NOW SINCE UNABLE TO RETRIEVE DIRECTORS INFO
function formatting(actorsList) {
  return (
    <div className="movie-display-section">
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
// movies page where main code/functionality happens
function DirectorsListMain() {
  const [actorsList, setActorsList] = useState([]);
  const [filled, setFilled] = useState(false);

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
  // set movie details with title, synopsis, overview and score
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

  useEffect(() => {
    setActorsList([]);
    setFilled(false);
    callAPI();
  }, []);

  return (
    <div className="main row">
      {filled ? formatting(actorsList) : ''}
    </div>
  );
}

export default DirectorsListMain;
