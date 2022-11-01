import { React, useState } from "react";

// tv shows page where main code/functionality happens
// issue: have to fix up to tailor toward tv show page
const TVShowsPageMain = () => {

    const [term, setTerm] = useState("");
    const [movieTitle, setMovieTitle] = useState("");
    const [movieSynopsis, setMovieSynopsis] = useState("");
    const [movieScore, setMovieScore] = useState("");

    function setSearch(e) {
        setTerm(e.target.value);
    }

    // set movie details with title, synopsis, overview and score
    function setMovieDetails(json) {
        setMovieTitle(json["original_title"]);
        setMovieSynopsis(json["overview"]);
        setMovieScore("Score " + json["vote_average"]);
    }

    // API call to TMDB
    const callAPI = () => {
        console.log(term);
        var link = "https://api.themoviedb.org/3/search/movie?api_key=9e6293836bcabd02d80d27ccca8eb072&query='" + term + "'"
        fetch(link, { method: 'GET' })
        .then(data => data.json()) // Parsing the data into a JavaScript object
        .then(json => setMovieDetails(json["results"][0])) // Displaying the stringified data in an alert popup
    }

    return (
        <div className="main">
            <div className="movie-display-section">
                <h1>TV Shows Page</h1>
                <input type="search" placeholder="Search TV Shows" onChange={setSearch} class="search-field"/>
                <button type="submit" onClick={callAPI}>
                    <i class="fa fa-search fa-lg"/>
                </button>
                <h2>{movieTitle}</h2>
                <p>{movieSynopsis}</p>
                <h3>{movieScore}</h3>
            </div>
        </div>
    )
}

export default TVShowsPageMain