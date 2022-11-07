import { React, useState, useEffect } from 'react';

// tv shows page where main code/functionality happens
// issue: have to fix up to tailor toward tv show page
function TVShowsPageMain() {
  const [tvTitle, setTVTitle] = useState([]);
  const [tvSynopsis, setTVSynopsis] = useState([]);
  const [tvScore, setTVScore] = useState([]);

  // set movie details with title, synopsis, overview and score
  function setTVDetails(json) {
    for (let i = 0; i < json.length; i += 1) {
      tvTitle.push(json[i].name);
      tvSynopsis.push(json[i].overview);
      tvScore.push(`Score ${json[i].vote_average}`);
    }
    setTVTitle(tvTitle);
    setTVSynopsis(tvSynopsis);
    setTVScore(tvScore);
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
        <h2>{tvTitle[0]}</h2>
        <p>{tvSynopsis[0]}</p>
        <h3>{tvScore[0]}</h3>

        <h2>{tvTitle[1]}</h2>
        <p>{tvSynopsis[1]}</p>
        <h3>{tvScore[1]}</h3>

        <h2>{tvTitle[2]}</h2>
        <p>{tvSynopsis[2]}</p>
        <h3>{tvScore[2]}</h3>

        <h2>{tvTitle[3]}</h2>
        <p>{tvSynopsis[3]}</p>
        <h3>{tvScore[3]}</h3>

        <h2>{tvTitle[4]}</h2>
        <p>{tvSynopsis[4]}</p>
        <h3>{tvScore[4]}</h3>

        <h2>{tvTitle[5]}</h2>
        <p>{tvSynopsis[5]}</p>
        <h3>{tvScore[5]}</h3>

        <h2>{tvTitle[6]}</h2>
        <p>{tvSynopsis[6]}</p>
        <h3>{tvScore[6]}</h3>
      </div>
    </div>
  );
}

export default TVShowsPageMain;
