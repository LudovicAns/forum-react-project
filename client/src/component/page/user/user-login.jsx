import React from 'react';
import UserLoginForm from "../../form/user-login-form.jsx";

function UserLogin(props) {
    document.title = "Posts - Connexion";
    return (
        <main>
            <UserLoginForm/>
        </main>
    );
}

export default UserLogin;