import React from 'react';
import LoginForm from "../form/LoginForm.jsx";

function Login(props) {
    document.title = "Forum - Connexion";
    return (
        <main>
            <LoginForm/>
        </main>
    );
}

export default Login;