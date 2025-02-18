import {Route, Routes} from "react-router";
import AuthLayout from "./component/layout/AuthLayout.jsx";
import Home from "./component/page/Home.jsx";
import Login from "./component/page/Login.jsx";
import Register from "./component/page/Register.jsx";
import NavLayout from "./component/layout/NavLayout.jsx";
import Forum from "./component/page/Forum.jsx";
import RedirectIfConnected from "./component/redirect/RedirectIfConnected.jsx";
import RedirectIfNotConnected from "./component/redirect/RedirectIfNotConnected.jsx";
import Profile from "./component/page/Profile.jsx";
import ProfileEdit from "./component/page/ProfileEdit.jsx";

function App() {

    return (
        <Routes>
            <Route element={<NavLayout/>}>

                <Route index element={<Home/>}/>

                <Route element={<AuthLayout/>}>
                    <Route path="register" element={<RedirectIfConnected to={"/"}><Register/></RedirectIfConnected>}/>
                    <Route path="login" element={<RedirectIfConnected to={"/"}><Login/></RedirectIfConnected>}/>
                </Route>

                <Route path={"profile"} element={
                    <RedirectIfNotConnected>
                        <Profile/>
                    </RedirectIfNotConnected>
                }/>
                <Route path={"profile/:username"} element={
                    <RedirectIfNotConnected>
                        <ProfileEdit/>
                    </RedirectIfNotConnected>
                }/>

                <Route path="forum" element={<Forum/>}/>

            </Route>

        </Routes>
    )
}

export default App
