import React, {useContext} from 'react';
import {Toaster} from "sonner";
import {useTheme} from "../../context/theme-context.jsx";

function AppLayout({children}) {
    const { theme } = useTheme();

    return (
        <>
            <Toaster position="bottom-right" theme={theme} closeButton={true}/>
            {children}
        </>
    );
}

export default AppLayout;