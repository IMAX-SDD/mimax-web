import React from "react";
import { useState } from "react";

const Main = () => {

    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }

    const reset = () => {
        setCount(0);
    }

    const callAPI = () => {
        fetch('https://api.themoviedb.org/3/movie/550?api_key=9e6293836bcabd02d80d27ccca8eb072', { method: 'GET' })
        .then(data => data.json()) // Parsing the data into a JavaScript object
        .then(json => alert(JSON.stringify(json))) // Displaying the stringified data in an alert popup
    }

    return (
        <div className="main">
            <div className="movie-display-section">
                <h1>AWESOME BUTTON CLICKER</h1>
                <h2>{count}</h2>
                <button class="btn" onClick={increment}>CLICK ME</button> <br/>
                <button class="btn" style={{marginTop: '20px'}} onClick={reset}>RESET</button> <br/> <br/>
                <button class="btn" onClick={callAPI}>API CALL</button> <br/>
                <input type="search" placeholder="Search" class="search-field"/>
                <button type="submit">
                    <i class="fa fa-search fa-lg"/>
                </button>
            </div>

            <div className="director-actor-bio-section">
                
            </div>
        </div>
        
    )
}

export default Main