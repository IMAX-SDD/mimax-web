import React from "react"


function Movie(props) {
    return (
        <div className="movie-card">
            <img className="movie-img"
                src={require(`../img/${props.img}`)}
                alt='movie-poster' 
            />    
             <span className="movie-title">{props.title}</span>  
             <span className="movie-score">Score: {props.score}</span>      
            {/* <span className="movie-synopsis">{props.synopsis}</span> */}
        </div>
    )
}

export default Movie