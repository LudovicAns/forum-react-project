import {Route, Routes} from "react-router";
import AuthLayout from "./component/layout/auth-layout.jsx";
import Home from "./component/page/home.jsx";
import UserLogin from "./component/page/user/user-login.jsx";
import UserRegister from "./component/page/user/user-register.jsx";
import NavLayout from "./component/layout/nav-layout.jsx";
import Posts from "./component/page/forum/post/posts.jsx";
import RedirectIfNotConnected from "./component/redirect/redirect-if-not-connected.jsx";
import UserPrivateView from "./component/page/user/user-private-view.jsx";
import UserEdit from "./component/page/user/user-edit.jsx";
import Error404 from "./component/page/error/error-404.jsx";
import UserPublicView from "./component/page/user/user-public-view.jsx";
import AppLayout from "./component/layout/app-layout.jsx";
import PostCreate from "./component/page/forum/post/post-create.jsx";
import Post from "./component/page/forum/post/post.jsx";
import {PostProvider} from "./context/post-context-provider.jsx";
import PostEdit from "./component/page/forum/post/post-edit.jsx";
import RedirectIfConnected from "./component/redirect/redirect-if-connected.jsx";

function App() {

    // todo : optimiser la configuration des routes.

    return (
        <Routes>
            <Route element={
                <AppLayout>
                    <NavLayout/>
                </AppLayout>
            }>

                <Route index element={<Home/>}/>

                <Route element={<AuthLayout/>}>
                    <Route path="register" element={<RedirectIfConnected to={"/"}><UserRegister/></RedirectIfConnected>}/>
                    <Route path="login" element={<RedirectIfConnected to={"/"}><UserLogin/></RedirectIfConnected>}/>
                </Route>

                <Route path={"profile"} element={
                    <RedirectIfNotConnected>
                        <UserPrivateView/>
                    </RedirectIfNotConnected>
                }/>
                <Route path={"profile/edit"} element={
                    <RedirectIfNotConnected>
                        <UserEdit/>
                    </RedirectIfNotConnected>
                }/>
                <Route path={"profile/:userId"} element={<UserPublicView/>}/>

                <Route path={"forum"} element={<RedirectIfNotConnected stayOnPage={true}/>}>

                    <Route path={"posts"}>
                        <Route index element={<Posts/>}/>
                        <Route path={"new"} element={<PostCreate/>}/>

                        <Route path={":postId"} element={<PostProvider/>}>
                            <Route index element={<Post/>}/>
                            <Route path={"edit"} element={<PostEdit/>}/>
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<Error404/>}/>

            </Route>

        </Routes>
    )
}

export default App
