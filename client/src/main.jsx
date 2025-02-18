import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import AppLayout from "./component/layout/AppLayout.jsx";
import {ThemeProvider} from "./context/ThemeContextProvider.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider>
            <AppLayout>
                <App/>
            </AppLayout>
        </ThemeProvider>
    </BrowserRouter>
)
