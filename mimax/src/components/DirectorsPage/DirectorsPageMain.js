import { React, useState } from 'react';
import DirectorsListMain from './DirectorsListMain';

// directors page where main code/functionality happens
// issue: have to fix up to tailor toward directors page
function DirectorsPageMain() {
  const [term, setTerm] = useState('');
  const [actorName, setActorName] = useState('');
  const [actorPopularity, setActorPopularity] = useState('');
  const [actorKnownFor, setActorKnownFor] = useState('');
  const topFeatured = DirectorsListMain(); 

  function setSearch(e) {
    setTerm(e.target.value);
  }

  // set movie details with title, synopsis, overview and score
  function setActorDetails(json) {
    setActorName(json.name);
    setActorPopularity(json.popularity);

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

  // API call to TMDB
  const callAPI = () => {
    const link = `https://api.themoviedb.org/3/search/person?api_key=9e6293836bcabd02d80d27ccca8eb072&query=${term}`; 
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setActorDetails(json.results[0]));
  };

  return (
    <div className="main">
      <div className="movie-display-section">
        <h1>Directors Page</h1>
        <input type="search" placeholder="Search Directors" onChange={setSearch} className="search-field" />
        <button type="submit" onClick={callAPI}>
          <i className="fa fa-search fa-lg" />
        </button>
        <h2>{actorName}</h2> 
        <p>Director Popularity: {actorPopularity}</p>
        <h3>Popular Works: {actorKnownFor}</h3>
      </div>
      <div className="movie-display-section">
        <div>{topFeatured}</div>
      </div>
    </div>
  );
}

export default DirectorsPageMain;
