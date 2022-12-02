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
          <div className="container">
            <div className="row">
              <div className="col">
                <h2>{actorName}</h2>
                <img className="actor-photo" alt="actor" src={actorImgLink} />
              </div>
              <div className="col">
                <h2>Popular Works</h2>
                <p className="actor-popular-works">{actorKnownFor}</p>
                <h3>
                  <h2>Actor Popularity</h2>
                  {actorPopularity}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default ActorsPageMain;
