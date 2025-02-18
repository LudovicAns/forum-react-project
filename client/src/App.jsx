import {Route, Routes} from "react-router";
import AuthLayout from "./component/layout/AuthLayout.jsx";
import Home from "./component/pages/Home.jsx";
import Login from "./component/pages/Login.jsx";
import Register from "./component/pages/Register.jsx";
import NavLayout from "./component/layout/NavLayout.jsx";
import Forum from "./component/pages/Forum.jsx";

function App() {

    return (
        <Routes>
            <Route element={<NavLayout/>}>

                <Route index element={<Home/>}/>

                <Route element={<AuthLayout/>}>
                    <Route path="register" element={<Register/>}/>
                    <Route path="login" element={<Login/>}/>
                </Route>

                <Route path="forum" element={<Forum/>}/>

            </Route>

        </Routes>
    )
}

export default App
