import { React, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import noImageAvailable from '../Images/Misc/no_image_available.jpg';

// tv shows page where main code/functionality happens
// issue: have to fix up to tailor toward tv show page
function TVShowsPageMain() {
  const [tvTitle, setTVTitle] = useState('');
  const [tvSynopsis, setTVSynopsis] = useState('');
  const [tvScore, setTVScore] = useState('');
  const [searchParams] = useSearchParams();
  const [showRating, setShowAgeRating] = useState('');
  const [showImgLink, setShowImgLink] = useState('');
  const [castList, setCastList] = useState([]);
  const [castImages, setCastImages] = useState([]);
  const [castLinks, setCastLinks] = useState([]);

  function setOMDBDetails(data) {
    if (data.Poster === undefined) {
      setShowImgLink(noImageAvailable);
    } else {
      setShowImgLink(data.Poster);
    }

    if (data.Rated === undefined) {
      setShowAgeRating('N/A');
    } else {
      setShowAgeRating(data.Rated);
    } 
  }

  function setCastDetails(data) {
    const castListData = data.cast;
    castListData.sort(function (a, b) {
      return parseFloat(b.popularity) - parseFloat(a.popularity);
    });
    const cast = ['', '', '', ''];
    const castImg = ['', '', '', ''];
    for (let i = 0; i < 4; i += 1) {
      console.log(castListData[i]);
      if (castListData[i] === undefined) {
        cast[i] = 'Unavailable';
        castImg[i] = noImageAvailable;
      } else {
        cast[i] = castListData[i].name;
        castImg[i] = 'https://image.tmdb.org/t/p/w500' + castListData[i].profile_path;
        castLinks[i] = 'https://sdd-mimax.netlify.app/actors?actor=' + castListData[i].name; 
      }
    }
    setCastList(cast);
    setCastImages(castImg);
    setCastLinks(castLinks);
  }

  const getPoster = (name) => {
    const link = `http://www.omdbapi.com/?t=${name}&apikey=acae3f03`;
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setOMDBDetails(json));
  };

  const getCast = (id) => {
    console.log(id);
    const link = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=9e6293836bcabd02d80d27ccca8eb072`;
    fetch(link, { method: 'GET' })
      // Parsing the data into a JavaScript object
      .then((data) => data.json())
      // Displaying the stringified data in an alert popup
      .then((json) => setCastDetails(json));
  };

  // set movie details with title, synopsis, overview and score
  function setTVDetails(json) {
    setTVTitle(json[0].name);
    setTVSynopsis(json[0].overview);
    setTVScore(json[0].vote_average);
    getCast(json[0].id);
    getPoster(json[0].name);
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

  // Displays a TV Show's title, poster, score, rating,
  // and cast members
  return (
    <div className="TVShow-page-main">
      <div className="movie-display-section">
        <div className="container">
          <div className="row">

            <div className="col">
              <h2>{tvTitle}</h2>
              <img alt="show poster" src={showImgLink} />
            </div>
            <div className="col">
              <h2>Synopsis</h2>
              <p className="TVShow-page-synopsis">{tvSynopsis}</p>
              <h3>
                <h2>Score</h2>
                {tvScore}
              </h3>
              <h3>
                <h2>Rated</h2>
                {showRating}
              </h3>
            </div>
          </div> 

          <div className="row">
            <h2 style={{ marginTop: 30 }}>Cast:</h2>

            <div className="col">
              <h3>
                <a href={castLinks[0]} target="_blank" rel="noopener noreferrer">{castList[0]}</a>
              </h3>
              <img className="cast-photo" src={castImages[0]} alt="cast member 1" />
            </div>

            <div className="col">
              <h3>
                <a href={castLinks[1]} target="_blank" rel="noopener noreferrer">{castList[1]}</a>
              </h3>
              <img className="cast-photo" src={castImages[1]} alt="cast member 2" />
            </div>

            <div className="col">
              <h3>
                <a href={castLinks[2]} target="_blank" rel="noopener noreferrer">{castList[2]}</a>
              </h3>
              <img className="cast-photo" src={castImages[2]} alt="cast member 3" />
            </div>

            <div className="col">
              <h3>
                <a href={castLinks[3]} target="_blank" rel="noopener noreferrer">{castList[3]}</a>
              </h3>
              <img className="cast-photo" src={castImages[3]} alt="cast member 4" />
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default TVShowsPageMain;
