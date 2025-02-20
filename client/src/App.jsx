import {Route, Routes} from "react-router";
import AuthLayout from "./component/layout/AuthLayout.jsx";
import Home from "./component/page/Home.jsx";
import Login from "./component/page/Login.jsx";
import Register from "./component/page/Register.jsx";
import NavLayout from "./component/layout/NavLayout.jsx";
import Forum from "./component/page/Forum/Forum.jsx";
import RedirectIfConnected from "./component/redirect/RedirectIfConnected.jsx";
import RedirectIfNotConnected from "./component/redirect/RedirectIfNotConnected.jsx";
import Profile from "./component/page/Profile.jsx";
import ProfileEdit from "./component/page/ProfileEdit.jsx";
import Error404 from "./component/page/Error404.jsx";
import PublicProfile from "./component/page/PublicProfile.jsx";
import AppLayout from "./component/layout/AppLayout.jsx";
import NewPost from "./component/page/Forum/NewPost.jsx";

function App() {

    // todo : optimiser la configuration des routes.

    return (
        <Routes>
            <Route element={<AppLayout>
                <NavLayout/>
            </AppLayout>}>

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
                <Route path={"profile/edit"} element={
                    <RedirectIfNotConnected>
                        <ProfileEdit/>
                    </RedirectIfNotConnected>
                }/>
                <Route path={"profile/:userId"} element={<PublicProfile/>}/>

                <Route path="forum" element={
                    <RedirectIfNotConnected stayOnPage={true}>
                        <Forum/>
                    </RedirectIfNotConnected>
                }/>

                <Route path={"forum/new-post"} element={
                    <RedirectIfNotConnected>
                        <NewPost/>
                    </RedirectIfNotConnected>
                }/>

                <Route path="*" element={<Error404/>}/>

            </Route>

        </Routes>
    )
}

export default App
