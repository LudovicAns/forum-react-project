import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {ThemeProvider} from "./context/ThemeContextProvider.jsx";
import {UserProvider} from "./context/UserContextProvider.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider>
            <UserProvider>
                <App/>
            </UserProvider>
        </ThemeProvider>
    </BrowserRouter>
)
