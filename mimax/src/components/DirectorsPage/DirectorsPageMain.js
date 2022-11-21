import { React, useState } from 'react';
// import DirectorsListMain from './DirectorsListMain';

// directors page where main code/functionality happens
// issue: have to fix up to tailor toward directors page
function DirectorsPageMain() {
  const [term, setTerm] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [directorPopularity, setDirectorPopularity] = useState('');
  const [directorKnownFor, setDirectorKnownFor] = useState('');
  // const topFeatured = DirectorsListMain(); 
  const [searchCheck, setSearchCheck] = useState(false);

  function setSearch(e) {
    setTerm(e.target.value);
  }

  // set movie details with title, synopsis, overview and score
  function setDirectorDetails(json) {
    setDirectorName(json.name);
    setDirectorPopularity(parseInt(json.popularity, 10));

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
    setDirectorKnownFor(popularWorks);
  }

  // API call to TMDB
  const callAPI = () => {
    const link = `https://api.themoviedb.org/3/search/person?api_key=9e6293836bcabd02d80d27ccca8eb072&query=${term}`; 
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setDirectorDetails(json.results[0]));
    setSearchCheck(true);
  };

  return (
    <div className="main">
      <div className="movie-display-section">
        <br />
        <h1 style={{ fontSize: '45px', fontWeight: 'bold', margin: '0px' }}>Directors Page</h1>
        <input type="search" placeholder="Search Directors" onChange={setSearch} className="search-field" />
        <button type="submit" onClick={callAPI}>
          <i className="fa fa-search fa-lg" />
        </button>
        <div>
          {searchCheck
            ? [
              <h2>{directorName}</h2>,
              <p>Director Popularity: {directorPopularity}</p>,
              <h3>Popular Works: {directorKnownFor}</h3>,
            ]
            : null }
        </div>
        <br />
        <br />
        <h1 style={{ fontWeight: 'bolder' }}>Director Spotlight</h1>
      </div>
    </div>
  );
}
// div className="movie-display-section">
// <div>{topFeatured}</div>
// </div>

export default DirectorsPageMain;
