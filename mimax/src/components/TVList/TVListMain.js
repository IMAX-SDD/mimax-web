import { React, useEffect, useState } from 'react';

// movies page where main code/functionality happens
function TVListMain() {
  const [TVTitle, setTVTitle] = useState([]);
  const [TVSynopsis, setTVSynopsis] = useState([]);
  const [TVScore, setTVScore] = useState([]);

  // set movie details with title, synopsis, overview and score
  function setTVDetails(json) {
    for (let i = 0; i < json.length; i += 1) {
        TVTitle.push(json[i].name);
        TVSynopsis.push(json[i].overview);
        TVScore.push(`Score ${json[i].vote_average}`);
    }
    setTVTitle(TVTitle);
    setTVSynopsis(TVSynopsis);
    setTVScore(TVScore);
  }

  // API call to TMDB
  const callAPI = () => {
    const link = 'https://api.themoviedb.org/3/tv/top_rated?api_key=9e6293836bcabd02d80d27ccca8eb072&with_original_language=en';
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setTVDetails(json.results));
  };

  useEffect(() => {
    setTVTitle([]);
    setTVSynopsis([]);
    setTVScore([]);
    callAPI();
  }, []);

  return (
    <div className="main">
      <div className="movie-display-section">
        <h1>Top TV Shows</h1>
        <h2>{TVTitle[0]}</h2>
        <p>{TVSynopsis[0]}</p>
        <h3>{TVScore[0]}</h3>
        <br/>
        <br/>
        <h2>{TVTitle[1]}</h2>
        <p>{TVSynopsis[1]}</p>
        <h3>{TVScore[1]}</h3>
        <br/>
        <br/>
        <h2>{TVTitle[2]}</h2>
        <p>{TVSynopsis[2]}</p>
        <h3>{TVScore[2]}</h3>
        <br/>
        <br/>
        <h2>{TVTitle[3]}</h2>
        <p>{TVSynopsis[3]}</p>
        <h3>{TVScore[3]}</h3>
        <br/>
        <br/>
        <h2>{TVTitle[4]}</h2>
        <p>{TVSynopsis[4]}</p>
        <h3>{TVScore[4]}</h3>
        <br/>
        <br/>
        <h2>{TVTitle[5]}</h2>
        <p>{TVSynopsis[5]}</p>
        <h3>{TVScore[5]}</h3>
        <br/>
        <br/>
        <h2>{TVTitle[6]}</h2>
        <p>{TVSynopsis[6]}</p>
        <h3>{TVScore[6]}</h3>
      </div>
    </div>
  );
}

export default TVListMain;
