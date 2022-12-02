import { React, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// main actors page where main code/functionality happens
function ActorsPageMain() {
  const [actorName, setActorName] = useState('');
  const [actorPopularity, setActorPopularity] = useState('');
  const [actorKnownFor, setActorKnownFor] = useState('');
  const [searchParams] = useSearchParams();
  const [actorImgLink, setActorImgLink] = useState('');

  // set details with actor name, popular works, popularity
  function setActorDetails(json) {
    setActorName(json.name);
    setActorPopularity(parseInt(json.popularity, 10));
    setActorImgLink('https://image.tmdb.org/t/p/w500' + json.profile_path);

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
  const callAPI = (term) => {
    const link = `https://api.themoviedb.org/3/search/person?api_key=9e6293836bcabd02d80d27ccca8eb072&query=${term}`; 
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setActorDetails(json.results[0]));
  };

  useEffect(() => {
    callAPI(searchParams.get('actor'));
  }, []);

  return (
    <div className="main">
      <div className="movie-display-section">
        <br />
        <div>
          <h2>{actorName}</h2>
          <img style={{ height: '600px', width: '450px' }} src={actorImgLink}></img>
          <h3 style={{ marginBottom: '0px', fontSize: '20px' }}>Popular Works: {actorKnownFor}</h3>
          <p style={{ fontSize: '15px' }}>Actor Popularity: {actorPopularity}</p>
        </div>
      </div>
      <br />
    </div>
  );
}

export default ActorsPageMain;
