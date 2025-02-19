import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContextProvider.jsx";
import {Navigate} from "react-router";

function RedirectIfConnected({children, to}) {
    const userContext = useContext(UserContext);

    if (userContext.loading) return <></>;

    if (userContext.user) {
        return <Navigate to={to} replace />
    }

    return children;
}

export default RedirectIfConnected;