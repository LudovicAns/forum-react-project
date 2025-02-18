import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContextProvider.jsx";
import {Navigate} from "react-router";

function RedirectIfNotConnected({children, to = "/login"}) {
    const userContext = useContext(UserContext);

    if (!userContext.user) return <Navigate to={"/login"}/>

    return children;
}

export default RedirectIfNotConnected;