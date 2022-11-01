import React from "react";

import Navbar from "../Header/Navbar";
import DirectorsPageMain from "./DirectorsPageMain/DirectorsPageMain";

// routing for directors page
const DirectorsPageRouter = () => {
    return (
        <div>
            <Navbar/>
            <DirectorsPageMain/>
        </div>
    )
}

export default DirectorsPageRouter