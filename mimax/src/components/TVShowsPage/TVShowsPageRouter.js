import React from "react";

import TVShowsPageMain from "./TVShowsPageMain/TVShowsPageMain";
import Navbar from "../Header/Navbar";

// routing for tv shows page
const TVShowsPageRouter = () => {
    return (
        <div>
            <Navbar/>
            <TVShowsPageMain/>
        </div>
    )
}

export default TVShowsPageRouter