import { React, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// tv shows page where main code/functionality happens
// issue: have to fix up to tailor toward tv show page
function TVShowsPageMain() {
  const [tvTitle, setTVTitle] = useState('');
  const [tvSynopsis, setTVSynopsis] = useState('');
  const [tvScore, setTVScore] = useState('');
  const [searchParams] = useSearchParams();

  // set movie details with title, synopsis, overview and score
  function setTVDetails(json) {
    setTVTitle(json[0].name);
    setTVSynopsis(json[0].overview);
    setTVScore(`Score ${json[0].vote_average}`);
  }

  // API call to TMDB
  const callAPI = (term) => {
    const link = `https://api.themoviedb.org/3/search/tv?api_key=9e6293836bcabd02d80d27ccca8eb072&with_original_language=en&query='${term}'`;
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setTVDetails(json.results));
  };

  useEffect(() => {
    callAPI(searchParams.get('show'));
  }, []);

  return (
    <div className="main">
      <div className="movie-display-section">
        <h1>Top TV Shows</h1>
        <h2>{tvTitle}</h2>
        <p>{tvSynopsis}</p>
        <h3>{tvScore}</h3>
      </div>
    </div>
  );
}

export default TVShowsPageMain;
