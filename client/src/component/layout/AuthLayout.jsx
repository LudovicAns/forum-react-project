import React from 'react';
import {Outlet} from "react-router";

function AuthLayout() {
    return (
        <div className={`flex justify-center w-full`}>
            <Outlet />
        </div>
    );
}

export default AuthLayout;